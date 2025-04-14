/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
//import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Perfile } from 'src/perfiles/entities/perfile.entity';


@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Perfile) private perfilRepo: Repository<Perfile>,
  ) {}


// Creamos el usuario
  async create(createUsuarioDto: CreateUsuarioDto) {
    const Perfil = new Perfile();
    Perfil.correo = Perfil.correo;
    Perfil.telefono = Perfil.telefono;
    Perfil.rol = Perfil.rol;
    Perfil.password = Perfil.password;
    const nuevoPerfil =  await this.perfilRepo.save(Perfil);



    const usuario = new Usuario();
    usuario.nombre = createUsuarioDto.nombre;
    usuario.apellido = createUsuarioDto.apellido;
    usuario.perfiles = nuevoPerfil;
    return await this.usuarioRepo.save(usuario);
  }

  //Encontramos todos los usuarios

  async findAll() {
    return await this.usuarioRepo.find();
  }

  //Recuperamos el usuario por id

async findById(id: number): Promise<Usuario> {
  const usuario = await this.usuarioRepo.findOneBy({id:id});

  if (!usuario) {
    throw new NotFoundException(`El usuario con el ID ${id} no se encuentra`);
  }

  return usuario;
}



// Actualizamos el usuario


async update(id: number,  UpdateUsuarioDto : Partial<Usuario>): Promise<Usuario> {
  const usuario = await this.usuarioRepo.findOneBy({id: id})

  if (!usuario) {
    throw new NotFoundException(`El inspector con el ID ${id} no se encuentra`);
  }

  // Actualiza los campos del usuario con los datos proporcionados
  this.usuarioRepo.merge(usuario, UpdateUsuarioDto);

  return this.usuarioRepo.save(usuario);
}

 
  //Eliminar inspector


async remove(id: number): Promise<void> {
  const usuario = await this.usuarioRepo.findOneBy({id: id});

  if (!usuario) {
    throw new NotFoundException(`El inspector con el ID ${id} no se encuentra`);
   }

  await this.usuarioRepo.remove(usuario);
}
}
