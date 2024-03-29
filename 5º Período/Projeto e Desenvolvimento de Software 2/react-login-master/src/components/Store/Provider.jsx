import React, { Children } from 'react';
import Context from './Context';
import useStorage from 'utils/useStorage';

const StoreProvider = () => {
    const [token, setToken] = useStorage('token');
    return(
        <Context.Provider
            value={{
                token,
                setToken,
            }}
        >
            {Children}
        </Context.Provider>
    )
}

export default StoreProvider;