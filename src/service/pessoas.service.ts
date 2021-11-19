import { forwardRef, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PessoaDto } from 'src/dtos/pessoa.dto';
import { Pessoa } from 'src/schemas/pessoa.schema';
import { ServiceConsumes } from './pessoa.service.apis';
import siglas from 'siglas.json';
//import { serviceConsumes } from './serviceConsumes';

@Injectable()
export class PessoasService  {
  remove(id: string) {
    throw new Error('Method not implemented.');
  }
  
    
  

//constructor(@Inject(forwardRef(() => TokenService)) private readonly tokenService: TokenService) {}
 constructor(@InjectModel('Banco') private readonly bancoModel: Model<Pessoa>){

 }
 capitalizeName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

async getAll():Promise<Pessoa[]>{
  return await this.bancoModel.find().exec();
}

async getByNome(_name:string):Promise<Pessoa[]>{
  
  const nome = this.capitalizeName(_name);
  
  const content = await this.bancoModel.find({ nome: nome }).exec();
  if(content.length <= 0) {
    return Promise.reject(new HttpException('Pessoa não encontrada!', 404));
  }
  return content;
}

async getById(id:string):Promise<Pessoa>{
  const content = await this.bancoModel.findById(id).exec();
  if(content.$isEmpty) {
    return Promise.reject(new HttpException('Pessoa não encontrada!', 404))
  }
  return content;
}



async createPersonByName(name: string):Promise<Pessoa> {

  let pessoa = new Pessoa();
  pessoa.nome = this.capitalizeName(name);

  await ServiceConsumes.searchGenderByName(name)
  .then(res => {
    let genero = res.data.gender;
    genero == 'male' ? pessoa.genero = 1 : pessoa.genero = 2;
  })
  .catch(error => {
    return Promise.reject(error);
  });
  
  await ServiceConsumes.searchAgeByName(name)
  .then(res => {
    pessoa.idade = res.data.age;
  })
  .catch(error => {
    return Promise.reject(error);
  });
  
  await ServiceConsumes.searchNationByName(name)
  .then(res => {
    pessoa.pais = siglas.data.find(element => element.sigla === res.data.country[0].country_id).nome_pais;
  })
  .catch(error => {
    return Promise.reject(error);
    });
  
  await ServiceConsumes.searchAffirmation()
  .then(res => {
    pessoa.frase = res.data.affirmation;
  })
  .catch(error => {
    return Promise.reject(error);
  });

  this.create(pessoa);
  return pessoa;
}

 
   

    async consultarPessoaPornome(nome: string): Promise<Pessoa> {
      const PessoaEncontrada = await this.bancoModel.findOne({nome}).exec();

      if (!PessoaEncontrada) {
          throw new NotFoundException(`Pessoa com nome ${nome} não encontrado`)
      }
      return PessoaEncontrada
  }

    async consultarPessoaPeloId(_id: string): Promise<Pessoa> {
      const PessoaEncontrada = await this.bancoModel.findById({_id}).exec();

      if (!PessoaEncontrada) {
          throw new NotFoundException(`Pessoa com id ${_id} não encontrado`)
      }
      return PessoaEncontrada
  }


    async  create(pessoaDto:PessoaDto){
      const criarPessoa = new this.bancoModel(pessoaDto);
      return await criarPessoa.save();
   }

   async atualizarPessoa(_id: string, pessoaDto:PessoaDto): Promise<void> {

    const PessoaEncontrada = await this.bancoModel.findByIdAndUpdate(_id,pessoaDto);

    if (!PessoaEncontrada) {
        throw new NotFoundException(`Pessoa com id ${_id} não econtrada`)
    }

    await this.bancoModel.findOneAndUpdate({_id}, 
            {$set: PessoaDto}).exec()

}


   async deletarPessoa(_id): Promise<any> {

    const PessoaEncontrada = await this.bancoModel.findOne({_id}).exec();

    if (!PessoaEncontrada) {
        throw new NotFoundException(`Pessoa com id ${_id} não encontrada`)
    }

    return await this.bancoModel.deleteOne({_id}).exec();
}


 }
/*
   async getInfosByName(name: string):Promise<Pessoa> {

    let pessoa = new Pessoa();

    pessoa.genero = serviceConsumes.searchGenderByName(name);

    pessoa.idade = serviceConsumes.searchAgeByName(name);

    pessoa.pais = serviceConsumes.searchNationByName(name);

    pessoa.frase = serviceConsumes.searchAffirmation()

    return pessoa

}
//  async getAll():Promise<Pessoa>{
        
 //      return await this.bancoModel.find().exec();
//    } 
 // async getByNome(nome:String):Promise<Pessoa[]>{
 //   return await this.bancoModel.find({ nome: nome }).exec();
//}

//    async ConsultaPorNome(nome:String): Promise<Pessoa> {
      
  //    const nomeEncontrado = await this.bancoModel.findOne({nome}).exec();
 //     if (!nomeEncontrado) {
 //         throw new NotFoundException(`Pessoa com nome ${nome} não encontrado`)
 //     }
 //     return nomeEncontrado
 // }

 //   async getById(_id:string):Promise<Pessoa>{
      
 //     return await this.bancoModel.findById({_id}).exec();
 //   }

 // async  create(pessoa:Pessoa){
//       const criarPessoa = new this.bancoModel(pessoa);
//       return await criarPessoa.save();
//    }

//    async atualizar( criarPessoa:Pessoa):Promise<Pessoa>{
//      return  await this.bancoModel.findByIdAndUpdate({nome:criarPessoa.nome},{$set:criarPessoa}).exec();
         
 //    }
    /*
   async update(id:string,pessoa:Pessoa){
       await this.bancoModel.updateOne({_id: id}, pessoa).exec()
        return this.getById(id)
    }*/

  

