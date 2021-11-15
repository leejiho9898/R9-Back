import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString, Max, Min } from "class-validator";
import { Base } from "src/common/entities/base.entitiy";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review extends Base {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, description: "리뷰 ID" })
  @IsNumber()
  id: number;

  /** 기업 */
  @ManyToOne(() => User, (user) => user.bizreview, { eager: true })
  biz: User;

  /** 작성자 */
  @ManyToOne(() => User, (user) => user.reviews, { eager: true })
  writer: User;

  @Column()
  @ApiProperty({ type: String, description: "제목" })
  @IsString()
  title: string;

  @Column()
  @ApiProperty({ type: String, description: "근무 시작했던 날짜" })
  @IsDateString()
  startDate: Date;

  @Column()
  @ApiProperty({ type: String, description: "근무 끝났던 날짜" })
  @IsDateString()
  endDate: Date;

  @Column()
  @ApiProperty({ type: String, description: "내용" })
  @IsString()
  content: string;

  @Column()
  @ApiProperty({ type: Number, description: "별점" })
  @IsNumber()
  @Max(10)
  @Min(0)
  rating: number;
}
