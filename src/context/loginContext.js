import createContext from "./createContext";
import {useState} from "react";

const initialState = {};

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


const User = (dispatch) => {
    return async (user) => {
    }
}

export const {Context, Provider} = createContext(
    reducer,
    {User},
    initialState
);