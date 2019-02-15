import React from 'react';
// import Aux from '../../../hoc/Aux'
import classes from './modals.css'

const modals = (props) => (
    <div className = {classes.modals}>
        {props.children}
    </div>
)
export default modals