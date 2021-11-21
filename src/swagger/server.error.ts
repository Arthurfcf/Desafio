import { ApiProperty } from "@nestjs/swagger";
    export class InternalErrosServer {
        @ApiProperty()
        statusCode: number;
        @ApiProperty()
        message: string;
    }


