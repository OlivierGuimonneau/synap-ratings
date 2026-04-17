import { Request, Response } from 'express';
import { leadSchema } from '../schemas/leadSchema';
import { createLead } from '../services/leadService';
import { verifyRecaptchaEnterprise } from '../services/recaptchaEnterpriseService';
import { env } from '../config/env';

export async function leadController(req: Request, res: Response) {
  // Valider le payload
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Validation failed',
      error: parsed.error.flatten(),
    });
  }

  try {
    // Valider le reCAPTCHA token avec l'API Enterprise
    console.log('Verifying reCAPTCHA Enterprise token...');
    const userIp = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');
    
    const recaptchaValidation = await verifyRecaptchaEnterprise(
      parsed.data.recaptchaToken,
      env.recaptchaSiteKey,
      env.recaptchaExpectedAction,
      userIp,
      userAgent
    );
    console.log('reCAPTCHA validation result:', recaptchaValidation);
    
    if (!recaptchaValidation.valid) {
      console.warn('reCAPTCHA validation failed:', recaptchaValidation.reason);
      return res.status(400).json({
        message: 'Security verification failed. Please try again.',
        error: recaptchaValidation.reason,
      });
    }

    // Créer le lead en Airtable
    console.log('Creating lead with data:', { 
      firstName: parsed.data.firstName, 
      lastName: parsed.data.lastName, 
      email: parsed.data.email, 
      company: parsed.data.company,
      phone: parsed.data.phone 
    });
    const result = await createLead(parsed.data);
    console.log('Lead created successfully:', result);
    
    return res.status(201).json({
      success: true,
      message: 'Your request has been received successfully',
      data: result,
    });
  } catch (error) {
    console.error('Lead creation error:', error instanceof Error ? error.message : String(error));
    console.error('Full error:', error);
    return res.status(500).json({
      message: 'An error occurred while processing your request',
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}

