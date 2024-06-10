import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateTareaDto {
  @IsString()
  nombre: string;
  @IsString()
  descripcion: string;
  @IsBoolean()
  esImportante: boolean;
}
