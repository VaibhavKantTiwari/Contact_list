import { useDispatch, useSelector } from "react-redux";
import { deleteContact, contactSelector } from "../../redux/contactReducer";
import {NavLink, Outlet} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faUser, faLink, faEnvelope } from '@fortawesome/free-solid-svg-icons'
function Home(){
    const contacts = useSelector(contactSelector);
    const dispatch = useDispatch();
    //handling the delete button
    const handleDelete = async(index:any)=>{
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${Number(index)+1}`, {
                method: 'DELETE',
            });
            dispatch(deleteContact(index))
            const json = await response.json();
            console.log('Response:', json);
            
            
        }catch (error) {
            console.error('Error:', error);
        }
    
    }
    return(
        <>
            <div className={styles.box}>
                <div className={styles.smallContainer}>
                    <ul className={styles.container}>
                        {contacts.map((contact: any, key: number) => (
                        <li key={key} className={styles.contact}>
                            <div className={styles.contact_details}>
                                <div > <FontAwesomeIcon icon={faUser} style={{color:"blue", marginRight:"5px"}}/>{contact.name}</div>
                                <div><FontAwesomeIcon icon={faPhone} style={{color:"blue", marginRight:"5px"}}/>{contact.phone}</div>
                                <div><FontAwesomeIcon icon={faEnvelope} style={{color:"blue", marginRight:"5px"}}/>{contact.email}</div>
                                <div><FontAwesomeIcon icon={faLink} style={{color:"blue", marginRight:"5px"}}/><a href={"https://www."+contact.website} target="_blank">{contact.website}</a></div>                           
                            </div>
                            <div className={styles.detailChanger}>
                            <button type="button"  style={{backgroundColor:"skyblue"}} className={styles.btn} onClick={() => handleDelete(key)}>delete</button>
                            <NavLink to={{ pathname: `/editContacts/${key}` }}><button className={styles.btn} style={{backgroundColor:"darkgreen"}}>edit</button></NavLink>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>

            <Outlet />
            </div>
        </>
        
    )

}
export default Home;
