import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
export class PessoaValidacaoPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(!value){
            throw new BadRequestException(`O valor ${metadata.data} de ser informado`)
        }
      
        return value
    }

}