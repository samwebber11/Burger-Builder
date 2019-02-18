import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux'
import classes from './modals.css'
import Backdrop from '../backdrop/backdrop'
// import backdrop from '../backdrop/backdrop';

class Modals extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.show !== this.props.show || nextProps.children !==this.props.children;
    }
    componentWillUpdate() {
        console.log('Component Modals Will Update');
    }
    render()
    {
    return (
    <Aux>
    <Backdrop show = {this.props.show}
    clicked = {this.props.modalsClosed}/>
    <div className = {classes.modals}
         style = {{transform : this.props.show ? 'translateY(0) ':'translateY(-100vh)',
                   opacity : this.props.show ? '1':'0'}}>
        {this.props.children}
    </div>
    </Aux>
    );
    }
}
export default Modals