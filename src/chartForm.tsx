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
        alert(this.state.drugName + this.state.chartType)
        e.preventDefault();
    }

    render() {
        return (
            <div id='chartFormContainer'>
                <form onSubmit={this.handleSubmit} id='chartForm'>
                    <Selector name='drugName' label='Drug Name' value={this.state.drugName}
                        handleChange={this.handleChange} options=
                        {[['vascepa', 'Vascepa'], ['drug1', 'Drug1']]} />

                    <label htmlFor='chartType'>Chart Type</label>
                    <select name='chartType' value={this.state.chartType} onChange={this.handleChange}>
                        <option value="graph_normalizedTRx">Normalized Total Prescriptions</option>
                        <option value="graph_normalizedNRx">Normalized New Prescriptions</option>
                        <option value="graph_normalizedRRx">Normalized Refill Prescriptions</option>
                    </select>

                    <label htmlFor='numWeeks'>Number of Weeks</label>
                    <select name='numWeeks' value={this.state.numWeeks} onChange={this.handleChange}>
                        <option value="52">52</option>
                        <option value="104">104</option>
                        <option value="156">156</option>
                    </select>

                    <label htmlFor='predictBool'>Show Prediction</label>
                    <select name='predictBool' value={this.state.predictBool} onChange={this.handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    <label htmlFor='weeksToTrain'>Weeks to Train Prediction</label>
                    <select name='weeksToTrain' value={this.state.weeksToTrain} onChange={this.handleChange}>
                        <option value="156">156</option>
                        <option value="208">208</option>
                    </select>

                    <label htmlFor='dataSource'>Data Source</label>
                    <select name='dataSource' value={this.state.dataSource} onChange={this.handleChange}>
                        <option value="updated">Updated</option>
                        <option value="raw">Raw</option>
                    </select>
                    <input type="submit" value="Predict" />
                </form>
            </div >
        )
    }
}

export default ChartForm;
