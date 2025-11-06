export const rateLimiter = (req: any, res: any, next: any) => {
  // Mock in-memory rate limit
  const ip = req.ip || 'demo';
  const key = `rate:${ip}`;
  const count = (global as any)[key] || 0;
  if (count > 100) return res.status(429).json({ error: 'Rate limited' });
  (global as any)[key] = count + 1;
  setTimeout(() => (global as any)[key] = 0, 60000);
  next();
};