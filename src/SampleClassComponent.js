import React, { Component } from 'react';
import { Button } from '@nextui-org/react';

class SampleClassComponent extends Component {
    constructor() {
        super();

        this.state = {
            todos: [],
            itemBeingEdited: false,
            filter: 'all',
            isOpen: false,
        };

        console.log('constructor');
    }

    componentDidMount() {
        console.log('Component mounted');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('did update');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // if (this.props.x == nextProps.x) return true;
        // return false;
    }

    componentWillUnmount() {}

    onClickButton = () => {
        this.setState({ ...this.state, todos: [...this.state.todos, {}] });
    };

    render() {
        console.log('rendered');

        return (
            <div>
                <Button onClick={this.onClickButton}>Test</Button>
            </div>
        );
    }
}

export default SampleClassComponent;
