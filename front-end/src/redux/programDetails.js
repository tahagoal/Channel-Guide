import * as ActionTypes from './ActionTypes';

export const ProgramDetails = (state = {
    pending: true,
    err: null,
    programdetails: {}
    }, action) => {
    switch(action.type) {
        case ActionTypes.GET_PROGRAM_DETAILS:
            return {...state, pending: false, err: null, programdetails: action.payload};
            
        case ActionTypes.PROGRAM_DETAILS_LOADING:
            return {...state, pending:true, err:null, programdetails:{}}

        case ActionTypes.PROGRAM_DETAILS_FAILED:
            return {...state, pending:false, err:action.payload, programdetails:{}}

        default:
            return state;
    }
}