import React from 'react';
import Aux from '../../../hoc/Aux'
import classes from './modals.css'
import Backdrop from '../backdrop/backdrop'
// import backdrop from '../backdrop/backdrop';

const modals = (props) => (
    <Aux>
    <Backdrop show = {props.show}
    clicked = {props.modalsClosed}/>
    <div className = {classes.modals}
         style = {{transform : props.show ? 'translateY(0) ':'translateY(-100vh)',
                   opacity : props.show ? '1':'0'}}>
        {props.children}
    </div>
    </Aux>
)
export default modals