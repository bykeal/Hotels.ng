import react from 'react';
import "./maillist.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';


 const MailList = () => {
    return(
        <div className='mail'>
          <h1 className='mailtitle'>Save time, save money!</h1>
          <span className='mailDesc'>Sign up and we'll send the best deals to you</span>
          <div className='mailInputContainer'>
            <input type="text" placeholder='Your Email'/>
            <button>Subscribe</button>
          </div>
        </div>
    )
 }

 export default MailList