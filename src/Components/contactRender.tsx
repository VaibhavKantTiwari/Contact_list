import {useEffect} from "react"
import axios from "axios";
import { useDispatch} from "react-redux";
import {fetchContactStart, fetchContactFailure, fetchContactSuccess} from "../redux/contactReducer";

//render data from api and save it indo initial state of the reducer
const ContactRender = () =>{
    const dispatch = useDispatch();
    useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchContactStart());
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const contactlist = response.data;
        dispatch(fetchContactSuccess(contactlist));


      } catch (error:any) {
        console.error('Error fetching data:', error);
        dispatch(fetchContactFailure(error.message))
      }
    };

    fetchData();
  }, [dispatch]); 
  return null;
}
export default ContactRender;