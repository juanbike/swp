import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserType } from './entities/user-type.entity';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';

@Injectable()
export class UserTypeService {
  delete(id: number) {
    throw new Error('Method not implemented.');
  }
  update(arg0: number, updateUserTypeDto: UpdateUserTypeDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(UserType)
    private readonly userTypeRepository: Repository<UserType>,
  ) {}

  async findAll() {
    return this.userTypeRepository.find();
  }

  async findOne(id: number) {
    return this.userTypeRepository.findOne({ where: { id } });
  }

  async create(name: string, description?: string) {
    const userType = this.userTypeRepository.create({ name, description });
    return this.userTypeRepository.save(userType);
  }
}
