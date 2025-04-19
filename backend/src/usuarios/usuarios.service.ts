/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
//import { CreateUsuarioDto } from './dto/create-usuario.dto';
//import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { UserType } from 'src/user-type/entities/user-type.entity';
//import { Perfile } from 'src/perfiles/entities/perfile.entity';


@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>,
  ) {}


// Creamos el usuario
 // Crear un nuevo usuario
 async create(userData: Partial<Usuario>, userTypeId: number): Promise<Usuario> {
  const userType = await this.userTypeRepository.findOne({ where: { id: userTypeId } });
  if (!userType) {
    throw new Error('Tipo de usuario no encontrado');
  }
  const newUser = this.usuarioRepository.create({ ...userData, userType });
  return this.usuarioRepository.save(newUser);
}

  //Encontramos todos los usuarios

  // Obtener todos los usuarios con su tipo de usuario
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['userType'] });
  }

  //Recuperamos el usuario por id

async findById(id: number): Promise<Usuario> {
  const usuario = await this.usuarioRepository.findOneBy({id:id});

  if (!usuario) {
    throw new NotFoundException(`El usuario con el ID ${id} no se encuentra`);
  }

  return usuario;
}



// Actualizar un usuario
async update(id: number, userData: Partial<Usuario>): Promise<Usuario> {
  await this.usuarioRepository.update(id, userData);
  return this.usuarioRepository.findOne({ where: { id }, relations: ['userType'] });
}

 
  // Eliminar un usuario
  async delete(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
