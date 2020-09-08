import "./main.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import ChartForm from './chartForm';
import Chart from './chart';
import Header from './header';

const styles = {
    appContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column' as const,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    body: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row' as const,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '90%',
    }
}

export default function App() {
    return (
        <div style={styles.appContainer}>
            <Provider store={store}>
                <Header />
                <div style={styles.body}>
                    <ChartForm />
                    <Chart />
                </div>
            </Provider>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
