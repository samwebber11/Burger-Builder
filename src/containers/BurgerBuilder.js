import React,{Component} from 'react';
import Burger from '../components/Burger/burger'

import * as burgerBuilderActions from '../store/actions/index'
import Aux from '../hoc/Aux/Aux'
import Build from '../components/BuildControl/buildcontrol'
import Modals from '../components/UI/modals/modals'
import OrderSummary from '../components/OrderSummary/orderSummary'
import axios from '../axios';
import Spinner from '../components/UI/Spinner/spinner'
import errorHandler from '../hoc/ErrorHandler/errorHandler'
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
    state = {
        orderClicked: false,
        loading:false,
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
        // axios.get('https://burger-builder-b9a7a.firebaseio.com/ingredients.json')
        // .then((response) => {
        //     this.setState({
        //         ingredients:response.data
        //     })
        // }).catch(() => {
        //     this.setState({
        //         error:true
        //     })
        // });
    }
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(key =>{
            return ingredients[key];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum>0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated)
        {
            this.setState({orderClicked:true});
        }
        else{
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
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
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for(let keys in disabledInfo)
        {
            console.log(keys);
            console.log(disabledInfo[keys]);
            disabledInfo[keys] = disabledInfo[keys] <= 0;
        }
        let burgerLoader = this.props.error ? <p>Ingredients can not be loaded</p> : <Spinner />
        let orderSummary = null;
        if(this.props.ings !== null)
        {
            burgerLoader = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <Build addIngredients = {this.props.onAddition}
                    removeIngredients = {this.props.onDeletion}
                    disabledInfo = {disabledInfo}
                    prices = {this.props.price}
                    purchase = {this.updatePurchaseState(this.props.ings)}
                    isAuth = {this.props.isAuthenticated}
                    ordered = {this.purchaseHandler}/>
                </Aux>
            );
        orderSummary =  (<OrderSummary
        ingredients = {this.props.ings}
        price = {this.props.price.toFixed(2)}
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

const mapStateToProps = state => {
    return {
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.price,
    error:state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
}
}

const mapDispatchToProps = dispatch => {
    return {
        onAddition: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onDeletion: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredient()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(burgerBuilderActions.onRedirectPath(path)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder,axios));
