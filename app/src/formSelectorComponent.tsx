import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const styles = {
    formSelector: {
        width: "90%",
        display: 'flex',
        flexDirection: 'column' as const,
        //alignItems: 'center',
        marginTop: '3%'
    },
    label: {
        fontSize: '20px',
        fontFamily: 'Montserrat'
    }
}

const Selector = props => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            select: {
                marginTop: '1%',
                border: '1px solid rgb(15,15,69)',
                borderRadius: '4px',
                backgroundColor: 'rgb(255, 255, 255)',
                textAlign: 'center' as const,
                width: '100%',
                fontFamily: 'Montserrat'
            }
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