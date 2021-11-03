import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  IsEmail,
  IsEnum,
  IsString,
  IsUUID,
  Length,
  Matches,
} from "class-validator";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import bcrypt from "bcrypt";
import { Base } from "src/common/entities/base.entitiy";
import { REGEXP_PASSWORD } from "src/common/constants/regexp";
import { Job } from "src/jobs/entities/job.entity";
import { Board } from "src/boards/entities/board.entity";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  BUSINESS = "BUSINESS",
}
@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ type: String, description: "사용자 UUID" })
  @IsUUID()
  id: string;

  @Column()
  @ApiProperty()
  @IsString()
  @Length(1, 10)
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  @IsEmail()
  email: string;

  @Column()
  @ApiProperty()
  @Matches(REGEXP_PASSWORD)
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: "enum", enum: Role })
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;

  @Column({ nullable: true })
  @ApiProperty()
  @IsString()
  @Exclude({ toPlainOnly: true })
  token: string;

  @Column({ nullable: true })
  @ApiProperty()
  @IsString()
  address: string;

  @OneToMany(() => Job, (job) => job.writer)
  jobs: Job[];

  @OneToMany(() => Board, (board) => board.writer)
  board: Board[];

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
