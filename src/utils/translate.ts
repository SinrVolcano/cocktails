import { getYandexTranslate } from '../services/getYandexTranslate'

export const translateCategory = (categoryInEnglish: string): string => {
    switch(categoryInEnglish) {
        case 'Shot': 
            return 'Шот';
        case 'Ordinary Drink': 
            return 'Простой напиток / Микс';
        case 'Cocktail': 
            return 'Коктейль';
        case 'Other/Unknown': 
            return 'Коктейль';
        case 'Coffee / Tea':
            return 'Кофе / Чай';
        case 'Punch / Party Drink':
            return 'Пунш / Для вечеринки';
        case 'Soft Drink / Soda':
            return 'Безалкогольный / Содовая';
        case 'Beer':
            return 'Коктейль с пивом';
        case 'Cocoa':
            return 'Какао';            
        default: return categoryInEnglish;
    }
}

export const translateIngredient = async (ingredientInEnglish: string) => {
    switch(ingredientInEnglish) {
        case 'Shot': 
            return 'Шот';
        case 'Ordinary Drink': 
            return 'Простой напиток / Микс';
        case 'Cocktail': 
            return 'Коктейль';
        default:
            return await getYandexTranslate(ingredientInEnglish);
    }
}
