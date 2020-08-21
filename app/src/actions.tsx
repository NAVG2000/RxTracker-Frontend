/*
 * action types
 */
export const UPDATE_CHART = 'UPDATE_CHART'

/*
 * action creators
 */
export function updateChart(payload) {
    return { type: UPDATE_CHART, payload }
}

export function createChartThunk(data) {
    return async dispatch => {
        const url = 'http://api.rxpredictify.com/interactive';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const imageData = await response.text();
        return dispatch(updateChart({ showImage: "true", imageData }));
    }
}