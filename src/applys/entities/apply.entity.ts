import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "~/common/entities/base.entitiy";
import { Job } from "~/jobs/entities/job.entity";
import { User } from "~/users/entities/user.entity";

@Entity()
export class Apply extends Base {
  /** ID */
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @IsNumber()
  id: number;

  /** 지원자 */
  @ManyToOne(() => User, (user) => user.applys, { eager: true })
  @ApiProperty()
  @IsString()
  user: User;

  /** 지원한 공고 */
  @ManyToOne(() => Job, (job) => job.applys, { eager: true })
  @ApiProperty()
  @IsNumber()
  job: Job[];

  /** 추가 사항*/
  @Column({ type: "text" })
  @ApiProperty()
  @IsString()
  moreDetail: string;
}
