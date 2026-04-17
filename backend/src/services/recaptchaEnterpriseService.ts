import { env } from '../config/env';

interface RecaptchaEnterpriseResponse {
  name: string;
  event: {
    token: string;
    siteKey: string;
    userIpAddress?: string;
    userAgent?: string;
  };
  riskAnalysis: {
    score: number;
    reasons?: string[];
  };
  tokenProperties: {
    valid: boolean;
    invalidReason?: string;
    createTime: string;
    hostname: string;
  };
}

export async function verifyRecaptchaEnterprise(
  token: string,
  siteKey: string,
  expectedAction: string = 'submit_lead',
  userIpAddress?: string,
  userAgent?: string
): Promise<{ valid: boolean; score?: number; reason?: string }> {
  if (!env.recaptchaEnterpriseApiKey || !env.recaptchaEnterpriseProjectId) {
    console.error('reCAPTCHA Enterprise configuration missing');
    return { valid: false, reason: 'reCAPTCHA not configured on server' };
  }

  try {
    console.log('reCAPTCHA Enterprise verification starting...');
    console.log(`Project: ${env.recaptchaEnterpriseProjectId}`);
    console.log(`Token (first 20 chars): ${token?.substring(0, 20) || 'MISSING'}...`);
    console.log(`Site Key: ${siteKey}`);

    // En développement, accepter les dev-tokens pour tester localement
    if (env.nodeEnv === 'development' && token.startsWith('dev-token-')) {
      console.log('✓ Development mode: accepting dev token for local testing');
      return { valid: true, score: 0.9 };
    }

    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${env.recaptchaEnterpriseProjectId}/assessments?key=${env.recaptchaEnterpriseApiKey}`;

    const requestBody = {
      event: {
        token,
        siteKey,
        ...(userIpAddress && { userIpAddress }),
        ...(userAgent && { userAgent }),
      },
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Google API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google API error:', response.status, errorText);
      return { valid: false, reason: `Google API error: ${response.status}` };
    }

    const data = (await response.json()) as RecaptchaEnterpriseResponse;
    console.log('Google API response data:', JSON.stringify(data, null, 2));

    // Vérifier que le token est valide
    if (!data.tokenProperties?.valid) {
      console.warn('Token is invalid:', data.tokenProperties?.invalidReason);
      return { valid: false, reason: `Invalid token: ${data.tokenProperties?.invalidReason}` };
    }

    // Vérifier le hostname (doit être localhost ou www.synap-ratings.com)
    const validHostnames = ['localhost', '127.0.0.1', 'www.synap-ratings.com', 'synap-ratings.com'];
    if (data.tokenProperties?.hostname && !validHostnames.includes(data.tokenProperties.hostname)) {
      console.warn(`Hostname mismatch: ${data.tokenProperties.hostname}`);
      return { valid: false, reason: `Invalid hostname: ${data.tokenProperties.hostname}` };
    }

    // Vérifier le score (v3)
    const score = data.riskAnalysis?.score ?? 0;
    const minScore = env.recaptchaMinScore || 0.5;
    console.log(`Risk Score: ${score}, Min required: ${minScore}`);

    if (score < minScore) {
      console.warn(`reCAPTCHA score too low: ${score} < ${minScore}`);
      console.warn('Reasons:', data.riskAnalysis?.reasons);
      return { valid: false, reason: 'Verification score too low', score };
    }

    console.log('reCAPTCHA Enterprise verification SUCCESS ✓');
    return { valid: true, score };
  } catch (error) {
    console.error('reCAPTCHA Enterprise verification error:', error);
    return { valid: false, reason: 'Verification error during request' };
  }
}
