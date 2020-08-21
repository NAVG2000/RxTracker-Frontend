import React from 'react';

interface selectorProps {
    name: string;
    value: string;
    label: string;
    handleChange: Function;
    options: [string, string][];
}

interface selectorState {

}

const styles = {
    formSelector: {
        width: "70%",
        padding: "15px 10px",
        margin: "0 auto",
        display: "inline-block",
        border: "1px solid rgb(177, 67, 67)",
        borderRadius: "4px",
        boxSizing: "border-box" as const
    },
    select: {
        width: '70%',
        padding: '16px 20px',
        display: 'block',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#edb8b8',
        textAlign: 'center' as const
    }
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
            <div style={styles.formSelector}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <select style={styles.select} name={this.props.name} value={this.props.value} onChange={this.handleChange}>
                    {this.createOptions()}
                </select>
            </div>
        );
    }
}

export default Selector;