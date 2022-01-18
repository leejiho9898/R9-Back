import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { CreateUserDto } from "~/users/dto/create-user.dto";
import { UpdateUserDto } from "~/users/dto/update-user.dto";
import { Role, User } from "~/users/entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    if (createUserDto.role === "ADMIN") {
      throw new UnauthorizedException();
    }
    const found = await this.usersRepository.findOne({
      email: createUserDto.email,
    });
    if (found) {
      throw new BadRequestException(
        `Cannot sign up with email '${createUserDto.email}'`
      );
    }
    return await this.usersRepository.save(
      this.usersRepository.create(createUserDto)
    );
  }

  async findBusinesses() {
    const query = this.usersRepository.createQueryBuilder("user");
    query.select(["user.id", "user.bizName", "user.bizNumber"]);
    query.leftJoinAndSelect("user.bizreview", "review");
    query.where({ role: Role.BUSINESS });
    const biz = query.getMany();
    return biz;
  }

  async findUsers() {
    return await this.usersRepository.find();
  }

  async findOneUserById(id: string) {
    const found = await this.usersRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(`User with id '${id}' does not exist`);
    }
    return found;
  }

  async findOneUserByEmail(email: string) {
    const found = await this.usersRepository.findOne({ email });
    if (!found) {
      throw new NotFoundException(`User with email '${email}' does not exist`);
    }
    return found;
  }

  async findUserByBizName(bizName: string) {
    const found = await this.usersRepository.find({
      bizName: Like(`%${bizName}%`),
    });
    if (!found) {
      throw new NotFoundException(
        `User with bizName '${bizName}' does not exist`
      );
    }

    return found;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const found = await this.usersRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(`User with id '${id}' does not exist`);
    }
    await this.usersRepository.save(
      this.usersRepository.create({ id, ...updateUserDto })
    );
  }

  async updateUserMe({ id }: User, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.save(
      this.usersRepository.create({ id, ...updateUserDto })
    );
  }

  async deleteUser(id: string) {
    const found = await this.usersRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(`User with id '${id}' does not exist`);
    }
    await this.usersRepository.softDelete({ id });
  }
}
