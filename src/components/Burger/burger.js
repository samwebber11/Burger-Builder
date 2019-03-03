import React from 'react'
import classes from './burger.css'
import BurgerIngredient from '../BurgerIngredients/ingredients'

const burger = (props) => {
    let transform = null;
    transform = Object.keys(props.ingredients).map(
        key1 => {

            return [...Array(props.ingredients[key1])].map((_,i)=> {

                // console.log("this is what i am getting");
               return <BurgerIngredient key = {key1+i} type = {key1} />
            });
        }).reduce((arr,current) => {
            return arr.concat(current);
        });
        if(transform.length === 0)
        {
            transform = <p>No Ingredients added. Plz add some ingredients</p>;
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