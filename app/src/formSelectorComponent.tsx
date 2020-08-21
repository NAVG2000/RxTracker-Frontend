import React from 'react';

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

const Selector = props => {
    function createOptions() {
        const options = props.options.map(
            tup => <option value={tup[0]}> {tup[1]}</option>);
        return options
    }


    return (
        <div style={styles.formSelector}>
            <label htmlFor={props.name}>{props.label}</label>
            <select style={styles.select} name={props.name} value={props.value} onChange={props.handleChange}>
                {createOptions()}
            </select>
        </div>
    );
}

export default Selector;