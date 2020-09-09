import React from 'react';

const styles = {
    headerContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row' as const,
        //justifyContent: 'center',
        backgroundColor: 'rgb(15,15,69)',
        height: '20%',
        paddingLeft: '15%'
    },
    text: {
        fontSize: '125px',
        fontFamily: 'Cormorant',
        textShadow: '3px rgb(0, 0, 0)',
        color: 'rgb(255, 255, 255)',
        paddingTop: '25px',
        paddingBottom: '25px'
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