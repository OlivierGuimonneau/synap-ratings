import { env } from '../config/env';

interface RecaptchaVerifyResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  score?: number;
  action?: string;
  error_codes?: string[];
}

export async function verifyRecaptcha(
  token: string,
  expectedAction: string = 'submit_lead'
): Promise<{ valid: boolean; score?: number; reason?: string }> {
  if (!env.recaptchaSecretKey) {
    console.error('reCAPTCHA secret key not configured');
    return { valid: false, reason: 'reCAPTCHA not configured on server' };
  }

  try {
    console.log('reCAPTCHA verification starting...');
    console.log('Token (first 20 chars):', token?.substring(0, 20) || 'MISSING');
    console.log('Secret key (first 10 chars):', env.recaptchaSecretKey?.substring(0, 10) || 'MISSING');
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${env.recaptchaSecretKey}&response=${token}`,
    });

    console.log('Google API response status:', response.status);
    const data = (await response.json()) as RecaptchaVerifyResponse;
    console.log('Google API response data:', JSON.stringify(data, null, 2));

    if (!data.success) {
      console.error('reCAPTCHA verification failed. Error codes:', data.error_codes);
      return { valid: false, reason: 'reCAPTCHA verification failed' };
    }

    // Vérifier le score (v3)
    const minScore = env.recaptchaMinScore || 0.5;
    console.log(`Score: ${data.score}, Min required: ${minScore}`);
    
    if (data.score !== undefined && data.score < minScore) {
      console.warn(`reCAPTCHA score too low: ${data.score} < ${minScore}`);
      return { valid: false, reason: 'Verification score too low', score: data.score };
    }

    // Vérifier l'action
    console.log(`Action from Google: ${data.action}, Expected: ${expectedAction}`);
    if (data.action && data.action !== expectedAction) {
      console.warn(`reCAPTCHA action mismatch: ${data.action} != ${expectedAction}`);
      return { valid: false, reason: 'Invalid action', score: data.score };
    }

    console.log('reCAPTCHA verification SUCCESS ✓');
    return { valid: true, score: data.score };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { valid: false, reason: 'Verification error during request' };
  }
}
