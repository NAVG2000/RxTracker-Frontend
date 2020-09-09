import React, { useLayoutEffect, useRef } from 'react';
import { connect } from 'react-redux'
import InnerHTML from 'dangerously-set-html-content'

import { updateChart } from './actions';


const styles = {
    chartContainer: {
        marginLeft: '2%',
        marginRight: '3%',
        marginBottom: '5%',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: '95%',
        maxWidth: '1050px',
        backgroundColor: 'rgb(211, 238, 255)',
        border: "2px solid rgb(157, 2, 8)",
        borderRadius: "8px",
    }
}

const ChartComponent = props => {
    const ref = useRef(null);

    useLayoutEffect(() => {
        const chartWidth = ((ref.current.clientWidth / 100) * .98).toFixed(2);
        const chartHeight = ((ref.current.clientHeight / 100) * .98).toFixed(2);
        props.dispatch(updateChart({ chartWidth, chartHeight }));
    })

    return (
        <div style={styles.chartContainer} ref={ref}>
            {props.showImage == "true"
                ? <InnerHTML html={props.imageData} />
                : <div style={{ width: "100%", paddingBottom: '56.25%' }}></div>
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
        imageData: state.chart.imageData,
        chartWidth: state.chart.chartWidth,
        chartHeight: state.chart.chartHeight
    }
}

const Chart = connect(mapStateToProps)(ChartComponent);

export default Chart;