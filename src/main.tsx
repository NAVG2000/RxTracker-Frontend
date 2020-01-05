import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./main.css";
import ChartForm from './chartForm';
import Header from './header';

interface AppProps {

}

interface AppState {

}

class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);


    }

    render() {
        return (<div id='AppContainer'>
            <Header />
            <ChartForm />
        </div>)
    }
}

const element =
    <App />

ReactDOM.render(
    element,
    document.getElementById('appRoot')
);
