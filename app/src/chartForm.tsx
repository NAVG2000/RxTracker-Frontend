import React from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Selector from './formSelectorComponent';
import { updateChart, createChartThunk } from './actions';
import { useEffect } from 'react';

const styles = {
    chartFormContainer: {
        marginLeft: '3%',
        marginRight: '2%',
        marginBottom: '3%',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: '95%',
        maxWidth: '500px',
        backgroundColor: 'rgb(240,248,255)',
        border: "2px solid rgb(15,15,69)",
        borderRadius: "10px",
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    label: {
        fontSize: '30px',
        fontFamily: 'Montserrat',
        marginBottom: '3%',
        marginTop: '3%',
        textAlign: 'center' as const
    }
}

const ChartFormComponent = props => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            button: {
                width: '35%',
                backgroundColor: 'rgb(15,15,69)',
                border: 'none',
                color: 'white',
                marginTop: '30px',
                marginBottom: '30px',
                fontFamily: 'Montserrat'
            }
        }),
    );

    const classes = useStyles();

    function handleChange(e) {
        const name = e.target.name;
        const newVal = e.target.value;
        props.dispatch(updateChart({ [name]: newVal }));
    }

    function parseChartType() {
        var chartType = props.chartType.slice();

        if (props.scaleType == 'log') {
            return chartType + 'Log';
        } else {
            if (props.movingAverage != '0') {
                return chartType.replace('normalized', props.movingAverage);
            }
            else {
                return chartType
            }
        }
    }

    function handleSubmit() {
        const chartType = parseChartType();

        props.dispatch(createChartThunk(
            {
                "drug": props.drugName,
                "weeks": Number(props.numWeeks),
                "chartType": chartType,
                "predictBool": props.predictBool == 'true',
                "source": 'updated',
                "weeksToPredict": Number(props.weeksToPredict),
                "weeksToTrainOn": Number(props.weeksToTrain),
                "figWidth": Number(props.chartWidth),
                "figHeight": Number(props.chartHeight)
            }
        ));
    }

    /* implement auto refresh here:
    useEffect(() => {
        handleSubmit();
    }, [])
    */

    return (
        <div style={styles.chartFormContainer}>
            <div style={styles.form}>
                <label style={styles.label}>Customize Your Chart</label>
                <Selector
                    name='drugName'
                    label='Drug Name'
                    value={props.drugName}
                    handleChange={handleChange}
                    options={[['vascepa', 'Vascepa']]}
                />

                <Selector
                    name='numWeeks'
                    label='Number of Weeks to Display'
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
                    name='chartType'
                    label='Prescription Type'
                    value={props.chartType}
                    handleChange={handleChange}
                    options={[
                        ['graph_normalizedTRx', 'Total Prescriptions'],
                        ['graph_normalizedNRx', 'New Prescriptions'],
                        ['graph_normalizedRRx', 'Refill Prescriptions']
                    ]}
                />

                <Selector
                    name='scaleType'
                    label='Scale Type'
                    value={props.scaleType}
                    handleChange={handleChange}
                    options={[
                        ['linear', 'Linear Scale'],
                        ['log', 'Logarithmic Scale'],
                    ]}
                />

                {props.scaleType == 'linear'
                    ? <Selector
                        name='movingAverage'
                        label='Moving Average'
                        value={props.movingAverage}
                        handleChange={handleChange}
                        options={[
                            ['0', 'No Moving Average'],
                            ['fourWeekMA', 'Four Week Moving Average'],
                            ['eightWeekMA', 'Eight Week Moving Average'],
                            ['thirteenWeekMA', 'Thirteen Week Moving Average'],
                        ]}
                    />
                    : null
                }

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
                    name='weeksToPredict'
                    label='Number of Weeks to Predict '
                    value={props.weeksToPredict}
                    handleChange={handleChange}
                    options={[
                        ['26', '26 weeks'],
                        ['52', '52 weeks'],
                        ['78', '78 weeks'],
                        ['104', '104 weeks']
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
        numWeeks: state.chart.numWeeks,
        chartType: state.chart.chartType,
        scaleType: state.chart.scaleType,
        movingAverage: state.chart.movingAverage,
        predictBool: state.chart.predictBool,
        weeksToPredict: state.chart.weeksToPredict,
        weeksToTrain: state.chart.weeksToTrain,
        showImage: state.chart.showImage,
        imageData: state.chart.imageData,
        chartWidth: state.chart.chartWidth,
        chartHeight: state.chart.chartHeight
    }
}

const ChartForm = connect(mapStateToProps)(ChartFormComponent);

export default ChartForm;