import React from 'react'
import classes from './burger.css'
import BurgerIngredient from '../BurgerIngredients/ingredients'

const burger = (props) => {

    const transform = Object.keys(props.ingredients).map(
        key1 => {
            console.log(key1);
            return [...Array(props.ingredients[key1])].map((_,i)=> {
                console.log(key1+i);
                // console.log("this is what i am getting");
               return <BurgerIngredient key = {key1+i} type = {key1} />
            });
        }).reduce((arr,current) => {
            return arr.concat(current);
        });
        if(transform.length === 0)
        {
            console.log("No Ingredients added. Plz add some ingredients");
        }
      return (
          <div className = {classes.Burger}>
              <BurgerIngredient type="bread-top" />
                {transform}
              <BurgerIngredient type="bread-bottom" />
          </div>
      );
}

export default burger;