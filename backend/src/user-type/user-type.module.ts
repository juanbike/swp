import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeService } from './user-type.service';
import { UserTypeController } from './user-type.controller';
import { UserType } from './entities/user-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserType])],
  controllers: [UserTypeController],
  providers: [UserTypeService],
})
export class UserTypeModule {}
