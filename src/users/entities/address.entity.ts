import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "~/users/entities/user.entity";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, required: false, description: "주소 아이디" })
  @IsNumber()
  @IsOptional()
  id: number;

  @Column({ name: "postal_code" })
  @ApiProperty({ type: String, description: "우편번호" })
  @IsString()
  postalCode: string;

  @Column()
  @ApiProperty({ type: String, description: "시도명" })
  @IsString()
  state: string;

  @Column()
  @ApiProperty({ type: String, description: "시군구명" })
  @IsString()
  city: string;

  @Column()
  @ApiProperty({ type: String, description: "도로명 주소" })
  @IsString()
  roadAddress: string;

  @OneToOne(() => User, (user: User) => user.address)
  user: User;
}
