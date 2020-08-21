import React from 'react';

const styles = {
    headerContainer: {
        width: '100%',
        display: 'flexbox',
        fontSize: '42px',
        textAlign: 'center' as const,
        color: 'rgb(172, 68, 68)',
        textShadow: '3px rgb(0, 0, 0)',
        height: '10%'
    }
}

const Header = () => {
    return (
        <div style={styles.headerContainer}>
            RxTrackify
        </div>
    );
}

export default Header;