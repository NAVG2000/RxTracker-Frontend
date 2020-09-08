import React from 'react';
import { connect } from 'react-redux'
import InnerHTML from 'dangerously-set-html-content'

const styles = {
    chartContainer: {
        marginTop: '30px',
        marginLeft: '30px',
        marginRight: '30px',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        width: '12.2in',
        height: '6.2in',
        backgroundColor: 'rgb(211, 238, 255)',
        border: "2px solid rgb(157, 2, 8)",
        borderRadius: "8px",
    }
}

const ChartComponent = props => {
    return (
        <div style={styles.chartContainer}>
            {props.showImage == "true"
                ? <InnerHTML html={props.imageData} />
                : null
            }
        </div>
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

const Chart = connect(mapStateToProps)(ChartComponent);

export default Chart;