import React,{Component} from 'react';
import Burger from '../components/Burger/burger'
import Aux from '../hoc/Aux'
import Build from '../components/BuildControl/buildcontrol'


const prices = {
        salad: 1.0,
        bacon: 0.5,
        cheese: 0.3,
        meat: 1.2
}

class BurgerBuilder extends Component {
    // constructor(props)
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice:0,
        purchased: false,
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(key =>{
            return ingredients[key];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({purchased:sum>0});
    }
    addIngredients = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount+1;
        const updated = {...this.state.ingredients};
        updated[type] = newCount;
        const newPrice = prices[type]+this.state.totalPrice;
        this.setState({
            ingredients:updated,
            totalPrice:newPrice
        });
        this.updatePurchaseState(updated);
    }

    removeIngredients = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0)
        {
            return ;
        }
        const newCount = oldCount-1;
        const updated = {...this.state.ingredients};
        updated[type] = newCount;
        const newPrice = this.state.totalPrice - prices[type];
        this.setState({
            ingredients:updated,
            totalPrice:newPrice,
        });
        this.updatePurchaseState(updated);
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let keys in disabledInfo)
        {
            console.log(keys);
            console.log(disabledInfo[keys]);
            disabledInfo[keys] = disabledInfo[keys] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <Build addIngredients = {this.addIngredients}
                removeIngredients = {this.removeIngredients}
                disabledInfo = {disabledInfo}
                prices = {this.state.totalPrice}
                purchase = {this.state.purchased}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;