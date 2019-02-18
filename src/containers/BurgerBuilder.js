import React,{Component} from 'react';
import Burger from '../components/Burger/burger'
import Aux from '../hoc/Aux/Aux'
import Build from '../components/BuildControl/buildcontrol'
import Modals from '../components/UI/modals/modals'
import OrderSummary from '../components/OrderSummary/orderSummary'
import axios from '../axios';
import Spinner from '../components/UI/Spinner/spinner'
import errorHandler from '../hoc/ErrorHandler/errorHandler'
// import burger from '../components/Burger/burger';

const prices = {
        salad: 1.0,
        bacon: 0.5,
        cheese: 0.3,
        meat: 1.2
}

class BurgerBuilder extends Component {
    // constructor(props)
    state = {
        ingredients: null,
        totalPrice:0,
        purchased: false,
        orderClicked: false,
        loading:false,
        error:false,
    }


    componentDidMount() {
        axios.get('https://burger-builder-b9a7a.firebaseio.com/ingredients.json')
        .then((response) => {
            this.setState({
                ingredients:response.data
            })
        }).catch(() => {
            this.setState({
                error:true
            })
        })
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
    purchaseHandler = () => {
        this.setState({orderClicked:true});
    }

    purchaseCancelHandler = () => {
        this.setState({orderClicked:false});
    }

    purchaseContinueHandler = () => {
        // alert('You should continue');
        // this.setState({loading:true})
        // const order = {
        //     ingredients:this.state.ingredients,
        //     price:this.state.totalPrice,
        //     customer: {
        //         name:'Kumar Sambhav Jain',
        //         address: {
        //             street:'22 raja garden',
        //             zipCode:'147021',
        //             country:'India',
        //         },
        //         email:'samjain15291@gmail.com'
        //     },
        //     deliveryMethod:'fastest',
        // }
        // axios.post('/orders.json',order).then((response) => {
        //     this.setState({loading:false,
        //         orderClicked:false});
        // }).catch(error => this.setState({loading:false,
        //     orderClicked:false}));

        const queryParams = [];
        for(let i in this.state.ingredients)
        {
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        console.log(queryParams);
        const queryString = queryParams.join('&');
        console.log(queryString);
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString,
        });
    }
    // orderNowHandler = () => {
    //     const purchase = this.state.purchased;
    //     const updated = {...this.state.ingredients};
    //     const update = Object.keys(updated).map((key) => {
    //         return (key = 0)
    //     });
    //     if(purchase)
    //     {
    //         this.setState = ({
    //             ingredients : updated,
    //             purchased: false,
    //             totalPrice: 0,
    //             orderClicked: false,
    //         })
    //     }
    // }
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
        let burgerLoader = this.state.error ? <p>Ingredients can not be loaded</p> : <Spinner />
        let orderSummary = null;
        if(this.state.ingredients !== null)
        {
            burgerLoader = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <Build addIngredients = {this.addIngredients}
                    removeIngredients = {this.removeIngredients}
                    disabledInfo = {disabledInfo}
                    prices = {this.state.totalPrice}
                    purchase = {this.state.purchased}
                    ordered = {this.purchaseHandler}/>
                </Aux>
            );
        orderSummary =  (<OrderSummary
        ingredients = {this.state.ingredients}
        price = {this.state.totalPrice.toFixed(2)}
        purchaseCancelled = {this.purchaseCancelHandler}
        purchaseContinue = {this.purchaseContinueHandler}
        />
        )
        }
        if(this.state.loading)
        {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modals show ={this.state.orderClicked}
                modalsClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modals>
                {burgerLoader}
            </Aux>
        );
    }
}

export default errorHandler(BurgerBuilder,axios);