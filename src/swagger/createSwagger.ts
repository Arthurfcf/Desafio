import { ApiProperty } from "@nestjs/swagger";
import { Pessoa } from "src/schemas/pessoa.schema";

export class CreateSwagger extends Pessoa{
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    message: string;
    @ApiProperty()
    error: string;
}