import React from 'react';

const styles = {
    headerContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'center',
        backgroundColor: 'rgb(5,102,141)',
        height: '10%'
    },
    text: {
        fontSize: '75px',
        textShadow: '3px rgb(0, 0, 0)',
        color: 'rgb(255, 255, 255)',
    }
}

const Header = () => {
    return (
        <div style={styles.headerContainer}>
            <div style={styles.text}>
                RxPredictify
            </div>
        </div>
    );
}

export default Header;