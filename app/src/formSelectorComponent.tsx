import * as React from 'react';

interface selectorProps {
    name: string;
    value: string;
    label: string;
    handleChange: Function;
    options: [string, string][];
}

interface selectorState {

}

class Selector extends React.Component<selectorProps, selectorState>{
    constructor(props) {
        super(props);
        this.createOptions = this.createOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    createOptions() {
        const options = this.props.options.map(
            tup => <option value={tup[0]}> {tup[1]}</option>);
        return options
    }

    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.props.handleChange(e);
    }

    render() {
        return (
            <div className='formSelector'>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <select name={this.props.name} value={this.props.value} onChange={this.handleChange}>
                    {this.createOptions()}
                </select>
            </div>
        );
    }
}

export default Selector;