import { observable, action } from 'mobx';
import { Drink, DrinksResponse } from '../types/drink';

export class ApplicationStore {
    @observable cocktail: Drink;
    @observable state: any = null;

    responseProcess = async (response: Response) => {
        if (response.status === 200) {
            const json: DrinksResponse = await response.json();
            this.getCocktailSuccess(json);
        }
    } 
    getJson = async (response: Response) => {
        return await response.json();
    }
    getCocktailResponse = async () => {        
        return await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    }


    @action.bound
    async getCocktail() {
        this.state = 'pending';
        const response: Response = await this.getCocktailResponse();
        this.responseProcess(response);
    }
    @action.bound
    getCocktailSuccess(json: DrinksResponse) {
        console.log(json);
        setTimeout(()=>{
            this.state = 'done';
        }, 4500);
        
        this.cocktail = json.drinks[0];              
    }    
    @action.bound
    getCocktailError(error: any) {
        console.log(error);
        this.state = 'error';
    }
}