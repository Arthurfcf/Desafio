//import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { IsNotEmpty } from "class-validator";
import { Genero } from "src/interface/enum";
export type PessoaDocument = Pessoa & Document;

@Schema()
export class Pessoa {
    @Prop() @IsNotEmpty()
    nome: String;
    @Prop() @IsNotEmpty()
    genero: Genero;
    @Prop() @IsNotEmpty()
    pais: String;
    @Prop() @IsNotEmpty()
    idade: Date;
    @Prop() @IsNotEmpty()
    frase: String;
} export const PessoaSchema = SchemaFactory.createForClass(Pessoa);