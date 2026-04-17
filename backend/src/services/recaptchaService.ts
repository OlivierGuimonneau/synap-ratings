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

