import { createContext, useContext, useReducer} from "react";

const UserContext = createContext();
const initialState = {
    user:  {name : "Abel Mekonen", profileImg : "http://127.0.0.1:9000/static/my-pic.jpeg"},
    token: null,
    isAuthenticated: true,
}

const reducer = (state, action)=>{
    switch(action.type){
        case "SET_USER":
            return {...state, user: action.payload};
        case "SET_TOKEN":
            return {...state, token: action.payload};
        case "LOGIN":
            return {...state, isAuthenticated: true};
        case "LOGOUT":
            return {...state, user:null};
        default:
            return state;
    }
}

export const UserProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}


export const useUser = ()=> useContext(UserContext);

