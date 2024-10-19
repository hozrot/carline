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
    const [logoImageId, setLogoImageId] = useState('');
    const [logoImageURL, setLogoImageURL] = useState('');

    const updateBackgroundImage = (imageId, imageURL) => {
        setBackgroundImageId(imageId);
        setBackgroundImageURL(imageURL);
    };

    const updateFloorImage = (imageId, imageURL) => {
        setFloorImageId(imageId);
        setFloorImageURL(imageURL);
    };

    const updateLogoImage = (imageId, imageURL) => {
        setLogoImageId(imageId);
        setLogoImageURL(imageURL);
    }

    /**
     * The following context is used to update the context
     * and is used on the following screens for reading and
     * updating the instructions
     * 1. BackgroundList.js
     * 2. FloorList.js
     * 3. LogoList.js
     */
    const contextValue = {
        backgroundImageId,
        backgroundImageURL,
        floorImageId,
        floorImageURL,
        logoImageId,
        logoImageURL,

        updateBackgroundImage,
        updateFloorImage,
        updateLogoImage,
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