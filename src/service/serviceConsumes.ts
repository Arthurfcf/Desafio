import { response } from "express";
import { ServiceConsumes } from "./pessoa.service.apis";
import axios from 'axios';
export class serviceConsumes {
  static getAge(name: string) {
    throw new Error('Method not implemented.');
  }
   

    static async searchGenderByName(name: string): Promise<ServiceConsumes> {
        try {
            const getUrl =  axios.get(`https://api.genderize.io/?name=${name}`)

            return getUrl;
        } catch (err) {
            return response.status(404).send({ err: 'Error name' });
        }

    }
  static  async searchAgeByName(name: string): Promise<ServiceConsumes> {
        try{
            const getAge = await axios.get(`https://api.nationalize.io/?name=${name}`)
            return getAge;
        }catch (err) {
            return response.status(404).send({ err: 'Error Age' });
        }
    }

  static  async searchNationByName(name: string) {
        try {
            const getNationality = await axios.get(`https://api.nationalize.io/?name=${name}`)
            return getNationality;
        } catch (err) {

            return response.status(404).send({ err: 'Error Nationality' });
        }
    }
  static  async searchAffirmation(name: string) {
        try {
            const getAffirmation = await axios.get(`https://www.affirmations.dev/?name=${name}`)
        } catch (err) {

            return response.status(404).send({ err: 'Error Affirmation' });

        }
    }
}




/*    static  searchGenderByName(name: string) {

       fetch(`https://api.agify.io/?name=${name}`)
           .then(res => res.json())
           .then(({ name }) => {
               return name
           })
           .catch(err => {
               return err
           })
       return null;
   }


   static searchNationByName(name: string) {
       fetch(`https://api.nationalize.io/?name=${name}`)
           .then(res => res.json())
           .then(({ name }) => {
               return name
           })
           .catch(err => {
               return err
           })
       return null;
   }

   static searchAffirmation() {
       fetch('https://www.affirmations.dev/')
           .then(res => res.json())
           .then(({ name }) => {
               return name
           })
           .catch(err => {
               return err
           })
       return null;
   }
} */