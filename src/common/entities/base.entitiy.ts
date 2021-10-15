import { IsDate, IsOptional } from "class-validator";
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class Base {
	@CreateDateColumn({ name: "created_at", type: "timestamp", select: false })
	@IsDate()
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", type: "timestamp", select: false })
	@IsDate()
	updatedAt: Date;

	@DeleteDateColumn({ name: "deleted_at", type: "timestamp", select: false })
	@IsOptional()
	@IsDate()
	deletedAt: Date;
}
