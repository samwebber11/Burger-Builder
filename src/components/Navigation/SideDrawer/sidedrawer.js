import React from 'react'
import Logo from '../../Logo/logo'
import Navbar from '../Navigation Bar/navigationbar'
import classes from './sidedrawer.css'
import Backdrop from '../../UI/backdrop/backdrop'
import Aux from '../../../hoc/Aux/Aux'

const sideDrawer = (props) => {
    let attach = [classes.SideDrawer,classes.Close];
    if(props.open) {
        attach = [classes.SideDrawer,classes.Open];
    }
    return (
        <Aux>
        <Backdrop show={props.open} clicked = {props.closed}/>
        <div className = {attach.join(' ')}>
            <div className = {classes.Logo}>
            <Logo />
            </div>
            <nav>
                <Navbar isAuthenticate = {props.isAuth}/>
            </nav>
        </div>
        </Aux>
    )
}

export default sideDrawer;
