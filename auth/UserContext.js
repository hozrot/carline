import React, { useState, createContext } from "react";
const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState('')
    const [token, setToken] = useState('')
    const [Instruction, setInstruction] = useState()
    const [SelectedImage, setSelectedImage] = useState([])
    const [SelectedOrderImage, setSelectedOrderImage] = useState([])
    const [InstructionName, setInstructionName] = useState('')


    return (
        <UserContext.Provider value={{ InstructionName, setInstructionName, SelectedOrderImage, setSelectedOrderImage, SelectedImage, setSelectedImage, Instruction, setInstruction, userData, setUserData, token, setToken }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;