import createContext from "./createContext";
import api from '../services/api';

const initialState = {};

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const teste = (dispatch) => {
    return (args) => {
        console.log(args);
    };
};

const createUser = (dispatch) => {
    return async (nome, email, senha) => {

    }
}

export const {Context, Provider} = createContext(
    reducer,
    {teste, createUser},
    initialState
);