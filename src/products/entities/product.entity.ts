import {
  Entity,
  Column,
  JoinTable,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Comment, Category } from './';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  title: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: String })
  description: string;

  @OneToMany(
    () => Comment,
    comment => comment.product,
  )
  comments: Comment[];

  @ManyToMany(
    () => Category,
    category => category.products,
  )
  @JoinTable()
  categories: Category[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
