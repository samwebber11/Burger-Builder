import React,{Component} from 'react'
import { connect } from 'react-redux';

import Aux from '../Aux/Aux'
import Toolbar from '../../components/Navigation/Toolbar/toolbar'
import classes from './layout.css'
import SideDrawer from '../../components/Navigation/SideDrawer/sidedrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggler = () => {
        this.setState({showSideDrawer:!this.state.showSideDrawer});
    }

    render() {
    return (
        <Aux>
            <Toolbar click = {this.sideDrawerToggler}
                     isAuth = {this.props.authenticationCheck} />
            <SideDrawer
                open = {this.state.showSideDrawer}
                closed = {this.sideDrawerClosedHandler}
                isAuth = {this.props.authenticationCheck} />
            <main className = {classes.Content}>
                {this.props.children}
            </main>
        </Aux>
    )
}
}

const mapStateToProps = state => {
    return {
        authenticationCheck :state.auth.token !==null,
    }
}

export default connect(mapStateToProps)(Layout);