import React from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Selector from './formSelectorComponent';
import { updateChart, createChartThunk } from './actions';

const styles = {
    chartFormContainer: {
        marginTop: '30px',
        marginLeft: '30px',
        marginRight: '30px',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        backgroundColor: 'rgb(211, 238, 255)',
        border: "2px solid rgb(157, 2, 8)",
        borderRadius: "8px",
    },
    form: {
        minWidth: 120,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
}

const ChartFormComponent = props => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            button: {
                width: '35%',
                backgroundColor: 'rgb(157, 2, 8)',
                border: 'none',
                color: 'white',
                marginTop: '30px',
                marginBottom: '30px',
                cursor: 'pointer'
            }
        }),
    );

    const classes = useStyles();

    function handleChange(e) {
        const name = e.target.name;
        const newVal = e.target.value;
        props.dispatch(updateChart({ [name]: newVal }));
    }

    function handleSubmit() {
        props.dispatch(createChartThunk(
            {
                "drug": props.drugName,
                "chartType": props.chartType,
                "weeks": Number(props.numWeeks),
                "predictBool": Boolean(props.predictBool),
                "source": props.dataSource,
                "weeksToTrainOn": Number(props.weeksToTrain)
            }
        ));
    }
    //type='submit on submit button for material ui form 
    return (
        <div style={styles.chartFormContainer}>
            <div style={styles.form}>
                <Selector
                    name='drugName'
                    label='Drug Name'
                    value={props.drugName}
                    handleChange={handleChange}
                    options={[['vascepa', 'Vascepa'], ['drug1', 'Drug1']]}
                />

                <Selector
                    name='chartType'
                    label='Chart Type'
                    value={props.chartType}
                    handleChange={handleChange}
                    options={[
                        ['graph_normalizedTRx', 'Normalized Total Prescriptions'],
                        ['graph_normalizedNRx', 'Normalized New Prescriptions'],
                        ['graph_normalizedRRx', 'Normalized Refill Prescriptions']
                    ]}
                />

                <Selector
                    name='numWeeks'
                    label='Number of Weeks'
                    value={props.numWeeks}
                    handleChange={handleChange}
                    options={[
                        ['52', ' 52 weeks'],
                        ['104', '104 weeks'],
                        ['156', '156 weeks'],
                        ['208', '208 weeks'],
                        ['260', '260 weeks']
                    ]}
                />

                <Selector
                    name='predictBool'
                    label='Show Prediction'
                    value={props.predictBool}
                    handleChange={handleChange}
                    options={[
                        ['true', 'Yes'],
                        ['false', 'No']
                    ]}
                />

                <Selector
                    name='weeksToTrain'
                    label='Weeks to Train Prediction'
                    value={props.weeksToTrain}
                    handleChange={handleChange}
                    options={[
                        ['52', ' 52 weeks'],
                        ['104', '104 weeks'],
                        ['156', '156 weeks'],
                        ['208', '208 weeks']
                    ]}
                />

                <Selector
                    name='dataSource'
                    label='Data Source'
                    value={props.dataSource}
                    handleChange={handleChange}
                    options={[
                        ['updated', 'Updated'],
                        ['raw', 'Raw']
                    ]}
                />

                <Button
                    className={classes.button}
                    onClick={handleSubmit}
                    variant="contained">
                    Generate Chart
                    </Button>

            </div >
        </div >
    );
};

const mapStateToProps = state => {
    return {
        drugName: state.chart.drugName,
        chartType: state.chart.chartType,
        numWeeks: state.chart.numWeeks,
        predictBool: state.chart.predictBool,
        weeksToTrain: state.chart.weeksToTrain,
        dataSource: state.chart.dataSource,
        showImage: state.chart.showImage,
        imageData: state.chart.imageData
    }
}

const ChartForm = connect(mapStateToProps)(ChartFormComponent);

export default ChartForm;