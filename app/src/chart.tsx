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
        backgroundColor: 'rgb(240,248,255)',
        border: "2px solid rgb(15,15,69)",
        borderRadius: "10px",
    },
    placeholder: {
        width: "100%",
        paddingBottom: '56.25%'
    },
    label: {
        fontSize: '40px',
        fontFamily: 'Montserrat',
        color: 'rgb(128,128,128)',
        textAlign: 'center' as const
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
                : <div>
                    <label style={styles.label}>Your Chart will Appear Here When Generated</label>
                    <div style={styles.placeholder}></div>
                </div>
            }
        </div>
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

const Chart = connect(mapStateToProps)(ChartComponent);

export default Chart;