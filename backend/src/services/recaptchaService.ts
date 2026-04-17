/**
 * @deprecated
 * This file is no longer used. 
 * Use recaptchaEnterpriseService.ts instead for Google Cloud reCAPTCHA Enterprise.
 * 
 * Kept as reference for legacy reCAPTCHA v3 Classic implementation.
 */

export async function verifyRecaptcha(): Promise<never> {
  throw new Error('recaptchaService is deprecated. Use recaptchaEnterpriseService.ts instead.');
}

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
