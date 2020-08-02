import { createStore } from 'redux'
import charts from './reducers';

const store = createStore(charts)

export default store