import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto) {
		const found = await this.usersRepository.findOne({
			email: createUserDto.email,
		});
		if (found) {
			throw new BadRequestException(
				`Cannot sign up with email '${createUserDto.email}'`,
			);
		}
		await this.usersRepository.save(this.usersRepository.create(createUserDto));
	}

	async findAll() {
		return await this.usersRepository.find();
	}

	async findOneById(id: string) {
		const found = await this.usersRepository.findOne({ id });
		if (!found) {
			throw new NotFoundException(`User with id '${id}' does not exist`);
		}
		return found;
	}

	async findOneByEmail(email: string) {
		const found = await this.usersRepository.findOne({ email });
		if (!found) {
			throw new NotFoundException(`User with email '${email}' does not exist`);
		}
		return found;
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const found = await this.usersRepository.findOne({ id });
		if (!found) {
			throw new NotFoundException(`User with id '${id}' does not exist`);
		}
		await this.usersRepository.save(
			this.usersRepository.create({ id, ...updateUserDto }),
		);
	}

	async delete(id: string) {
		const found = await this.usersRepository.findOne({ id });
		if (!found) {
			throw new NotFoundException(`User with id '${id}' does not exist`);
		}
		await this.usersRepository.softDelete({ id });
	}
}
