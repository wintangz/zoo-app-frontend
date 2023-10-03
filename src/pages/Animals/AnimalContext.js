import React, { createContext, useState } from 'react'
import animals from './AnimalsData';
// Initiate Context
const AnimalContext = createContext();
// Provide Context
export const AnimalProvider = ({ children }) => {
    const [name, setName] = useState(animals);
    return (
        <AnimalContext.Provider value={{ name, setName }}>
            {children}
        </AnimalContext.Provider>
    )
}

export default AnimalContext;