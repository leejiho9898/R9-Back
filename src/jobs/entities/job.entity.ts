import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Base } from "src/common/entities/base.entitiy";
import { Hashtag } from "src/hashtags/entities/hashtag.entity";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Apply } from "~/applys/entities/apply.entity";
import { Favorite } from "~/favorites/entities/favorite.entity";
enum PayMentsMethod {
  /** 시급지불 */
  PERHOUR = "PERHOUR",
  /** 일당지불 */
  PERDAY = "PERDAY",
  /** 월급 지불 */
  PERMONTH = "PERMONTH",
}
enum JobStatus {
  /** 모집중 */
  ACTIVATE = "ACTIVATE",
  /** 모집 완료 */
  INACTIVATE = "INACTIVATE",
  /** 모집 중지 */
  STOP = "STOP",
}
enum Gender {
  /** 남성 */
  MAIL = "MAIL",
  /** 여성 */
  FEMAIL = "FEMAIL",
  /** 상관 없음 */
  ANY = "ANY",
}

@Entity()
export class Job extends Base {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @IsNumber()
  id: number;

  /** 작성자 ID */
  @ManyToOne(() => User, (writer) => writer.jobs, { eager: true })
  @ApiProperty()
  @IsString()
  writer: User;

  /** 해쉬태그 */
  @ManyToMany(() => Hashtag, (hashtag) => hashtag.job, {
    eager: true,
  })
  @ApiProperty()
  @JoinTable()
  @IsOptional({ each: true })
  hashtags: Hashtag[];

  @OneToMany(() => Apply, (apply) => apply.job, { cascade: true })
  @ApiProperty({ type: [Apply], description: "해당 공고에 작성된 지원서" })
  applys: Apply[];

  /** 공고 제목 */
  @Column()
  @ApiProperty()
  @IsString()
  title: string;

  /** 마감일 */
  @Column()
  @ApiProperty()
  @IsDateString()
  deadline: Date;

  /** 근무 내용 */
  @Column({ type: "text" })
  @ApiProperty()
  @IsString()
  detail: string;

  /** 인원 */
  @Column()
  @ApiProperty()
  @IsNumber()
  personnel: number;

  /** 희망연령 */
  @Column()
  @ApiProperty()
  @IsNumber()
  age: number;

  /** 근무형태 */
  @Column()
  @ApiProperty()
  @IsString()
  workType: string;

  /** 주소 */
  @Column()
  @ApiProperty()
  @IsString()
  adress: string;

  /** 임금 지불 방식 */
  @Column({ enum: PayMentsMethod, default: PayMentsMethod.PERHOUR })
  @ApiProperty()
  @IsOptional()
  @IsEnum(PayMentsMethod)
  payment: PayMentsMethod;

  /** 근무요일 */
  @Column({ type: "varchar", array: true })
  @ApiProperty()
  @IsArray()
  workingDay: string[];

  /** 근무 시작 시간 */
  @Column({ type: "time" })
  @ApiProperty()
  @IsMilitaryTime()
  startTime: Date;

  /** 근무 종료 시간 */
  @Column({ type: "time" })
  @ApiProperty()
  @IsMilitaryTime()
  endTime: Date;

  /** 임금 */
  @Column({ default: 8750 })
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  wage: number;

  /** 공고 상태 */
  @Column({ enum: JobStatus, default: JobStatus.ACTIVATE })
  @ApiProperty()
  @IsOptional()
  @IsEnum(JobStatus)
  status: JobStatus;

  /** 근무기간 */
  @Column({ nullable: true })
  @ApiProperty()
  @IsString()
  period: string;

  /** 성별 */
  @Column({ enum: Gender, default: Gender.MAIL })
  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;

  /** 업직종 */
  @Column({ nullable: true })
  @ApiProperty()
  @IsString()
  sectors: string;

  /** 관심 */
  @OneToMany(() => Favorite, (favorite) => favorite.job)
  favorites: Favorite[];
}
