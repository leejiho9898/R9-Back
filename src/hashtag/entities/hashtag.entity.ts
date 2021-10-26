import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Base } from "src/common/entities/base.entitiy";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hashtag extends Base {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	@IsNumber()
	id: number;

	@Column()
	@ApiProperty()
	@IsString()
	category: string;

	@Column()
	@ApiProperty()
	@IsString()
	name: string;
}
