/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    UpdateDateColumn,
    DeleteDateColumn
  } from 'typeorm';
  
  //1- importamos la entidad para la relacion

  import { Perfile } from 'src/perfiles/entities/perfile.entity';

  @Entity({ name:'usuarios' })
  export class Usuario {
   
    @PrimaryGeneratedColumn()
    id: number;
  
   
   
  @Column({ name: 'nombre', length: 25, nullable: false })
  nombre: string;
  
  @Column({ name: 'apellido', length: 25, nullable: false })
  apellido: string;
  
    //creamos la relacion

    @OneToOne(() => Perfile) //3- Definimos la entidad de la relacion uno a uno
    @JoinColumn({name: 'perfiles_id'}) // Clave foranea 4- La entidad que define la relación es la que utiliza el decorador @JoinColumn y le damos un nombre al campo en la base de datos
    perfiles: Perfile //2- El tipo entidad de los perfiles

    //Establecemos la bidireccionalidad en la otra entidad, vamos a la otra entidad: perfiles
    
    @CreateDateColumn({ name: 'create_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
  
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
  
  }
  

