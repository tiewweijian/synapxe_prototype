import Popup from 'reactjs-popup';
import { useStateContext } from '../ContextProvider';
import { AiOutlineClose } from "react-icons/ai";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";


function NewAppointmentPopup(){
    const styles = {
      button: "sticky top-8 text-primary rounded-xl p-3 hover:bg-hoverbg z-50 "
    }

    const {setNewAppt, userNRIC} = useStateContext()

    const handleAppointmentClose = () => {
        setNewAppt(false)
    }



    return (
    <Popup open={true} onClose={handleAppointmentClose}>
      <button
            onClick={handleAppointmentClose}
            type="button"
            className={styles.button}>
            <AiOutlineClose/>
      </button>
      <div class="sticky top-0 pt-8 pb-2 bg-white flex md:flex-grow flex-row justify-center space-x-1 z-40">
        <h1 class="text-2xl font-bold text-slate-900 px-2">
          Set New Appointment
        </h1>
      </div>

      <div class="flex justify-center">
        <AppointmentForm/>
      </div>
    </Popup>
    )
}

function AppointmentForm() {
  const {userNRIC, setNewAppt} = useStateContext()
  const [startDate, setStartDate] = useState(new Date())
  const timeslots = [" ", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM"]
  const reasonOptions = [" ", "Doctor Consultation", "Regular Checkup", "Others"]
  const locationOptions = [" ", "Ang Mo Kio Polyclinic", "Khoo Teck Puat Hospital", "Yishun Community Hospital", "Yishun Polyclinic"]
  const [location, setLocation] = useState("")
  const [reason, setReason] = useState("")
  const [time, setTime] = useState("")

  const submitAppointment = () => {

    const obj = {
      nric: userNRIC, 
      location: location, 
      reason: reason, 
      time: time,
      date: startDate
    }

    axios.post("http://localhost:3001/api/newappointment", obj).then(
      setNewAppt(false)
    ).catch(err => {
      console.log(err)
    })
  }

  const styles = {
    label: 'block text-sm select-none my-2 mr-2 min-w-fit',
    align: 'my-2 mx-4 flex flex-col',
    numberfield: 'px-2 py-1 rounded-xl bg-gray-200 focus:bg-focusbg outline-none w-12 my-2',
    percentagefield: 'px-2 py-1 rounded-xl focus:border-secondary border-gray-300 border-2 outline-none bg-transparent w-12 my-2',
    field:
      'text-gray-700 focus:border-b-2 bg-transparent focus:outline-none focus:border-b-secondary border-b-2 hover:border-gray-600 border-gray-300 appearance-none',
    button:
      'text-sm hover:bg-primary px-4 py-2 mb-2 mt-4 hover:text-white rounded-2xl border-primary border-2',
    errorMsg: 'text-red-500 text-sm',
    divider: "mt-3 mx-2 my-2 bg-gray-600 h-px",
  }

  return (

  <form class="pt-4">
    <div>
      <label class="px-3">Name</label>
      <input type="text" className={styles.field}/>
    </div>
    <div class="pt-3">
      <label class="px-3">NRIC</label>
      <input type="text" className={styles.field} value={userNRIC}/>
    </div>
    <div class="pt-3">
      <label class="px-3">Date</label>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className={styles.field}/>
    </div>

    <div class="pt-3">
      <label class="px-3">Timeslot</label>
      <select onChange={(obj) => setTime(obj.target.value)}>
        {timeslots.map(time => {
          return <option value={time}>{time}</option>
        })}
      </select>
    </div>


    <div class="pt-3">
      <label class="px-3">Service</label>
      <select onChange={(obj) => setReason(obj.target.value)}>
        {reasonOptions.map(reason => {
          return <option value={reason}>{reason}</option>
        })}
      </select>
    </div>

    <div class="pt-3">
      <label class="px-3">Location</label>
      <select onChange={ (obj) => {setLocation(obj.target.value)}}>
        {locationOptions.map(location => {
          return <option value={location}>{location}</option>
        })}
      </select>
    </div>

    <div class="flex pt-10 justify-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={submitAppointment}>
          Submit
      </button>
    </div>
  </form>

      
  )

}


export default NewAppointmentPopup;