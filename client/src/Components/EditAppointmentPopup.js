import Popup from 'reactjs-popup';
import { useStateContext } from '../ContextProvider';


function EditAppointmentPopup(){

    const {setEditAppointment} = useStateContext()

    const handleEditAppointmentClose = () => {
        setEditAppointment(false)
    }


    return (
    <Popup open={true} onClose={handleEditAppointmentClose}>
      <div></div>
    </Popup>
    )
}

export default EditAppointmentPopup;