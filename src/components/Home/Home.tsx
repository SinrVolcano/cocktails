import * as React from 'react';
import { observer } from 'mobx-react';
import { Drink } from '../../types/drink'
import { Button, Container, NumberDisplay } from './styles';

interface HomeProps {
    getCocktail: () => void;
    state: string;    
    ingredients: Array<string>;
    measures: Array<string>;
    cocktail: Drink;
}
@observer
export class Home extends React.Component<HomeProps, {}> {
    render() {
        const {
            getCocktail,
            state,
            cocktail,
            ingredients,
            measures
        } = this.props;
        const ingredientsTable = () => (
            <table>
                <tbody>
                    {ingredients.map((el, index) => (
                        <tr>
                            <td>{el}</td>
                            <td>{measures[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
        return (
            <div style={{fontSize: 16, fontFamily: 'sans-serif'}}>
                <div>
                    <button
                        style={{fontSize: 24, backgroundColor: "#fff", border: '2px solid #ccc', padding: 20}}
                        type="button"
                        onClick={getCocktail}
                    >
                        Get random cocktail
                    </button>                    
                </div>
                {state === 'pending' &&
                    <div style={{
                        position: 'fixed',
                        background: '#fff',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <img style={{width: '100%'}} src="https://cdn.dribbble.com/users/1650505/screenshots/4869724/martini.gif" alt=""/>
                    </div>
                }
                {cocktail &&
                    <div className="cocktail">
                        <h1 className="cocktail__title">{cocktail.strDrink}</h1>
                        <div className="cocktail__alcoholic">{cocktail.strAlcoholic}</div>
                        <div className="cocktail__category">Категория: {cocktail.strCategory}</div>
                        <div className="cocktail__image-wrap">
                            <img style={{maxWidth: 250}} src={cocktail.strDrinkThumb} alt="" className="cocktail__image"/>
                        </div>
                        {ingredientsTable()}
                        <p style={{maxWidth: 400}}>{cocktail.strInstructions}</p>                        
                    </div>
                }
            </div>
        )
    }
}