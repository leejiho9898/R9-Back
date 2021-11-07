import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, required: false, description: "주소 아이디" })
  @IsNumber()
  @IsOptional()
  id: number;

  @Column()
  @ApiProperty({ type: String, description: "국가" })
  @IsString()
  country: string;

  @Column({ name: "postal_code" })
  @ApiProperty({ type: Number, description: "우편번호" })
  @IsNumber()
  postalCode: number;

  @Column()
  @ApiProperty({ type: String, description: "시도명" })
  @IsString()
  state: string;

  @Column()
  @ApiProperty({ type: String, description: "시군구명" })
  @IsString()
  city: string;

  @Column()
  @ApiProperty({ type: String, description: "도로명" })
  @IsString()
  street: string;

  @Column()
  @ApiProperty({ type: Number, description: "건물 번호" })
  @IsNumber()
  buildCode: number;

  @OneToOne(() => User, (user: User) => user.address)
  user: User;

  getFullAddress() {
    return `${this.country} ${this.state} ${this.city} ${this.street}`;
  }
}
