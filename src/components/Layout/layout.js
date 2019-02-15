import React from 'react'
import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/toolbar'
import classes from './layout.css'

const layout = (props) => (
    <Aux>
    <Toolbar />
    <main className = {classes.Content}>
        {props.children}
    </main>
    </Aux>
);


export default layout;
