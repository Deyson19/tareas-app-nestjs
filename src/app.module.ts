import { Module } from '@nestjs/common';
import { TareasModule } from './tareas/tareas.module';

@Module({
  imports: [TareasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
