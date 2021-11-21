//import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Genero } from "src/interface/enum";
export type PessoaDocument = Pessoa & Document;

@Schema()
export class Pessoa {
    
    @Prop() @IsNotEmpty() @ApiProperty()
    nome: String;
    @Prop() @IsNotEmpty() @ApiProperty()
    genero: Genero;
    @Prop() @IsNotEmpty() @ApiProperty()
    pais: String;
    @Prop() @IsNotEmpty() @ApiProperty()
    idade: Date;
    @Prop() @IsNotEmpty() @ApiProperty()
    frase: String;
} export const PessoaSchema = SchemaFactory.createForClass(Pessoa);