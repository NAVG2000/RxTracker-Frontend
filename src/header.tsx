import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface HearderProps { }

interface HeaderState { }

class Header extends React.Component<HearderProps, HeaderState>{
    constructor(props) {
        super(props);
    }


    render() {
        return <div id='headerContainer'>
            Rx Tracker Test8
        </div>
    }
}

export default Header;