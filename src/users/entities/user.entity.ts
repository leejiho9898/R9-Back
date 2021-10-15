import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail, IsEnum, IsString, IsUUID, Matches } from "class-validator";
import bcrypt from "bcrypt";
import { Base } from "src/common/entities/base.entitiy";

export enum Role {
	Admin = "ADMIN",
	User = "USER",
	Business = "BUSINESS",
}

const passwordRegExp =
	/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,128}$/;

@Entity()
export class User extends Base {
	@PrimaryGeneratedColumn("uuid")
	@IsUUID()
	id: string;

	@Column()
	@IsString()
	name: string;

	@Column({ unique: true })
	@IsEmail()
	email: string;

	@Column({ select: false })
	@Matches(passwordRegExp)
	password: string;

	@Column({ type: "enum", enum: Role })
	@IsEnum(Role)
	role: Role;

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