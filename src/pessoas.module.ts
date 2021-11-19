import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PessoasController } from './controller/pessoas.controller';
import { PessoaSchema } from './schemas/pessoa.schema';
import { PessoasService } from './service/pessoas.service';

@Module({
    imports: [MongooseModule.forFeature([{name:'Banco', schema:PessoaSchema}])],
    controllers: [PessoasController],
    providers: [PessoasService]
})
export class PessoasModule {}
