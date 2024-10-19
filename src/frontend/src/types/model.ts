export interface User {
  id?: number;
  avatarUrl?: string ;
  bannerUrl?: string;
  validIdUrl?: string;
  name: string;
  organizationName?: string | null;
  bio?: string;
  email: string;
  emailVerifiedAt?: string | null;
  providerVerifiedAt?: string | null;
  role: string | "admin" | "student" | "provider";
  type?: string | "school" | "government" | "corporate" | "other";
  createdAt: string;
  updatedAt: string;
  archivedAt?: string | null;
}

export interface Feedback {
  id: number;
  rate: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Post {
  id: number;
  thumbnail: string;
  title: string;
  type: string;
  content: string;
  createdAt: string;
  user: User;
  feedbacks: Feedback[];
}
