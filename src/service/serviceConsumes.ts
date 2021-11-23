import { response } from "express";
import { ServiceConsumes } from "./pessoa.service.apis";
import axios from 'axios';
export class serviceConsumes {



    async searchGenderByName(name: string): Promise<ServiceConsumes> {
        try {
            const getUrl = await axios.get(`https://api.agify.io/?name=${name}`)

            return getUrl;
        } catch (err) {
            return response.status(404).send({ err: 'Error name' });
        }

    } 
}
/*
    static  searchGenderByName(name: string) {

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
}*/