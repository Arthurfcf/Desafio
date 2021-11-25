import { Document } from 'mongoose'
import { Genero } from './enum';
import { IsEnum, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
export class Pessoa extends Document {
  @IsNotEmpty()
  @ApiProperty()
  "nome": string;
  @IsNotEmpty() //@IsEnum
  @ApiProperty()
  genero: Genero
  @IsNotEmpty()
  @ApiProperty()
  "pais": string;
  @IsNotEmpty()
  @ApiProperty()
  "idade": Date;
  @IsNotEmpty()
  @ApiProperty()
  "frase": string;

}
