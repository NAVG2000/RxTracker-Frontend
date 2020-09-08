import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const styles = {
    formSelector: {
        width: "70%",
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        //padding: "15px 10px",
        //margin: "0 auto",
        //display: "inline-block",
        border: "1px solid rgb(177, 67, 67)",
        borderRadius: "4px",
        //boxSizing: "border-box" as const
    },
    select: {
        width: '100%',
        margin: '10px',
        //display: 'block',
        //border: 'none',
        //borderRadius: '4px',
        backgroundColor: 'rgb(255, 255, 255)',
        textAlign: 'center' as const
    },
    label: {
        fontSize: '20px'
    }
}

const Selector = props => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            select: {
                marginTop: theme.spacing(2),
                border: '1px solid rgb(177, 67, 67)',
                borderRadius: '4px',
                backgroundColor: 'rgb(255, 255, 255)',
                textAlign: 'center' as const
            },
        }),
    );

    const classes = useStyles();

    function createOptions() {
        const options = props.options.map(
            tup => <MenuItem value={tup[0]}>{tup[1]}</MenuItem>);
        return options
    }


    return (
        <div style={styles.formSelector}>
            <label style={styles.label}>{props.label}</label>
            <Select
                className={classes.select}
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
            >
                {createOptions()}
            </Select>
        </div>
    );
}

export default Selector;