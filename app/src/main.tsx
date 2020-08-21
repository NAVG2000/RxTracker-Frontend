import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import ChartForm from './chartForm';
import Header from './header';

const styles = {
    appContainer: {
        width: "80%",
        margin: "auto"
    }
}

export default function App() {
    return (
        <Provider store={store}>
            <div style={styles.appContainer}>
                <Header />
                <ChartForm />
            </div>
        </Provider>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
