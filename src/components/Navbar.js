import react, { useContext } from 'react';
import "./navbar.css";
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
    const { user } = useContext(AuthContext)
   return(
       <div className='navbar'>
        <div className='navContainer'>
            <span className='logo'>Hotels.ng</span>
           {user ? user.username  : (<div className='navitems'>
                <button className='navbutton'>Register</button>
                <button className='navbutton'>Login</button>
            </div>)}
        </div>
       </div>
   )
}

export default Navbar