import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

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
        return (
            <Provider store={store}>
                <div id='AppContainer'>
                    <Header />
                    <ChartForm />
                </div>
            </Provider>)
    }
}

const element = <App />;

ReactDOM.render(
    element,
    document.getElementById('appRoot')
);
