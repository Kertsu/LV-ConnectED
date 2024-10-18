export interface User {
  id?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  validIdUrl?: string;
  name?: string;
  organizationName?: string;
  bio?: string;
  email: string;
  emailVerifiedAt?: string;
  providerVerifiedAt?: string;
  role: "admin" | "provider" | "student";
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
  providerVerfiedAt?:string
}

export interface Feedback {
  id: string;
  userId: User["id"];
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  postTitle: string;
  postThumbnailSource: string;
  postDescription: string;
  postRatingCount: number;
  postBookmarkCount: number;
  postCommentCount: number;
  postType: string;
  postDate: string;
  archivedAt?: string;
}
