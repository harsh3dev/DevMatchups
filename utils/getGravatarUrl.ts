import { createHash } from 'crypto';

export const generateGravatarUrl = (email: string): string => {
  const cleanEmail = email.trim().toLowerCase();

  const hash = createHash('sha256').update(cleanEmail).digest('hex');

  return `https://www.gravatar.com/avatar/${hash}?d=retro`;
};