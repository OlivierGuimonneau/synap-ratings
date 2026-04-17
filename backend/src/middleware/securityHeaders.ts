import { Request, Response, NextFunction } from 'express';

export function securityHeaders(_req: Request, res: Response, next: NextFunction) {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // CSP for reCAPTCHA Enterprise and secure defaults
  const csp = [
    "default-src 'self'",
    "script-src 'self' https://www.google.com https://*.gstatic.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' https:",
    "connect-src 'self' https://www.google.com https://*.gstatic.com https://recaptchaenterprise.googleapis.com",
    "frame-src 'self' https://www.google.com",
    "frame-ancestors 'none'",
    "report-uri /api/csp-report"
  ].join('; ');
  
  res.setHeader('Content-Security-Policy-Report-Only', csp);
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  res.removeHeader('X-Powered-By');
  
  next();
}
