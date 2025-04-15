import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserType } from './entities/user-type.entity';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';

//El servicio se encargará de interactuar con la base de datos para gestionar los tipos de usuario.
@Injectable()
export class UserTypeService {
  // Create a new userType and return the created userType
  constructor(
    @InjectRepository(UserType)
    private readonly userTypeRepository: Repository<UserType>,
  ) {}

  // Create a new userType and return the created userType
  async create(name: string, description?: string) {
    const userType = this.userTypeRepository.create({ name, description });
    return this.userTypeRepository.save(userType);
  }

  // Delete a userType by ID and return a success message
  async delete(id: number) {
    const userType = await this.findOne(id);
    if (!userType) {
      throw new NotFoundException(`UserType with ID ${id} not found`);
    }
    await this.userTypeRepository.remove(userType);
    return { message: `UserType with ID ${id} has been deleted` };
  }

  // Update a userType by ID and return the updated userType
  async update(id: number, updateUserTypeDto: UpdateUserTypeDto) {
    const userType = await this.findOne(id);
    if (!userType) {
      throw new NotFoundException(`UserType with ID ${id} not found`);
    }
    Object.assign(userType, updateUserTypeDto);
    return this.userTypeRepository.save(userType);
  }

  // Find all userTypes and return them as an array
  async findAll() {
    return this.userTypeRepository.find();
  }

  // Find a userType by ID and return it
  async findOne(id: number) {
    return this.userTypeRepository.findOne({ where: { id } });
  }
}
