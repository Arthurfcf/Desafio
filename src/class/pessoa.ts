import{Document} from 'mongoose'
import { Genero } from './enum';
import{  IsEnum, IsNotEmpty } from 'class-validator'
export class Pessoa extends Document {
 @IsNotEmpty()
    "nome": string; 
    @IsNotEmpty() //@IsEnum
      genero:Genero
      @IsNotEmpty()
      "pais": string;
      @IsNotEmpty() 
      "idade": string;
      @IsNotEmpty() 
      "frase": string; 
    
}
