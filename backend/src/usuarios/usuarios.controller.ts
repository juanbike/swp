import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
//import { CreateUsuarioDto } from './dto/create-usuario.dto';
//import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('api/usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Crear un nuevo usuario
  @Post()
  async create(
    @Body() userData: Partial<Usuario>,
    @Body('userTypeId') userTypeId: number,
  ): Promise<Usuario> {
    return this.usuariosService.create(userData, userTypeId);
  }

  // Obtener todos los usuarios con sus tipos de usuario
  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  //Recuperamos un usuario pos su id

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findById(+id);
  }

  // Actualizar un usuario
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userData: Partial<Usuario>,
  ): Promise<Usuario> {
    return this.usuariosService.update(id, userData);
  }

  // Eliminar un usuario
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.usuariosService.delete(id);
  }
}
