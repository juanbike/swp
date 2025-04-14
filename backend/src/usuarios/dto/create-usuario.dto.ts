/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'El campo Nombre no puede estar vacio' })
  @IsString()
  nombre: string;

  @IsNotEmpty({ message: 'El campo Apeliido no puede estar vacio' })
  @IsString()
  apellido: string;
 
}
