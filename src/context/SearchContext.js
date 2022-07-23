import { createContext, useReducer } from "react";

const INITIAL = {
    city:undefined,
    dates:[],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined,
    },

};


export const SearchContext = createContext(INITIAL);

const searchReducer = (state,action) => {
    switch(action.type){
        case "NEW_SEARCH":
            return action.payload;
        case "RESET":
            return INITIAL;
        default:
            return state;
        
    }
};

export const SearchContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(searchReducer, INITIAL);

    return(
        <SearchContext.Provider 
            value={{ 
                city:state.city, 
                dates:state.dates, 
                options:state.options, 
                dispatch,
            }}>
                {children}
        </SearchContext.Provider>
    )
}