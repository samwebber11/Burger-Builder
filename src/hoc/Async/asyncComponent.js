import React,{Component} from 'react';

const async = (importComponent) => {
    return class extends Component {
        state = {
            loaded:null,
        }
        componentDidMount() {
            importComponent()
            .then((obj) => {
                this.setState({
                    loaded:obj.default
                })
            });
        }
        render() {
            const Comp = this.state.loaded;
            return Comp ? <Comp {...this.props}/> : null;
        }
    }
}
export default async;
