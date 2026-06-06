export const MitraStatus = {
  PENDING: 'PENDING' as const,
  APPROVED: 'APPROVED' as const,
  REJECTED: 'REJECTED' as const,
};

export type MitraStatus = typeof MitraStatus[keyof typeof MitraStatus];

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mitraStatus: MitraStatus;
}