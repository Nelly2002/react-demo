import * as actionTypes from '../actionTypes';
import {request} from '../../helpers/request';

export default function addTasks(data){
    return (dispatch)=>{
        dispatch({type: actionTypes.GET_TASKS_REQUEST});
        request.post(`/tasks`,data)
        .then(res => {
            dispatch({type: actionTypes.GET_TASKS_SUCCESS, data: res});
        })
        .catch(error=>{
            dispatch({type: actionTypes.GET_TASKS_FAILURE, error: error.toString()});
        });
    }

}