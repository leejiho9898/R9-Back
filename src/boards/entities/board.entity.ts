import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Base } from "src/common/entities/base.entitiy";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board extends Base {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, description: "보드 ID" })
  @IsNumber()
  id: number;

  @ManyToOne(() => User, (user) => user.board, { eager: false })
  writer: User;

  @Column({ nullable: true })
  @ApiProperty({ type: Number, description: "카테고리" })
  @IsString()
  category: string;

  @Column()
  @ApiProperty({ type: String, description: "제목" })
  @IsString()
  title: string;

  @Column({ type: "text" })
  @ApiProperty({ type: String, description: "내용" })
  @IsString()
  content: string;
}
