import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';

import { IsString, IsOptional, Length } from 'class-validator';
/**
 * Entidad que representa un tipo de usuario.
 * @property {number} id - Identificador único del tipo de usuario.
 * @property {string} name - Nombre único del tipo de usuario.
 * @property {string} description - Descripción opcional del tipo de usuario.
 * @property {UserType} parentType - Tipo de usuario padre (jerarquía).
 * @property {UserType[]} children - Tipos de usuario hijos (jerarquía).
 * @property {Date} createdAt - Fecha de creación del registro.
 * @property {Date} updatedAt - Fecha de la última actualización del registro.
 * @property {Date | null} deletedAt - Fecha de eliminación suave (null si no está eliminado).
 */
@Entity()
export class UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index() // Agrega un índice a la columna
  @IsString()
  @Length(3, 50) // Validación: El nombre debe tener entre 3 y 50 caracteres

  //Si la columna name es frecuentemente consultada o filtrada, considera agregar un índice para mejorar el rendimiento de las consultas:
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  //Los nombres userType y users pueden ser confusos porque ambos están relacionados con la misma entidad (UserType). Considera usar nombres más específicos para evitar ambigüedades. Por ejemplo:

  @ManyToOne(() => UserType, (parentType) => parentType.children)
  parentType: UserType;

  // Define una relación muchos a uno (ManyToOne) entre UserType y sí misma.

  // Esto significa que cada UserType puede tener un tipo de usuario padre (userType).
  // La relación es bidireccional, lo que significa que puedes acceder a los usuarios
  // asociados a un tipo de usuario a través de la propiedad 'users'.
  //
  // Por ejemplo, si tienes un tipo de usuario "Administrador", puedes tener varios
  // tipos de usuario "Gerente" que dependen del "Administrador".
  //
  //
  // La propiedad 'userType' en este caso representa el tipo de usuario padre.
  // La propiedad 'users' representa la colección de tipos de usuario hijos.
  // La relación es bidireccional, lo que significa que puedes acceder a los usuarios
  // asociados a un tipo de usuario a través de la propiedad 'users'.

  @OneToMany(() => UserType, (childType) => childType.parentType)
  children: UserType[];

  // Define una relación uno a muchos (OneToMany) entre UserType y sí misma.
  // Esto significa que cada UserType puede tener varios tipos de usuario hijos (users).
  // La propiedad 'userType' en este caso representa el tipo de usuario padre.
  // La propiedad 'users' representa la colección de tipos de usuario hijos.
  // La relación es bidireccional, lo que significa que puedes acceder a los usuarios
  // asociados a un tipo de usuario a través de la propiedad 'users'.
  // Por ejemplo, si tienes un tipo de usuario "Administrador", puedes tener varios
  // tipos de usuario "Gerente" que dependen del "Administrador".
  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date; // Cambiar a Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null; // Cambiar a Date | null (porque será null si no está borrado)
}

//`id`**: Identificador único para cada tipo de usuario.
// **`name`**: Nombre del tipo de usuario (por ejemplo, "Administrador", "Moderador").
// **`description`**: Descripción opcional del rol.
