import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length:45,nullable: false})
  user_name: string;

  @Column({nullable: false})
  email: string;

  @Column({ length: 15 })
  phone: string;

  @Column({nullable: false})
  role: string;

  @Column({nullable: false})
  status: string;

  @Column()
  avatar: string;

  @Column({nullable: false})
  address: string;

  @Column({nullable: true})
  password: string;

  @CreateDateColumn({ type: 'timestamp' }) // Tự động tạo ngày tạo khi tạo bản ghi
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // Tự động cập nhật ngày cập nhật khi thay đổi bản ghi
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
