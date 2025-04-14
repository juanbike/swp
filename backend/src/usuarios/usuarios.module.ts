import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

import { Usuario } from '../usuarios/entities/usuario.entity';
import { Perfile } from '../perfiles/entities/perfile.entity';
import { PerfilesService } from 'src/perfiles/perfiles.service';
import { PerfilesController } from 'src/perfiles/perfiles.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Perfile])],
  controllers: [UsuariosController, PerfilesController],
  providers: [UsuariosService, PerfilesService],
})
export class UsuariosModule {}
