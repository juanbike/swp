import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsNotEmpty({ message: 'El campo Nombre no puede estar vacio' })
  @IsString()
  nombre: string;

  @IsNotEmpty({ message: 'El campo Apeliido no puede estar vacio' })
  @IsString()
  apellido: string;
}
