import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PessoaValidacaoPipe } from 'src/pipes/pessoa-validacao-parametros-pipes';
//import { serviceConsumes } from 'src/service/serviceConsumes';
import { Pessoa } from 'src/schemas/pessoa.schema';
import { BadRequestSwagger } from 'src/swagger/bad.request.error';
import { CreateSwagger } from 'src/swagger/createSwagger';

import { IndexSwagger } from 'src/swagger/index.swagger';
import { NotFoundSwagger } from 'src/swagger/not.found.swagger';
import { InternalErrosServer } from 'src/swagger/server.error';
import { UpdateSwagger } from 'src/swagger/udpate.swagger';

import { PessoasService } from '../service/pessoas.service';
@Controller('api/pessoa')
@ApiTags('Desafio')
export class PessoasController {

  constructor(private pessoaService: PessoasService) { }

  @Get()
  @ApiProperty()
  @ApiOperation({summary: 'Lista todos os itens do banco'})
  @ApiResponse({status: 200, description: 'Listagem de todos os itens no banco de dados', type:IndexSwagger})
 // @ApiResponse({status: 400, description:'Parametros invalidos', type: BadRequestSwagger})
  @UsePipes(ValidationPipe)
  async getAll(): Promise<Pessoa[]> {
    return await this.pessoaService.getAll();
  }
  @Get('/:nome')
  @ApiProperty()
  @ApiOperation({summary: 'Lista item pelo Nome'})
  @ApiResponse({status: 200, description: 'Busca usuário pelo nome retorna com sucesso'})
  @ApiResponse({status: 404, description:'Usuário não encontrado', type: NotFoundSwagger})
  @UsePipes(ValidationPipe)
  async ConsultarPessoaPornome(
    @Param('nome', PessoaValidacaoPipe) nome: string): Promise<Pessoa> {
    return await this.pessoaService.consultarPessoaPornome(nome)
  }

  @Get('/:_id')
  @ApiProperty()
  @ApiOperation({summary: 'Listagem por ID'})
  @ApiResponse({status: 200, description: 'Busca usuário pelo ID'})
  @ApiResponse({status: 400, description:'Parametros invalidos', type: BadRequestSwagger})
  @UsePipes(ValidationPipe)
  async consultarPessoaPeloId(
    @Param('_id', PessoaValidacaoPipe) _id: string): Promise<Pessoa> {
    return await this.pessoaService.consultarPessoaPeloId(_id);
  }


  /*  @Get()
   async getInfo (@Body('nome') nome) {
    return this.pessoaService.getInfosByName(nome);
  
   } */


  @Post()
  @ApiProperty()
  @ApiOperation({summary: 'Cria item no banco de dados '})
  @ApiResponse({status: 200, description: 'Cria usuário no banco de dados', type: CreateSwagger,})
  @ApiResponse({status: 400, description:'Parametros invalidos', type: BadRequestSwagger})
  @UsePipes(ValidationPipe)
  async create(@Body() pessoa: Pessoa): Promise<Pessoa> {
    return await this.pessoaService.create(pessoa);
  }

  
  @Post('/create/:name')
  @ApiProperty()
  @ApiOperation({summary: 'Cria item utilizando os parametros da API externa'})
  @ApiResponse({status: 200, description: 'Cria usuário usando APIs externas'})
  @UsePipes(ValidationPipe)
  async createPersonByName(@Param('name') name: string): Promise<Pessoa> {
    return await this.pessoaService.createPersonByName(name);
  }

  @Put('/:_id')
  @ApiProperty()
  @ApiOperation({summary: 'Atualiza item no banco de dados'})
  @ApiResponse({status: 200, description: 'Usuário atualizado com sucesso', type:UpdateSwagger})
  @ApiResponse({status: 400, description:'Dados invalidos', type: BadRequestSwagger})
  @ApiResponse({status: 404, description:'Usuário não encontrado',type: NotFoundSwagger})
  @UsePipes(ValidationPipe)
  async atualizarJogador(
      @Body() pessoa:Pessoa, 
      @Param('_id', PessoaValidacaoPipe) _id: string): Promise<void> {
      await this.pessoaService.atualizarPessoa(_id, pessoa)
  }



  @Delete('/:_id')
  @ApiProperty()
  @ApiOperation({summary: 'Remove item do banco de dados'})
  @ApiResponse({status: 204, description: 'Usuário removido com sucesso'})
  @ApiResponse({status: 404, description:'Usuário não encontrado', type: NotFoundSwagger})
  @ApiResponse({status: 500, description:'Erro interno servidor ', type: InternalErrosServer})
  @UsePipes(ValidationPipe)
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


