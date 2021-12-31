import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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
import { REGEXP_PASSWORD } from "~/common/constants/regexp";
import { Base } from "~/common/entities/base.entitiy";
import { Address } from "./address.entity";
import { Job } from "~/jobs/entities/job.entity";
import { Review } from "~/reviews/entities/review.entity";
import { Hashtag } from "~/hashtags/entities/hashtag.entity";
import { Apply } from "~/applys/entities/apply.entity";
import { Favorite } from "~/favorites/entities/favorite.entity";

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

  @Column({ nullable: true })
  @ApiProperty({ type: String, description: "기업 이름" })
  @IsString()
  @IsOptional()
  bizName?: string;

  @Column({ nullable: true })
  @ApiProperty({ type: String, description: "기업 사업자번호" })
  @IsString()
  @IsOptional()
  bizNumber?: string;

  @Column({ type: "enum", enum: Gender, nullable: true })
  @ApiProperty({ enum: Gender, description: "사용자 성별" })
  @IsEnum(Gender)
  gender: Gender;

  @Column({ type: "date", name: "date_of_birth", nullable: true })
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
  @JoinColumn({ name: "address_id" })
  @ApiProperty({ type: Address, description: "사용자 주소" })
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @OneToMany(() => Job, (job) => job.writer)
  @ApiProperty({ type: [Job], description: "사용자가 작성한 공고들" })
  @ValidateNested({ each: true })
  @Type(() => Job)
  jobs: Job[];

  @OneToMany(() => Review, (review) => review.biz)
  @ApiProperty({ type: [Review], description: "사용자에게 작성한 리뷰" })
  @ValidateNested({ each: true })
  @Type(() => Review)
  bizreview: Review[];

  @OneToMany(() => Review, (review) => review.writer)
  @ApiProperty({ type: [Review], description: "사용자가 작성한 리뷰" })
  @ValidateNested({ each: true })
  @Type(() => Review)
  reviews: Review[];

  @ManyToMany(() => Hashtag, {
    eager: true,
  })
  @JoinTable()
  @ApiProperty({ type: [Hashtag], description: "사용자가 사용한 해시태그" })
  @IsOptional({ each: true })
  useHashtags?: Hashtag[];

  /** 관심 */
  @OneToMany(() => Favorite, (favorite) => favorite.writer)
  @ApiProperty({ type: [Favorite], description: "job 관심 리스트" })
  @ValidateNested({ each: true })
  favorites: Favorite[];

  @OneToMany(() => Apply, (apply) => apply.user)
  @ApiProperty({ type: [Apply], description: "사용자가 작성한 지원서" })
  @ValidateNested({ each: true })
  @Type(() => Apply)
  applys: Apply[];

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
