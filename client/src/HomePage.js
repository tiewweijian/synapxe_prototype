import './App.css';
import Topbar from './Components/Topbar';
import { FcCalendar, FcDataConfiguration, FcInfo, FcOnlineSupport, FcShipped } from "react-icons/fc";
import React, { useEffect, useState } from 'react';
import './index.css'
import NewAppointmentPopup from './Components/NewAppointmentPopup';
import OrderMedicationPopup from './Components/OrderMedicationPopup'
import { useStateContext } from './ContextProvider';
import EmergencyPopup from './Components/EmergencyPopup';
import EditAppointmentPopup from './Components/EditAppointmentPopup';
import Primary from './resources/Primary@2x.png'
import axios from "axios";

function HomePage() {
  const { loginState, userNRIC } = useStateContext(); 

  return (
    <div>
      {loginState ? <MainPage/> : <LoginPage/>}
    </div>
  );
}

function MainPage() {
  const { userNRIC, newAppt, setNewAppt, orderMedication, setOrderMedication, editAppointment, setEditAppointment, callEmergency, setCallEmergency, appointment, setAppointment } = useStateContext(); 

  useEffect(() => {
    axios.get("http://localhost:3001/api/getappointments?nric=" + userNRIC).then(res => setAppointment(res.data)).catch(err => console.log(err))
  }, [userNRIC]) 


  return (
    <div>
    {newAppt ? <NewAppointmentPopup/> : <div></div>}
    { orderMedication ? <OrderMedicationPopup/> : <div></div>}
    { callEmergency ? <EmergencyPopup/> : <div></div>}
    { editAppointment ? <EditAppointmentPopup/> : <div></div>}

    <Topbar/>


    <div class="flex justify-center pt-10">


      {appointment.size === 0 ? 
        <div class="flex px-10 w-fit text-center shadow-md rounded-lg dark:bg-gray-300">
        <FcInfo class="h-full"/>
          <span class="px-2 font-semibold">
          You have no new appointments
          </span> 
        </div> : 
        <div>
          <div class="flex-row space-y-2">
          {Object.values(appointment).map(item => {
            return (
              <span class="flex px-10 w-fit h-full text-center shadow-md rounded-lg dark:bg-gray-300 font-semibold">
              <FcInfo class="h-full"/>
              {`${new Date(item.date).toLocaleDateString()}, ${item.time}, ${item.location}, ${item.reason}`}
              </span> 
            )
          })}
        </div>  
        </div>
      }
    </div>
    <div class="pt-10">
      <div class="flex justify-center">
        <div class="flex-row px-10 w-fit text-center">
        <button class="flex bg-[#D33F49] rounded-lg content-center justify-center items-center justify-items-center px-10 py-10" onClick={() => setNewAppt(true)}>
          <FcCalendar size={100}/>
        </button>
        <span class="font-bold">
          New Appointment
        </span>
        </div>
      </div>
      <div class="flex justify-center pt-10">
        <div class="flex-row px-10 w-fit text-center">
        <button class="flex bg-[#77BA99] rounded-lg content-center justify-center items-center justify-items-center px-10 py-10" onClick={() => setOrderMedication(true)}>
          <FcShipped size={100}/>
        </button>
        <span class="font-bold">
          Order & Collect
        </span>
        </div>
        <div class="flex-row px-10 w-fit text-center">
        <button class="flex bg-[#D7C0D0] rounded-lg content-center justify-center items-center justify-items-center px-10 py-10" onClick={() => setCallEmergency(true)}>
          <FcOnlineSupport size={100}/>
        </button>
        <span class="font-bold">
          Live Support
        </span>
        </div>
      </div>
    </div>
  </div>
  )
}

function LoginPage() {
  const { setLoginState, userNRIC, setUserNRIC } = useStateContext(); 

  async function storeUser() {

    const object = {
      nric: userNRIC, 
      name: "Wei Jian"
    }

    if (userNRIC !== " ") {
      axios.post("http://localhost:3001/api/storeuser", object).then((res) => {
        console.log(res)
        setLoginState(true)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  return (
    <div>
      <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <span class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Last Mile Healthcare Delivery    
          </span>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <form class="space-y-4 md:space-y-6" action="#">
                      <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your NRIC</label>
                          <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="S1234567A" onChange={(e) => setUserNRIC(e.target.value)} required/>
                      </div>
                      <img src={Primary} width={"100%"}/> 
                      <button class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={storeUser}>Sign in</button>
                  </form>
              </div>
          </div>
      </div>
    </section>
    </div>
  )
}

export default HomePage;
