export class serviceConsumes {
    
    static searchGenderByName(name:string){
        fetch(`https://api.genderize.io/?name=${name}`)
        .then(res => res.json())
            .then(({name}) => {
            return name
            })
            .catch(err => {
                return err
            })
            return null;
    }
    
    static searchAgeByName(name:string){
        fetch(`https://api.agify.io/?name=${name}`)
        .then(res => res.json())
            .then(({name}) => {
            return name
            })
            .catch(err => {
                return err
            })
            return null;
    }

    static searchNationByName(name:string){
        fetch(`https://api.nationalize.io/?name=${name}`)
        .then(res => res.json())
            .then(({name}) => {
            return name
            })
            .catch(err => {
                return err
            })
            return null;
    }
    
    static searchAffirmation(){
        fetch('https://www.affirmations.dev/')
        .then(res => res.json())
            .then(({name}) => {
            return name
            })
            .catch(err => {
                return err
            })
            return null;
    }
}