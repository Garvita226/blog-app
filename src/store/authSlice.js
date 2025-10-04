import { createSlice } from "@reduxjs/toolkit";

const authlice = createSlice({
    name: 'auth',
    initialState: {
        status: false,
        userData: null
    },
    reducers:  {
        login: (state, action) => {
            state.status = true,
            state.userData = action.payload.userData
        },

        logout: (state, action) => {
            state.status = false,
            state.userData = null
        }
    }
})


export const { login, logout } = authlice.actions

export default authlice.reducer