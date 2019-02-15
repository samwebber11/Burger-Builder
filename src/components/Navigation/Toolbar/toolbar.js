import React from 'react';
import classes from './toolbar.css'
import Logo from '../../Logo/logo'

const toolbar = (props) => (
    <header className = {classes.toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            ...
        </nav>
    </header>
)

export default toolbar;