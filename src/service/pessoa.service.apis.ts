import axios from 'axios';

export class ServiceConsumes {
    
    static async searchGenderByName(name){
        return await axios({
            method: 'GET',
            url: `https://api.genderize.io/?name=${name}`
        });
    }
    
    static async searchAgeByName(name){
        return await axios({
            method: 'GET',
            url: `https://api.agify.io/?name=${name}`
        })
    }

    static async searchNationByName(name){
        return await axios({
            method: 'GET',
            url: `https://api.nationalize.io/?name=${name}`
        })
    }

    static async searchAffirmation(){
        return await axios({
            method: 'GET',
            url: `https://www.affirmations.dev/`
        })
    }
    
}