import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const
        [isAppReloading, setIsAppReloading] = useState(false);

    const reloadApp = () => {
        setIsAppReloading(true);
    };

    const value = {
        isAppReloading,
        reloadApp,
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export {
    GlobalProvider, useGlobalContext
};