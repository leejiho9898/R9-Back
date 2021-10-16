import { IsDate, IsOptional } from "class-validator";
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class Base {
	@CreateDateColumn({ name: "created_at", type: "timestamp" })
	@IsDate()
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", type: "timestamp" })
	@IsDate()
	updatedAt: Date;

	@DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
	@IsOptional()
	@IsDate()
	deletedAt: Date;
}
