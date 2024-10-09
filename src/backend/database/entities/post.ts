import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'posts',
})
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // @ManyToOne(() => User, user => user.posts, { onDelete: "CASCADE" })
  // user: User;

  @Column({ nullable: true })
  thumbnail: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column("text")
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}