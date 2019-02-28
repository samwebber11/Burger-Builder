import React from 'react';
import classes from './toolbar.css'
import Logo from '../../Logo/logo'
import NavBar from '../Navigation Bar/navigationbar'
import MenuToggler from '../SideDrawer/toggler/toggler'
// import Button from '../../UI/Button/button'
// import Aux from '../../../hoc/Aux'

const toolbar = (props) => (
    <header className = {classes.toolbar}>
        <MenuToggler clicked = {props.click}/>
        <div className = {classes.Logo}>
        <Logo />
        </div>
        <nav className = {classes.DesktopOnly}>
            <NavBar isAuthenticate = {props.isAuth}/>
        </nav>
    </header>
)

export default toolbar;