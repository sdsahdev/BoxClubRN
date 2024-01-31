import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useEffect, useState } from 'react'

export const AppContext = createContext()

const AppProvider = ({ children }) => {

    const [EditBox, setEditBox] = useState({})
    const [TimeData, setTimedata] = useState({ Mopen: '', Mclose: '', Mprice: '', SMprice: '', Aopen: '', Aclose: '', Aprice: '', SAprice: '', Eopen: '', Eclose: '', Eprice: '', SEprice: '', TounamentPrice: '', STounamentPrice: '' })
    const [TimeDataSeco, setTimeDataLocal] = useState({ Mopen: '', Mclose: '', Mprice: '', SMprice: '', Aopen: '', Aclose: '', Aprice: '', SAprice: '', Eopen: '', Eclose: '', Eprice: '', SEprice: '', TounamentPrice: '', STounamentPrice: '' })
    const [ReBoxFirst, setReBoxFirst] = useState({ BoxName: '', Address: '', Lenght: '', Width: '', Height: '', OpenTime: '', CloseTime: '', selectedImages: [] })


    useEffect(() => {
        loadDataFromStorage()
    }, [])

    const loadDataFromStorage = async () => {
        try {
            const storedData = await AsyncStorage.getItem('TimeData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setTimedata(parsedData);
            }
        } catch (error) {
            console.error('Error loading data from AsyncStorage:', error);
        }
    };

    const setTimeData = (fieldName, newValue) => {
        const updatedTimeData = { ...TimeData };
        updatedTimeData[fieldName] = newValue;
        setTimedata(updatedTimeData);
        saveDataToStorage(updatedTimeData);
    };

    const saveDataToStorage = async (data) => {
        try {
            await AsyncStorage.setItem('TimeData', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving data to AsyncStorage:', error);
        }
    };


    //without asyce store data
    const setTimeDataSeco = (fieldName, newValue) => {
        const updatedTimeData = { ...TimeDataSeco };
        updatedTimeData[fieldName] = newValue;
        setTimeDataLocal(updatedTimeData);
    };

    const handleReboxFirest = (fieldName, newValue) => {
        const updatedTimeData = { ...ReBoxFirst };
        updatedTimeData[fieldName] = newValue;
        setReBoxFirst(updatedTimeData);
    };

    return (
        <AppContext.Provider value={{ EditBox, setEditBox, TimeData, setTimeData, setTimeDataSeco, TimeDataSeco, handleReboxFirest, ReBoxFirst }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
