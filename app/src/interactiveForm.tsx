import * as React from 'react';
import * as ReactDOM from 'react-dom';
import renderHTML from 'react-render-html';
import ReactHtmlParser from 'react-html-parser';
var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;

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
    showImage: string;
    imageData: string;
    rendered: string;
}

class InteractiveForm extends React.Component<CFProps, CFState> {
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
            dataSource: 'updated',
            showImage: "false",
            imageData: "",
            rendered: "false"
        };
    }

    postData(url = 'http://api.rxpredictify.com/interactive', data = {
        "drug": this.state.drugName,
        "chartType": this.state.chartType,
        "weeks": Number(this.state.numWeeks),
        "predictBool": Boolean(this.state.predictBool),
        "source": this.state.dataSource,
        "weeksToTrainOn": Number(this.state.weeksToTrain)
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
        this.setState({ [name]: newVal } as Pick<CFState, keyof CFState>);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.postData()()
            .then((data) => {
                console.log(typeof data);
                console.log(data);
                var htmlInput = data;
                var htmlToReactParser = new HtmlToReactParser();
                var reactElement = htmlToReactParser.parse(htmlInput);
                var reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement);
                console.log(typeof reactHtml);
                console.log(reactHtml);
                this.setState({ showImage: "true", imageData: reactHtml })
            });
    }
    //WHEN INJECTING THE CODE, UPDATE PROPS OR STATE WITH A VARIABLE LIKE "ISINJECTED" TO TRIGGER
    // A RERENDER. OR TRY AN IFRAME
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
                {this.state.showImage == "true"
                    ? <div> {this.state.imageData} </div>
                    : null
                }
            </div >
        )
    }
}

export default InteractiveForm;