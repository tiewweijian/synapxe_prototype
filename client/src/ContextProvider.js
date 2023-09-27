
import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [newAppt, setNewAppt] = useState(false)
    const [orderMedication, setOrderMedication] = useState(false)
    const [editAppointment, setEditAppointment] = useState(false)
    const [callEmergency, setCallEmergency] = useState(false)
    const [loginState, setLoginState] = useState(false)
    const [userNRIC, setUserNRIC] = useState("")
    const [appointment, setAppointment] = useState({})


    return (
        <StateContext.Provider value={{
          newAppt, setNewAppt, 
          orderMedication, setOrderMedication, 
          editAppointment, setEditAppointment, 
          callEmergency, setCallEmergency, 
          loginState, setLoginState,
          userNRIC, setUserNRIC, 
          appointment, setAppointment
        }}>
        { children }
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);