import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  ValidateNested,
} from "class-validator";
import { Exclude, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import bcrypt from "bcrypt";
import { Base } from "src/common/entities/base.entitiy";
import { REGEXP_PASSWORD } from "src/common/constants/regexp";
import { Job } from "src/jobs/entities/job.entity";
import { Board } from "src/boards/entities/board.entity";
import { Address } from "./address.entity";
import { Review } from "src/reviews/entities/review.entity";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  BUSINESS = "BUSINESS",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ type: String, required: false, description: "사용자 UUID" })
  @IsUUID()
  @IsOptional()
  id: string;

  @Column()
  @ApiProperty({ type: String, description: "사용자 이름" })
  @IsString()
  name: string;

  @Column({ unique: true })
  @ApiProperty({ type: String, description: "사용자 이메일" })
  @IsEmail()
  email: string;

  @Column()
  @ApiProperty({ type: String, description: "사용자 암호" })
  @Matches(REGEXP_PASSWORD)
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: "enum", enum: Gender })
  @ApiProperty({ enum: Gender, description: "사용자 성별" })
  @IsEnum(Gender)
  gender: Gender;

  @Column({ type: "date", name: "date_of_birth" })
  @ApiProperty({ type: String, description: "사용자 생년월일" })
  @IsDateString()
  dateOfBirth: Date;

  @Column({ name: "profile_image", nullable: true })
  @ApiProperty({ type: String, description: "사용자 프로필 이미지" })
  @IsUrl()
  @IsOptional()
  profileImage?: string;

  @OneToOne(() => Address, (address) => address.user, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  @ApiProperty({ type: Address, description: "사용자 주소" })
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @OneToMany(() => Job, (job) => job.writer)
  @ApiProperty({ type: [Job], description: "사용자가 작성한 공고들" })
  jobs: Job[];

  @OneToMany(() => Board, (board) => board.writer)
  @ApiProperty({ type: [Board], description: "사용자가 작성한 게시글" })
  board: Board[];

  @OneToMany(() => Review, (review) => review.writer)
  @ApiProperty({ type: [Review], description: "사용자가 작성한 리뷰" })
  reviews: Review[];
  
  @Column({ type: "enum", enum: Role })
  @ApiProperty({ enum: Role, description: "사용자 권한" })
  @IsEnum(Role)
  role: Role;

  @Column({ nullable: true })
  @ApiProperty({ type: String, description: "사용자 갱신 토큰" })
  @IsString()
  @IsOptional()
  @Exclude({ toPlainOnly: true })
  token?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async preDataProcess() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async verifyPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
