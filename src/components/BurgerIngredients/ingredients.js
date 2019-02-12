import React,{Component} from 'react';
import PropTypes from 'prop-types'
import classes from './ingredients.css'

class BurgerIngredients extends Component {
     render()
     {
     let ingre = null;
     switch(this.props.types) {
         case('bread-button'):
            ingre = <div className = {classes.BreadBottom}></div>;
            break;
         case('bread-top'):
            ingre = (
             <div className = {classes.BreadTop}>
             <div className = {classes.Seeds1}></div>
             <div className = {classes.Seeds2}></div>
             </div>
            );
            break;
         case('meat'):
            ingre = <div className = {classes.Meat}></div>;
            break;
         case('salad'):
            ingre = <div className = {classes.Salad}></div>;
            break;
         case('cheese'):
            ingre = <div className = {classes.Cheese}></div>;
            break;
         case('bacon'):
            ingre = <div className = {classes.Bacon}></div>;
            break;
         default:
            ingre = null;

     }
     return ingre;
    }
}

BurgerIngredients.propTypes = {
    type : PropTypes.string.isRequired
};


export default BurgerIngredients;