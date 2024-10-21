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
  posts: any;
  comment: any;
  id: number;
  thumbnail: string;
  title: string;
  type: string;
  content: string;
  createdAt: string;
  archivedAt?: string | null;
  user: User;
  feedbacks: Feedback[];
  bookmarks: Bookmark[];
  isBookmarked? : boolean
}

export interface Bookmark {
  id: number;
  createdAt: string
  updatedAt: string;
  user: User;
  post: Post;
}