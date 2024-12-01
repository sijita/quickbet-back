import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating user. Please try again later',
      );
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({ email });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error finding user. Please try again later',
      );
    }
  }

  async findUserById(id: number) {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error finding user. Please try again later',
      );
    }
  }
}
