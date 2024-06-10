import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Tarea {
  _id?: string;
  @Prop({ unique: true, require: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  esImportante: boolean;
}
export const TareaSchema = SchemaFactory.createForClass(Tarea);
