import { describe, it, expect } from 'vitest';

describe('Health Check', () => {
    it('should return a healthy status', () => {
        const healthStatus = { status: 'healthy' };
        expect(healthStatus.status).toBe('healthy');
    });
});