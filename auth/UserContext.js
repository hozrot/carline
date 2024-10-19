import React, { useState, createContext } from "react";
const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState('')
    const [token, setToken] = useState('')
    const [Instruction, setInstruction] = useState()
    const [SelectedImage, setSelectedImage] = useState([])
    const [SelectedOrderImage, setSelectedOrderImage] = useState([])
    const [InstructionName, setInstructionName] = useState('')
    const [backgroundImageId, setBackgroundImageId] = useState('');
    const [backgroundImageURL, setBackgroundImageURL] = useState('');
    const [floorImageId, setFloorImageId] = useState('');
    const [floorImageURL, setFloorImageURL] = useState('');

    const updateBackgroundImage = (imageId, imageURL) => {
        setBackgroundImageId(imageId);
        setBackgroundImageURL(imageURL);
    };

    const updateFloorImage = (imageId, imageURL) => {
        setFloorImageId(imageId);
        setFloorImageURL(imageURL);
    };

    const contextValue = {
        backgroundImageId,
        backgroundImageURL,
        floorImageId,
        floorImageURL,
        updateBackgroundImage,
        updateFloorImage,
    };


    return (
        <UserContext.Provider value={{
            InstructionName, setInstructionName,
            SelectedOrderImage, setSelectedOrderImage,
            SelectedImage, setSelectedImage,
            Instruction, setInstruction,
            userData, setUserData,
            token, setToken,

            contextValue
        }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;