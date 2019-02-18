import React,{Component} from 'react';
import Aux from '../Aux/Aux'
import Modals from '../../components/UI/modals/modals'
// import Axios from 'axios';

const error = (WrappedComponent,axios) => {
    return class extends Component {
        state = {
            error:null,
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res=>res,error => {
                this.setState({error:error})
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorHandler = () => {
            this.setState({error:null});
        }

        render() {
            return (
                <Aux>
                    <Modals
                        show = {this.state.error}
                        modalsClosed = {this.errorHandler}>
                        {this.state.error ? this.state.error.message:null}
                    </Modals>
                   <WrappedComponent {...this.props}></WrappedComponent>
                </Aux>
            )
        }
    }
}

export default error;