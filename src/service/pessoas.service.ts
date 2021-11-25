import { forwardRef, HttpException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PessoaDto } from 'src/dtos/pessoa.dto';
import { Pessoa } from 'src/schemas/pessoa.schema';
import { ServiceConsumes } from './pessoa.service.apis';
import siglas from 'siglas.json';
import teste from 'teste.json';
import { serviceConsumes } from './serviceConsumes';


@Injectable()
export class PessoasService {

  constructor(@InjectModel('Banco') private readonly bancoModel: Model<Pessoa>) {

  }
  capitalizeName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }




  async getByNome(_name: string): Promise<Pessoa[]> {

    const nome = this.capitalizeName(_name);

    const content = await this.bancoModel.find({ nome: nome }).exec();
    if (content.length <= 0) {
      return Promise.reject(new HttpException('Pessoa não encontrada!', 404));
    }
    return content;
  }


  async getPersonByName(name: string): Promise<Pessoa> {

    let pessoa = new Pessoa();
    pessoa.nome = this.capitalizeName(name);

    try {
      let getGenero = await ServiceConsumes.searchGenderByName(name)
      let genero = getGenero.data.gender;
      genero == 'male' ? pessoa.genero = 1 : pessoa.genero = 2;
    } catch (err) {
      console.error(err);
    }
  
  try {
    let getAge =  await ServiceConsumes.searchAgeByName(name)
    pessoa.idade = getAge.data.age;
  } catch (err) {
    return Promise.reject(err);
  }

 

 try {
   let getNationality = await ServiceConsumes.searchNationByName(name)
   let Nationality = getNationality;
   pessoa.pais = siglas.data.find(element => element.sigla === Nationality.data.country[0].country_id).nome_pais;

 }catch (err) {
  return Promise.reject(err);
}

 /* 
    await ServiceConsumes.searchNationByName(name)
      .then(res => {

        pessoa.pais = siglas.data.find(element => element.sigla === res.data.country[0].country_id).nome_pais;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  */
try {
 let getAffirmation = await ServiceConsumes.searchAffirmation()
 let affirmation = getAffirmation;
 pessoa.frase =  affirmation.data.affirmation
}catch (error) {
  return Promise.reject(error);
}

this.getAll();
return pessoa;
}

async getAll(): Promise<Pessoa[]> {
  return await this.bancoModel.find().exec();
}
  async consultarPessoaPornome(nome: string): Promise<Pessoa> {
    const PessoaEncontrada = await this.bancoModel.findOne({ nome }).exec();

    if (!PessoaEncontrada) {
      throw new NotFoundException(`Pessoa com nome ${nome} não encontrado`)
    }
    return PessoaEncontrada
  }

  async consultarPessoaPeloId(_id: string): Promise<PessoaDto> {
    const PessoaEncontrada = await this.bancoModel.findById({_id}).exec();
    if (!PessoaEncontrada) {
      throw new NotFoundException(`Pessoa com id ${_id} não encontrado`)
    }
    return PessoaEncontrada
  }


  async create(pessoaDto: PessoaDto) {
    const criarPessoa = new this.bancoModel(pessoaDto);
    return await criarPessoa.save();
  }

  async atualizarPessoa(_id: string, pessoaDto: PessoaDto): Promise<void> {

    const PessoaEncontrada = await this.bancoModel.findByIdAndUpdate(_id, pessoaDto);

    if (!PessoaEncontrada) {
      throw new NotFoundException(`Pessoa com id ${_id} não econtrada`)
    }

    await this.bancoModel.findOneAndUpdate({ _id },
      { $set: PessoaDto }).exec()

  }


  async deletarPessoa(_id): Promise<any> {

    const PessoaEncontrada = await this.bancoModel.findOne({ _id }).exec();

    if (!PessoaEncontrada) {
      throw new NotFoundException(`Pessoa com id ${_id} não encontrada`)
    }

    return await this.bancoModel.deleteOne({ _id }).exec();
  }


}


