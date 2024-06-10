import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tarea } from './entities/tarea.entity';
import { Model } from 'mongoose';
import { TareaDto } from './dto/tarea.dto';
import { Observable, of } from 'rxjs';
@Injectable()
export class TareasService {
  constructor(@InjectModel(Tarea.name) private tareaModel: Model<Tarea>) {}
  private tarea?: TareaDto;

  async create(createTareaDto: CreateTareaDto): Promise<Tarea> {
    try {
      const newTask = new this.tareaModel(createTareaDto);
      await newTask.save();

      return newTask.toJSON();
    } catch (error) {
      console.log(error);
      throw new BadRequestException('No se pudo crear la tarea', error);
    }
  }

  async findAll() {
    return await this.tareaModel.find();
  }

  async findOne(id: string) {
    try {
      const find = await this.tareaModel.findById(id);
      if (!find) {
        throw new NotFoundException('No hay coincidencias');
      }
      this.tarea = find;

      return this.tarea;
    } catch (error) {
      throw new BadRequestException('No se pudo encontrar', error);
    }
  }

  async update(id: string, updateTareaDto: UpdateTareaDto) {
    try {
      const findTask = await this.getById(id);
      if (!findTask) {
        return new NotFoundException('No se encontró el elemento');
      }
      await this.tareaModel.findByIdAndUpdate(id, updateTareaDto);
      return updateTareaDto;
    } catch (error) {
      throw new BadRequestException('Ocurrió un problema: ' + error);
    }
  }

  async remove(id: string) {
    try {
      const findTask = await this.getById(id);
      if (!findTask) {
        return new NotFoundException('No se encontró el elemento');
      }
      return await this.tareaModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new BadRequestException('Ocurrió un problema: ' + error);
    }
  }

  private async getById(id: string) {
    return await this.tareaModel.findById(id);
  }
}
