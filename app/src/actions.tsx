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
