import { Module } from '@nestjs/common';

import { PessoasModule } from './pessoas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.nt9jq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'), PessoasModule],
  controllers: [], //PessoasController],
  providers: [], //PessoasService],
})
export class AppModule { }
