import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";
import { Base } from "src/common/entities/base.entitiy";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Review extends Base {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @IsNumber()
  id: number;

  @ManyToOne(() => User, (user) => user.reviews, { eager: false })
  writer: User;

  @Column()
  @ApiProperty()
  @IsString()
  title: string;

  @Column()
  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @Column()
  @ApiProperty()
  @IsDateString()
  endDate: Date;

  @Column()
  @ApiProperty()
  @IsString()
  content: string;

  @Column()
  @ApiProperty()
  @IsNumber()
  rating: number;
}
