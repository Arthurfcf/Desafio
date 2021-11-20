import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PessoaValidacaoPipe } from 'src/pipes/pessoa-validacao-parametros-pipes';
//import { serviceConsumes } from 'src/service/serviceConsumes';
import { Pessoa } from 'src/schemas/pessoa.schema';

import { PessoasService } from '../service/pessoas.service';
@Controller('api/pessoa')
@ApiTags('Desafio')
export class PessoasController {

  constructor(private pessoaService: PessoasService) { }

  @Get()
  @ApiOperation({summary: 'Lista todos os itens do banco'})
  @ApiResponse({status: 200, description: 'Listagem de todos os itens no banco de dados'})
  @ApiResponse({status: 400, description:'Parametros invalidos'})
  async getAll(): Promise<Pessoa[]> {
    return await this.pessoaService.getAll();
  }
  @Get('/:nome')
  @ApiOperation({summary: 'Lista item pelo Nome'})
  async ConsultarPessoaPornome(
    @Param('nome', PessoaValidacaoPipe) nome: string): Promise<Pessoa> {
    return await this.pessoaService.consultarPessoaPornome(nome)
  }

  @Get('/:_id')
  @ApiOperation({summary: 'Listagem por ID'})
  async consultarJogadorPeloId(
    @Param('_id', PessoaValidacaoPipe) _id: string): Promise<Pessoa> {
    return await this.pessoaService.consultarPessoaPeloId(_id);
  }


  /*  @Get()
   async getInfo (@Body('nome') nome) {
    return this.pessoaService.getInfosByName(nome);
  
   } */


  @Post()
  @ApiOperation({summary: 'Cria item no banco de dados '})
  @UsePipes(ValidationPipe)
  async create(@Body() pessoa: Pessoa): Promise<Pessoa> {
    return await this.pessoaService.create(pessoa);
  }

  
  @Post('/create/:name')
  @ApiOperation({summary: 'Cria item utilizando os parametros da API externa'})
  async createPersonByName(@Param('name') name: string): Promise<Pessoa> {
    return await this.pessoaService.createPersonByName(name);
  }

  @Put('/:_id')
  @ApiOperation({summary: 'Atualiza item no banco de dados'})
  @UsePipes(ValidationPipe)
  async atualizarJogador(
      @Body() pessoa:Pessoa, 
      @Param('_id', PessoaValidacaoPipe) _id: string): Promise<void> {
      await this.pessoaService.atualizarPessoa(_id, pessoa)
  }



  @Delete('/:_id')
  @ApiOperation({summary: 'Remove item do banco de dados'})
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


