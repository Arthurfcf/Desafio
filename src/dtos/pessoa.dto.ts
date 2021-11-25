import { Document } from 'mongoose'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { Genero } from 'src/interface/enum';
import { Pessoa } from 'src/schemas/pessoa.schema';
import { ApiProperty } from '@nestjs/swagger';
export class PessoaDto implements Pessoa{
@IsNotEmpty() @ApiProperty()
    "nome": String;
    @IsNotEmpty() @ApiProperty()
    "genero": Genero;
    @IsNotEmpty() @ApiProperty()
    "pais": String;
    @IsNotEmpty() @ApiProperty()
    "idade": Date;
    @IsNotEmpty() @ApiProperty()
    "frase": String;

} 
