import Popup from 'reactjs-popup';
import { useStateContext } from '../ContextProvider';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

function OrderMedicationPopup(){

    const {setOrderMedication} = useStateContext()

    const styles = {
      button: "sticky top-8 text-primary rounded-xl p-3 hover:bg-hoverbg z-50 "
    }


    return (
      <Popup open={true} onClose={() => setOrderMedication(false)}>
      <button
            onClick={() => setOrderMedication(false)}
            type="button"
            className={styles.button}>
            <AiOutlineClose/>
      </button>
      <div class="sticky top-0 pt-8 pb-2 bg-white flex md:flex-grow flex-row justify-center space-x-1 z-40">
        <h1 class="text-2xl font-bold text-slate-900 px-2">
          Order Medication
        </h1>
      </div>

      <div class="flex justify-center">
        <MedicationForm/>
      </div>
    </Popup>
    )
}


function MedicationForm() {
  const {userNRIC, setNewAppt, setOrderMedication} = useStateContext()
  const reasonOptions = [" ", "Panadol"]
  const locationOptions = [" ", "Home Delivery", "Ang Mo Kio Polyclinic"]
  const [medication, setMedication] = useState("")
  const [location, setLocation] = useState("")
  const submitAppointment = () => {

      const obj = {
        nric: userNRIC, 
        dropoff: location, 
        medication: medication, 
      }
  
      axios.post("http://localhost:3001/api/addorder", obj).then(
        setOrderMedication(false)
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
    <div class="pt-3">
      <label class="px-3">NRIC</label>
      <input type="text" className={styles.field} value={userNRIC}/>
    </div>
    <div class="pt-3">
      <label class="px-3">Medication</label>
      <select onChange={(obj) => setMedication(obj.target.value)}>
        {reasonOptions.map(reason => {
          return <option value={reason}>{reason}</option>
        })}
      </select>
    </div>

    <div class="pt-3">
      <label class="px-3">Dropoff</label>
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


export default OrderMedicationPopup;