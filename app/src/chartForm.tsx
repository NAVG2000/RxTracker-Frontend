import * as React from 'react';
import { connect } from 'react-redux'
import InnerHTML from 'dangerously-set-html-content'

import Selector from './formSelectorComponent';
import { updateChart } from './actions';

interface CFProps {
    drugName: string;
    chartType: string;
    numWeeks: string;
    predictBool: string;
    weeksToTrain: string;
    dataSource: string;
    showImage: string;
    imageData: string;
    dispatch: Function;
}

interface CFState {
}

class ChartFormComponent extends React.Component<CFProps, CFState> {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    postData(url = 'http://api.rxpredictify.com/interactive', data = {
        "drug": this.props.drugName,
        "chartType": this.props.chartType,
        "weeks": Number(this.props.numWeeks),
        "predictBool": Boolean(this.props.predictBool),
        "source": this.props.dataSource,
        "weeksToTrainOn": Number(this.props.weeksToTrain)
    }) {
        return async () => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return response.text();
        }
    }

    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const name = e.target.name;
        const newVal = e.target.value;
        this.props.dispatch(updateChart({ [name]: newVal }));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.postData()()
            .then((data) => {
                this.props.dispatch(updateChart({ showImage: "true", imageData: data }));
            });
    }

    createMarkup() {
        return { __html: this.props.imageData };
    }

    render() {
        return (
            <div id='chartFormContainer'>
                <form onSubmit={this.handleSubmit} id='chartForm'>
                    <Selector name='drugName' label='Drug Name' value={this.props.drugName}
                        handleChange={this.handleChange} options=
                        {[['vascepa', 'Vascepa'], ['drug1', 'Drug1']]} />

                    <Selector name='chartType' label='Chart Type' value={this.props.chartType}
                        handleChange={this.handleChange} options={[
                            ['graph_normalizedTRx', 'Normalized Total Prescriptions'],
                            ['graph_normalizedNRx', 'Normalized New Prescriptions'],
                            ['graph_normalizedRRx', 'Normalized Refill Prescriptions']]} />

                    <Selector name='numWeeks' label='Number of Weeks' value={this.props.numWeeks}
                        handleChange={this.handleChange} options={[
                            ['52', ' 52 weeks'],
                            ['104', '104 weeks'],
                            ['156', '156 weeks']]} />

                    <Selector name='predictBool' label='Show Prediction' value={this.props.predictBool}
                        handleChange={this.handleChange} options={[
                            ['true', 'Yes'],
                            ['false', 'No']]} />

                    <Selector name='weeksToTrain' label='Weeks to Train Prediction'
                        value={this.props.weeksToTrain} handleChange={this.handleChange} options={[
                            ['156', '156 weeks'],
                            ['208', '208 weeks']]} />

                    <Selector name='dataSource' label='Data Source' value={this.props.dataSource}
                        handleChange={this.handleChange} options={[
                            ['updated', 'Updated'],
                            ['raw', 'Raw']]} />

                    <input type="submit" value="Predict" />

                </form>
                {this.props.showImage == "true"
                    ? <InnerHTML html={this.props.imageData} />
                    : null
                }
            </div >
        )
    }
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