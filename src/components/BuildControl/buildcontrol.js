import React from 'react';
import classes from './buildcontrol.css';
import Control from './control/control'

const controls =[
    {label:'Salad',type:'salad'},
    {label:'Meat',type:'meat'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},];

const build = (props) => (
    <div className = {classes.build}>
        <p>Current Price: <strong>{props.prices.toFixed(2)}</strong></p>
        {controls.map(ctrl => <Control
        addMore = {()=>props.addIngredients(ctrl.type)}
        removeLess = {() => props.removeIngredients(ctrl.type)}
        disabled = {props.disabledInfo[ctrl.type]}
        label = {ctrl.label}
        key = {ctrl.label}/>)}
        <button className = {classes.order}
         disabled = {!props.purchase}
         onClick = {props.ordered}>{ props.isAuth ? 'Order Now': 'Sign Up for Order' }</button>
    </div>
)

export default build;