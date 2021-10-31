import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Base } from "src/common/entities/base.entitiy";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board extends Base {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	@IsNumber()
	id: number;

	@ManyToOne(() => User, (user) => user.board, { eager: false })
	writer: User;

	@Column()
	@ApiProperty()
	@IsString()
	content: string;

	@Column()
	@ApiProperty()
	@IsString()
	title: string;
}
