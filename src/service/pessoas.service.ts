import { forwardRef, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pessoa } from 'src/schemas/pessoa.schema';
//import { serviceConsumes } from './serviceConsumes';

@Injectable()
export class PessoasService  {
  remove(id: string) {
    throw new Error('Method not implemented.');
  }
  
    
  

//constructor(@Inject(forwardRef(() => TokenService)) private readonly tokenService: TokenService) {}
 constructor(@InjectModel('Banco') private readonly bancoModel: Model<Pessoa>){

 }

 
   async getAll():Promise<Pessoa[]>{
        return await this.bancoModel.find().exec();
    }

    async consultarPessoaPornome(nome: string): Promise<Pessoa> {
      const PessoaEncontrada = await this.bancoModel.findOne({nome}).exec();

      if (!PessoaEncontrada) {
          throw new NotFoundException(`Pessoa com nome ${nome} não encontrado`)
      }
      return PessoaEncontrada
  }

    async consultarPessoaPeloId(_id: string): Promise<Pessoa> {
      const PessoaEncontrada = await this.bancoModel.findOne({_id}).exec();

      if (!PessoaEncontrada) {
          throw new NotFoundException(`Pessoa com id ${_id} não encontrado`)
      }
      return PessoaEncontrada
  }


    async  create(pessoa:Pessoa){
      const criarPessoa = new this.bancoModel(pessoa);
      return await criarPessoa.save();
   }

   async atualizarPessoa(_id: string, pessoa:Pessoa): Promise<void> {

    const PessoaEncontrada = await this.bancoModel.findByIdAndUpdate(_id,pessoa);

    if (!PessoaEncontrada) {
        throw new NotFoundException(`Pessoa com id ${_id} não econtrada`)
    }

    await this.bancoModel.findOneAndUpdate({_id}, 
            {$set: Pessoa}).exec()

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

  

