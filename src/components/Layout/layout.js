import React,{Component} from 'react'
import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/toolbar'
import classes from './layout.css'
import SideDrawer from '../../components/Navigation/SideDrawer/sidedrawer'

class Layout extends Component {
    state = {
        showSideDrawer: true,
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
            <Toolbar click = {this.sideDrawerToggler}/>
            <SideDrawer
                open = {this.state.showSideDrawer}
                closed = {this.sideDrawerClosedHandler} />
            <main className = {classes.Content}>
                {this.props.children}
            </main>
        </Aux>
    )
}
}

export default Layout;