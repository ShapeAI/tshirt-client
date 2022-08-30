import jwt from 'jsonwebtoken'
import axios from 'axios'
import { toast } from 'react-hot-toast'



export const addCategory = (name, description) => async (dispatch) => {

    try {
        const base_Url = 'http://localhost:8080'

        const res = await axios.post(`${base_Url}/api/v1/category/add`, {
            name, description
        },{
            headers: axios.defaults.headers.common
        })
        dispatch({
            type: "SET_LOADING",
            payload: true
        })
        console.log(res.data)
        const { success, message } = res.data
        console.log(success)
        if (success) {
            toast.success(message)
            dispatch({
                type: "ADD_CATEGORY",
            })
        } else {
            toast.error(message)
            dispatch({
                type: "ADD_CATEGORY_FAILED",
            })
        }
    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
    }finally{
        dispatch({
            type: "SET_LOADING",
            payload: false
        })
    }
};
