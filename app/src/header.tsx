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
            RxTrackify
        </div>
    }
}

export default Header;