import { observable, action } from 'mobx';
import { Drink, DrinksResponse } from '../types/drink';
import { responseProcess } from '../services/common';
import { getYandexTranslate } from '../services/getYandexTranslate'

export class ApplicationStore {
    @observable cocktail: Drink;
    @observable cocktailState: string;
    @observable translateState: string;
    @observable descriptionRu: string;


    @action.bound
    async getCocktail() {
        this.cocktailState = 'pending';
        const json = await responseProcess('https://www.thecocktaildb.com/api/json/v1/1/random.php', null);
        this.cocktailState = 'done';
        this.cocktail = json.drinks[0];
        this.descriptionRu = await this.getTranslate(this.cocktail.strInstructions)
    }
    @action.bound
    async getTranslate(text: string) {
        this.translateState = 'pending';
        const translateResponse = await getYandexTranslate(text);
        this.translateState = 'done';
        return translateResponse.text[0];
    }    
}