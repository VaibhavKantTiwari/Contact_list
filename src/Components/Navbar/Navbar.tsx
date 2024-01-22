import { NavLink, Outlet } from "react-router-dom";
import styles from "./navbar.module.css"

function Navbar(){
    //to send navbar component
    return(
        <>
        <div className={styles.navbar}>
            <NavLink to={"/"} className={styles.btn} style={({isActive})=>(isActive?{backgroundColor:"skyblue", color:"darkgreen"}:undefined)}>Contacts</NavLink>
            
            <NavLink to={"/addContacts"} className={styles.btn} style={({isActive})=>(isActive?{backgroundColor:"skyblue", color:"darkgreen"}:undefined)}>CreateContact</NavLink>
        </div>
        <Outlet/>
        </>

    )

}
export default Navbar;