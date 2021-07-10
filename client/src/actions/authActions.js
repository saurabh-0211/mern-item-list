import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    USER_LOADING,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    USER_LOADED
} from '../actions/types';


// Check token and load user 
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios.get('api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })

} 

// Register User
export const register = ({name, email, password}) => dispatch => {
    
    //Headers
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    //request body
    const body = JSON.stringify({name, email, password});

    axios.post('/api/user', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
            type: REGISTER_FAIL
            })
        })
}

// Login User
export const login = ( {email, password} ) => dispatch => {

    //Headers
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    //request body
    const body = JSON.stringify({ email, password});

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAILED'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}


// Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//setup config/headers and token

export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers 
    const config = {
        headers: {
            "content-type": "application/json"
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}