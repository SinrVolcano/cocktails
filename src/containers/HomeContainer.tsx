import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ApplicationStore } from '../stores/ApplicationStore';
import { Home } from '../components/Home/Home';
import { translateCategory } from '../utils/translate'
import { translateIngredient } from '../utils/translate'
import { parseMeasure } from '../utils/measures'

interface HomeContainerProps {
    store?: ApplicationStore;
}

@inject('store')
@observer
export class HomeContainer extends React.Component<HomeContainerProps, {}> {

    render() {        
        const { store } = this.props;
        const { cocktail } = store;
        const ingredients: Array<string> = [];
        const measures: Array<string> = [];
        const ingredientsRu: Array<string> = [];
        const measuresRu: Array<string> = [];
        const alcoholic = cocktail && cocktail.strAlcoholic === 'Alcoholic' ?
            'Алкогольный' : 'Безалкогольный';
        const category = cocktail && translateCategory(cocktail.strCategory);
        let i = 1;
        while(cocktail && i < 16 && cocktail[`strIngredient${i}`]) {
            ingredients.push(cocktail[`strIngredient${i}`]);
            measures.push(cocktail[`strMeasure${i}`]);
            ingredientsRu.push(translateIngredient(cocktail[`strIngredient${i}`]));
            measuresRu.push(parseMeasure(cocktail[`strMeasure${i}`]));
            i++;
        }
        return (
            <Home
                getCocktail={store.getCocktail}
                cocktailState={store.cocktailState}
                cocktail={cocktail}
                ingredients={ingredients}
                measures={measures}
                translate={{
                    description: store.descriptionRu,
                    alcoholic,
                    category,
                    measuresRu,
                }}
            />
        )
    }
}