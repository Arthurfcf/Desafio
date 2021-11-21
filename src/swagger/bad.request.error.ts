import { ApiProperty } from "@nestjs/swagger";
//testecommit
export class BadRequestSwagger {
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    message: string[];
    @ApiProperty()
    error: string;
}