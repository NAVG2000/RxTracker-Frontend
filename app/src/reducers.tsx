import { combineReducers } from 'redux'
import {
    UPDATE_CHART
} from './actions'

export const initialState = {
    drugName: 'vascepa',
    chartType: 'graph_normalizedNRx',
    numWeeks: '52',
    predictBool: 'true',
    weeksToTrain: '156',
    dataSource: 'updated',
    showImage: "false",
    imageData: ""
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