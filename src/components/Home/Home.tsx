import * as React from 'react';
import { observer } from 'mobx-react';
import { Drink } from '../../types/drink'

interface HomeProps {
    getCocktail: () => void;
    cocktailState: string;    
    ingredients: Array<string>;
    measures: Array<string>;
    cocktail: Drink;
    translate: {
        description: string,
        alcoholic: string,
        category: string,
        measuresRu: Array<string>,
    };
}
@observer
export class Home extends React.Component<HomeProps, {}> {
    render() {
        const {
            getCocktail,
            cocktailState,
            cocktail,
            ingredients,
            measures,
            translate
        } = this.props;
        const ingredientsTable = () => (
            <table>
                <tbody>
                    {ingredients.map((el, index) => (
                        <tr key={index}>
                            <td>{el}</td>
                            <td>{measures[index]}</td>
                            <td style={{paddingLeft: 10, borderLeft: '1px solid #ccc'}}>ru: {translate.measuresRu[index]}</td>
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
                        Случайный коктейль
                    </button>                    
                </div>
                {cocktailState === 'pending' &&
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
                        <div className="cocktail__alcoholic">{translate.alcoholic}</div>
                        <div className="cocktail__category">Категория: {translate.category}</div>
                        <div className="cocktail__image-wrap">
                            <img style={{maxWidth: 250}} src={cocktail.strDrinkThumb} alt="" className="cocktail__image"/>
                        </div>
                        {ingredientsTable()}
                        <p style={{maxWidth: 400}}>{cocktail.strInstructions}</p>
                        <hr/>
                        <p style={{maxWidth: 400}}>
                            <i>Переведено сервисом «<a target="_blank" href="http://translate.yandex.ru/">Яндекс.Переводчик</a>»</i><br/>
                        </p>                        
                        <p style={{maxWidth: 400}}>
                            {translate.description}
                        </p>
                    </div>
                }
            </div>
        )
    }
}