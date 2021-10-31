import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString, IsUUID } from "class-validator";
import { Base } from "src/common/entities/base.entitiy";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Job extends Base {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty()
  @IsUUID()
  id: string;

  // 작성자 ID
  @ManyToOne(() => User, (user) => user.jobs, { eager: true })
  @ApiProperty()
  @IsString()
  writer: User;

  // 공고 제목
  @Column()
  @ApiProperty()
  @IsString()
  title: string;

  // 마감일
  @Column()
  @ApiProperty()
  @IsDateString()
  deadline: Date;

  // 근무 내용
  @Column()
  @ApiProperty()
  @IsString()
  detail: string;

  // 인원
  @Column()
  @ApiProperty()
  @IsString()
  personnel: string;

  // 희망연령
  @Column()
  @ApiProperty()
  @IsNumber()
  age: number;

  // 주소
  @Column()
  @ApiProperty()
  @IsString()
  adress: string;
}
