import { createContext , useContext } from "react";

export const Context = createContext();

export function useMainContext(){//avoid redundant react+Context import
    return useContext(Context);
}