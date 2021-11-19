import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PessoaValidacaoPipe } from 'src/pipes/pessoa-validacao-parametros-pipes';
//import { serviceConsumes } from 'src/service/serviceConsumes';
import { Pessoa } from 'src/schemas/pessoa.schema';

import { PessoasService } from '../service/pessoas.service';
@Controller('api/pessoa')
export class PessoasController {

  constructor(private pessoaService: PessoasService) { }

  @Get()
  async getAll(): Promise<Pessoa[]> {
    return await this.pessoaService.getAll();
  }
  @Get('/:nome')
  async ConsultarPessoaPornome(
    @Param('nome', PessoaValidacaoPipe) nome: string): Promise<Pessoa> {
    return await this.pessoaService.consultarPessoaPornome(nome)
  }

  @Get('/:_id')
  async consultarJogadorPeloId(
    @Param('_id', PessoaValidacaoPipe) _id: string): Promise<Pessoa> {
    return await this.pessoaService.consultarPessoaPeloId(_id);
  }


  /*  @Get()
   async getInfo (@Body('nome') nome) {
    return this.pessoaService.getInfosByName(nome);
  
   } */


  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() pessoa: Pessoa): Promise<Pessoa> {
    return await this.pessoaService.create(pessoa);
  }

  
  @Post('/create/:name')
  async createPersonByName(@Param('name') name: string): Promise<Pessoa> {
    return await this.pessoaService.createPersonByName(name);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
      @Body() pessoa:Pessoa, 
      @Param('_id', PessoaValidacaoPipe) _id: string): Promise<void> {
      await this.pessoaService.atualizarPessoa(_id, pessoa)
  }



  @Delete('/:_id')
  async deletar(
    @Param('_id', PessoaValidacaoPipe) _id: string): Promise<void> {
    await this.pessoaService.deletarPessoa(_id)
  }



}

/*
  @Get('pessoa')
  async getNome(@Body()body, nome:string) {
    return serviceConsumes.searchGenderByName(nome);

  }

    @Get()
     async ConsultaPorNome(@Query('nome') nome:String):Promise<Pessoa>{
       return await this.pessoaService.ConsultaPorNome(nome);
     }

  @Get('pessoa/:id')
  async getById(@Body() body, @Param('id') id) {

    return this.pessoaService.getById(id);
  }

  @Post()
  async create(@Body() pessoa: Pessoa): Promise<Pessoa> {
    return this.pessoaService.create(pessoa);
  }



  //  @Put()
  //  async atualizar(@Body()criapessoa:Pessoa):Promise<Pessoa>{
  //   return this.pessoaService.atualizar(criapessoa)
  // }
  /*@Put(':id')
    async update(@Param('id') id:string, @Body()pessoa:Pessoa):Promise<Pessoa>{
        return this.pessoaService.update(id, pessoa);
    }*/
/*
@Delete(':id')
 async delete(@Param('id') id:string){
   this.pessoaService.delete(id)
 }*/


