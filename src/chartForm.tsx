import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Selector from './formSelectorComponent';

interface CFProps {

}

interface CFState {
    drugName: string;
    chartType: string;
    numWeeks: string;
    predictBool: string;
    weeksToTrain: string;
    dataSource: string;
}

class ChartForm extends React.Component<CFProps, CFState> {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            drugName: 'vascepa',
            chartType: 'graph_normalizedNRx',
            numWeeks: '52',
            predictBool: 'true',
            weeksToTrain: '156',
            dataSource: 'updated'
        };
    }

    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const name = e.target.name;
        const newVal = e.target.value;
        this.setState({ [name]: newVal } as Pick<CFState, keyof CFState>);

    }

    handleSubmit(e) {
        e.preventDefault();
        postData('http://ec2-3-208-23-163.compute-1.amazonaws.com/prediction')
            .then((data) => {
                console.log(data);
            });
    }

    render() {
        return (
            <div id='chartFormContainer'>
                <form onSubmit={this.handleSubmit} id='chartForm'>
                    <Selector name='drugName' label='Drug Name' value={this.state.drugName}
                        handleChange={this.handleChange} options=
                        {[['vascepa', 'Vascepa'], ['drug1', 'Drug1']]} />

                    <Selector name='chartType' label='Chart Type' value={this.state.chartType}
                        handleChange={this.handleChange} options={[
                            ['graph_normalizedTRx', 'Normalized Total Prescriptions'],
                            ['graph_normalizedNRx', 'Normalized New Prescriptions'],
                            ['graph_normalizedRRx', 'Normalized Refill Prescriptions']]} />

                    <Selector name='numWeeks' label='Number of Weeks' value={this.state.numWeeks}
                        handleChange={this.handleChange} options={[
                            ['52', ' 52 weeks'],
                            ['104', '104 weeks'],
                            ['156', '156 weeks']]} />

                    <Selector name='predictBool' label='Show Prediction' value={this.state.predictBool}
                        handleChange={this.handleChange} options={[
                            ['true', 'Yes'],
                            ['false', 'No']]} />

                    <Selector name='weeksToTrain' label='Weeks to Train Prediction'
                        value={this.state.weeksToTrain} handleChange={this.handleChange} options={[
                            ['156', '156 weeks'],
                            ['208', '208 weeks']]} />

                    <Selector name='dataSource' label='Data Source' value={this.state.dataSource}
                        handleChange={this.handleChange} options={[
                            ['updated', 'Updated'],
                            ['raw', 'Raw']]} />

                    <input type="submit" value="Predict" />

                </form>
            </div >
        )
    }
}

export default ChartForm;
// http://ec2-107-23-136-34.compute-1.amazonaws.com
// Example POST method implementation:
async function postData(url = 'http://ec2-3-208-23-163.compute-1.amazonaws.com/prediction', data = {
    "drug": "vascepa",
    "target": "Normalized_TRx",
    "weeks": 156,
    "predictBool": true,
    "source": "updated",
    "weeksToTrainOn": 156,
    "weeksToPredict": 52
}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
