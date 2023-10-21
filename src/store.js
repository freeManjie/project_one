import React, { createContext, useState } from "react";
const AppContext = createContext();
const { Provider } = AppContext;

export function AppProvider(props) {
    const [dataStore, setDataStore] = useState({ role: null });
    return (
        <Provider value={{ dataStore, setDataStore }}>{props.children}</Provider>
    );
}

export default AppContext;