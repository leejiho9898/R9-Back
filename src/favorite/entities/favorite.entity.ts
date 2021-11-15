import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "~/common/entities/base.entitiy";
import { Job } from "~/jobs/entities/job.entity";
import { User } from "~/users/entities/user.entity";

@Entity()
export class Favorite extends Base {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, description: "관심 ID" })
  @IsNumber()
  id: number;

  /** 작성자 */
  @ManyToOne(() => User, (user) => user.hashtags, { eager: true })
  writer: User;

  @ManyToOne(() => Job, (job) => job.favorites, { eager: true })
  job: Job;
}
