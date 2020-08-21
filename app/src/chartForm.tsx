import React from 'react';
import { connect } from 'react-redux'
import InnerHTML from 'dangerously-set-html-content'

import Selector from './formSelectorComponent';
import { updateChart, createChartThunk } from './actions';

const styles = {
    chartFormContainer: {
        width: '40%',
        display: 'inline-block',
        backgroundColor: 'rgb(199, 199, 199)',
        alignItems: 'center'
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
            <form onSubmit={handleSubmit} id='chartForm'>
                <Selector name='drugName' label='Drug Name' value={props.drugName}
                    handleChange={handleChange} options=
                    {[['vascepa', 'Vascepa'], ['drug1', 'Drug1']]} />

                <Selector name='chartType' label='Chart Type' value={props.chartType}
                    handleChange={handleChange} options={[
                        ['graph_normalizedTRx', 'Normalized Total Prescriptions'],
                        ['graph_normalizedNRx', 'Normalized New Prescriptions'],
                        ['graph_normalizedRRx', 'Normalized Refill Prescriptions']]} />

                <Selector name='numWeeks' label='Number of Weeks' value={props.numWeeks}
                    handleChange={handleChange} options={[
                        ['52', ' 52 weeks'],
                        ['104', '104 weeks'],
                        ['156', '156 weeks']]} />

                <Selector name='predictBool' label='Show Prediction' value={props.predictBool}
                    handleChange={handleChange} options={[
                        ['true', 'Yes'],
                        ['false', 'No']]} />

                <Selector name='weeksToTrain' label='Weeks to Train Prediction'
                    value={props.weeksToTrain} handleChange={handleChange} options={[
                        ['156', '156 weeks'],
                        ['208', '208 weeks']]} />

                <Selector name='dataSource' label='Data Source' value={props.dataSource}
                    handleChange={handleChange} options={[
                        ['updated', 'Updated'],
                        ['raw', 'Raw']]} />

                <input style={styles.button} type="submit" value="Predict" />

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