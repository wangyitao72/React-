import { createSlice } from '@reduxjs/toolkit';
import http from '../../utils/http';
import { message } from 'antd';


let userSlice = createSlice({
    name: 'user',
    initialState: {
        token: ''
    },
    reducers: {
        updateToken: (state, action) => {
            state.token = action.payload
        }
    }
})

const login = (payload) => {
    return (dispatch) => {
        return http.get('/user/login', payload).then((res) => {
            if (res.data.errcode === 0) {
                message.success('登陆成功！');
                dispatch({
                    type: 'user/updateToken',
                    payload: res.data.token
                })
                return res.data.token
            } else {
                message.error('登陆失败！');
                return false
            }
        })
    }
}

const register = (payload) => {
    return (dispatch) => {
        return http.post('/user/adduser', payload).then((res) => {
            if (res.data.errcode === 0) {
                message.success('注册成功！');
                return true
            } else {
                message.error('该用户名已被占用');
                return false
            }
        })
    }
}

const updatePassword = (payload) => {
    return (dispatch) => {
        return http.post('/user/updatepswd', payload).then((res) => {
            if (res.data.errcode === 0) {
                message.success('修改成功！')
            }else{
                message.error('修改失败！')
            }
        })
    }
}

export {
    userSlice,
    login,
    register,
    updatePassword
}
