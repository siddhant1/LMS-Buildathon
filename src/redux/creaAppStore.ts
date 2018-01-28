import { createStore, combineReducers } from 'redux';
import { Map as iMap } from 'immutable';
import * as Reducers from './reducers';

// TODO: remove this.
function initialStateToMap(initialState: any) {
    Object.keys(initialState).forEach(key => initialState[key] = iMap(initialState[key]));
    return initialState;
}

const createAppStore = (initialState: any = {}): any => {
    return createStore(combineReducers({
        ...Reducers,
    }), initialStateToMap(initialState));
}

export default createAppStore;