import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "../../constants";
import { Bookmark } from "./bookmark";
import { Feedback } from "./feedback";
import { Post } from "./post";
import { VerificationCode } from "./verification-code";

@Entity({
  name: "users",
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true, type: "varchar" })
  avatarUrl: string | null;

  @Column({ nullable: true, type: "varchar" })
  bannerUrl: string | null;

  @Column({ nullable: true, type: "varchar" })
  validIdUrl: string | null;

  @Column({ type: "varchar" })
  name: string;

  @Column({ nullable: true, type: "varchar" })
  organizationName: string | null;

  @Column({ nullable: true, type: "text" })
  bio: string | null;

  @Column({ unique: true, type: "varchar" })
  email: string;

  @Column({ nullable: true, type: "datetime" })
  emailVerifiedAt: Date | null;

  @Column({ nullable: true, type: "datetime" })
  providerVerifiedAt: Date | null;

  @Column({ type: "text" })
  role: string;

  @Column({ nullable: true, type: "text" })
  type: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true, type: "datetime" })
  archivedAt: Date | null;

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  posts: Post[];

  @OneToMany(() => Feedback, (feedback) => feedback.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  feedbacks: Feedback[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];

  @OneToOne(() => VerificationCode, (verificationCode) => verificationCode.user)
  verificationCode: VerificationCode;

  setRole(role: string) {
    if (UserRole.includes(role)) {
      this.role = role;
    } else {
      return "Invalid user role!";
    }
  }
}

/**
 * provider:
 * account - avatar, name
 * email
 * validId
 * status (provider verification)
 */
