import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  corsOrigins: (process.env.CORS_ORIGINS ?? 'http://localhost:5000').split(','),
  airtableToken: process.env.AIRTABLE_TOKEN ?? '',
  airtableBaseId: process.env.AIRTABLE_BASE_ID ?? '',
  airtableTableName: process.env.AIRTABLE_TABLE_NAME ?? 'Leads',
  siteDomain: process.env.APP_DOMAIN ?? 'www.synap-ratings.com',
  recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY ?? '',
  recaptchaEnterpriseApiKey: process.env.RECAPTCHA_ENTERPRISE_API_KEY ?? '',
  recaptchaEnterpriseProjectId: process.env.RECAPTCHA_ENTERPRISE_PROJECT_ID ?? '',
  recaptchaExpectedAction: process.env.RECAPTCHA_EXPECTED_ACTION ?? 'submit_lead',
  recaptchaMinScore: Number(process.env.RECAPTCHA_MIN_SCORE ?? 0.5),
} as const;
