import React from 'react';
import { connect } from 'react-redux'
import InnerHTML from 'dangerously-set-html-content'

import Selector from './formSelectorComponent';
import { updateChart, createChartThunk } from './actions';

const styles = {
    chartFormContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        width: '80%',
        backgroundColor: 'rgb(255, 204, 153)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        width: '100%'
    },
    selector: {
        width: '100%',
        fontSize: '30px',
        padding: '15px 10px',
        margin: '0 auto',
        display: 'inline-block',
        border: '1px solid rgb(177, 67, 67)',
        borderRadius: '4px',
        boxSizing: 'border-box'
    },
    button: {
        backgroundColor: 'rgb(85, 57, 57)',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        textDecoration: 'none',
        margin: '0 auto',
        cursor: 'pointer'
    }
}

const ChartFormComponent = props => {
    function handleChange(e) {
        const name = e.target.name;
        const newVal = e.target.value;
        props.dispatch(updateChart({ [name]: newVal }));
    }

    function handleSubmit(e) {
        e.preventDefault();
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

    return (
        <div style={styles.chartFormContainer}>
            <form style={styles.form} onSubmit={handleSubmit} >
                <Selector
                    label='Drug Name'
                    style={styles.selector}
                    value={props.drugName}
                    handleChange={handleChange}
                    options={[['vascepa', 'Vascepa'], ['drug1', 'Drug1']]}
                />

                <Selector
                    label='Chart Type'
                    style={styles.selector}
                    value={props.chartType}
                    handleChange={handleChange}
                    options={[
                        ['graph_normalizedTRx', 'Normalized Total Prescriptions'],
                        ['graph_normalizedNRx', 'Normalized New Prescriptions'],
                        ['graph_normalizedRRx', 'Normalized Refill Prescriptions']
                    ]}
                />

                <Selector
                    label='Number of Weeks'
                    style={styles.selector}
                    value={props.numWeeks}
                    handleChange={handleChange}
                    options={[
                        ['52', ' 52 weeks'],
                        ['104', '104 weeks'],
                        ['156', '156 weeks']
                    ]}
                />

                <Selector
                    label='Show Prediction'
                    style={styles.selector}
                    value={props.predictBool}
                    handleChange={handleChange}
                    options={[
                        ['true', 'Yes'],
                        ['false', 'No']
                    ]}
                />

                <Selector
                    label='Weeks to Train Prediction'
                    style={styles.selector}
                    value={props.weeksToTrain}
                    handleChange={handleChange}
                    options={[
                        ['156', '156 weeks'],
                        ['208', '208 weeks']
                    ]}
                />

                <Selector
                    label='Data Source'
                    style={styles.selector}
                    value={props.dataSource}
                    handleChange={handleChange}
                    options={[
                        ['updated', 'Updated'],
                        ['raw', 'Raw']
                    ]}
                />

                <input
                    style={styles.button}
                    type="submit"
                    value="Predict"
                />

            </form>

            {props.showImage == "true"
                ? <InnerHTML html={props.imageData} />
                : null
            }
        </div >
    );
}

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