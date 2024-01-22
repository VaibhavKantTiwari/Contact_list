import { useEffect, useState } from "react";
import styles from "./addContact.module.css";
import { useDispatch, useSelector } from "react-redux";
import { add, contactSelector, replace } from "../../redux/contactReducer";
import {useNavigate, useParams } from "react-router-dom";


interface contact{
    name: string;
    email: string;
    phone: string;
    website: string;
}

//adding contact
const AddContacts = ()=>{
  const contacts = useSelector(contactSelector);
    const {index} = useParams();
    const data = contacts.find((_contact:any, idx:any)=>idx == index);
    const navigate = useNavigate();
    const[contact, setContact] = useState({
        name:'',
        email:'',
        phone:'',
        website:'',
    });
    useEffect(() => {
      if (data) {
        setContact(prevContact => ({
          ...prevContact,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          website: data.website || '',
        }));
      }
    }, [data]);
    const dispatch = useDispatch();

    const updateORadd = (key:keyof contact, newValue:string)=>{
        setContact((prevData)=>({
            ...prevData,
            [key]:newValue,
        }));
    };
    const handlegoBack = () =>{
      navigate(-1);
    }
    //editing contact
    const handleEdit =async()=>{     
        try {
          dispatch(replace({index, contact}));
          await fetch(`https://jsonplaceholder.typicode.com/posts/${Number(index)+1}`, {
            method: 'PUT',
            body: JSON.stringify({
              name:contact.name,
              phone:contact.phone,
              email:contact.email,
              website:contact.website
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
          .then((response) => response.json())
          .then((json) => console.log(json));
        } catch (error) {
          console.error('Error:', error);
        }
        setContact({
          name: '',
          email: '',
          phone: '',
          website: '',
        });  

    }
//submit addition of contact
    const handleSubmit = async () => {      
        try {
          dispatch(add(contact));
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({

              name:contact.name,
              phone:contact.phone,
              email:contact.email,
              website:contact.website
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const json = await response.json();
          setContact({
            name: '',
            email: '',
            phone: '',
            website: '',
          });
          
          console.log('Response:', json);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      //check condition whether open edit or add new one
    const filter = (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      if(data){
        handleEdit();
      }
      else{
        handleSubmit()
      }
    }

    return(
    <>
    <div className={styles.contactContainer}>
      <div className={styles.smallContainer}>
          <form onSubmit={filter} className={styles.form}>
              <div className={styles.objElement}>
                  <div className={styles.elemName}>Name</div>
                  <input type="text" placeholder="contact Name" value={contact.name} required onChange={(e) =>updateORadd('name', e.target.value)}/>                
              </div>
              <div className={styles.objElement}>
                  <div className={styles.elemName}>Email</div>
                  <input type="text" placeholder="@gmail.com" value={contact.email}   onChange={(e) =>updateORadd('email', e.target.value)}/>                
              </div>
              <div className={styles.objElement}>
                  <div className={styles.elemName}>Phone</div>
                  <input type="text" placeholder="+914567789876" value={contact.phone} required  onChange={(e) =>updateORadd('phone', e.target.value)}/>                
              </div>
              <div className={styles.objElement}>
                  <div className={styles.elemName}>Website</div>
                  <input type="text" placeholder="searchMe.com" value={contact.website}  onChange={(e) =>updateORadd('website', e.target.value)}/>                
              </div>
              <div className={styles.btn_box}>
                  <button type="submit" style={{backgroundColor:'darkgreen'}}>Submit</button>
                  <button onClick={handlegoBack}  style={{backgroundColor:'skyblue'}}>Back</button>
              </div>


          </form>
      </div>
        
         
    </div>
    </>)
}
export default AddContacts;