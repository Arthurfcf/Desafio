import { Document } from 'mongoose'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { Genero } from 'src/interface/enum';
import { Pessoa } from 'src/schemas/pessoa.schema';
export class PessoaDto implements Pessoa{

    "nome": String;

    "genero": Genero;

    "pais": String;

    "idade": Date;

    "frase": String;

}
