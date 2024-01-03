import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 64, nullable: true })
  name?: string;

  @Column({ nullable: true })
  birthDate?: Date;

  @Column({ nullable: true })
  email?: string;

  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[];
}
