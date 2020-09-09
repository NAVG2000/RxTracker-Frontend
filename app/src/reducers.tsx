import { combineReducers } from 'redux'
import {
    UPDATE_CHART
} from './actions'

export const initialState = {
    drugName: 'vascepa',
    numWeeks: '156',
    chartType: 'graph_normalizedNRx',
    scaleType: 'linear',
    movingAverage: '0',
    predictBool: 'true',
    weeksToPredict: '52',
    weeksToTrain: '208',
    showImage: "false",
    imageData: "",
    chartWidth: 8,
    chartHeight: 4.5
}

function chartReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CHART:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    chart: chartReducer
})

export default rootReducer;