import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString, Max, Min } from "class-validator";
import { Base } from "src/common/entities/base.entitiy";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review extends Base {
  /** 리뷰 ID */
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @IsNumber()
  id: number;

  /** 작성자 ID */
  @ManyToOne(() => User, (user) => user.bizreview, { eager: true })
  biz: User;

  /** 작성자 ID */
  @ManyToOne(() => User, (user) => user.reviews, { eager: true })
  writer: User;

  /** 제목 */
  @Column()
  @ApiProperty()
  @IsString()
  title: string;

  /** 근무 시작했던 날짜 */
  @Column()
  @ApiProperty()
  @IsDateString()
  startDate: Date;

  /** 근무 끝났던 날짜 */
  @Column()
  @ApiProperty()
  @IsDateString()
  endDate: Date;

  /** 내용 */
  @Column()
  @ApiProperty()
  @IsString()
  content: string;

  /** 별점 */
  @Column()
  @ApiProperty()
  @IsNumber()
  @Max(10)
  @Min(0)
  rating: number;
}
