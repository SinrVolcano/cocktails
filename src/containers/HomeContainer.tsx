import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ApplicationStore } from '../stores/ApplicationStore';
import { Home } from '../components/Home/Home';

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
        let i = 1;
        while(cocktail && i < 16 && cocktail[`strIngredient${i}`]) {
            ingredients.push(cocktail[`strIngredient${i}`]);
            measures.push(cocktail[`strMeasure${i}`]);
            i++;
        }
        return (
            <Home
                getCocktail={store.getCocktail}
                state={store.state}
                cocktail={store.cocktail}
                ingredients={ingredients}
                measures={measures}
            />
        )
    }
}