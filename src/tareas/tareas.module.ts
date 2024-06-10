import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Tarea, TareaSchema } from './entities/tarea.entity';

@Module({
  controllers: [TareasController],
  providers: [TareasService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Tarea.name,
        schema: TareaSchema,
      },
    ]),
  ],
})
export class TareasModule {}
