import * as actionTypes from '../actionTypes';
import {request} from '../../helpers/request';

export default function editTask(id,task){
    return (dispatch)=>{ 
        dispatch({type: actionTypes.EDIT_TASK_REQUEST});
        request.put(`/tasks/${id}`, task)
        .then(response => {
            if(response.error){
                throw response.error;
            }
            dispatch({ type: actionTypes.EDIT_TASK_SUCCESS, task: response }) 
        })
        .catch(error=>{
            dispatch({type: actionTypes.EDIT_TASK_FAILURE, error: error.toString()});
        });
    }

}
