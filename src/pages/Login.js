import  { useContext, useState } from 'react';
import "./login.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBed } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


 const Login = () => {
    const [ credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
    })
    const { loading, error, dispatch} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev =>({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axios.post("/auth/login", credentials)
            dispatch({type:"LOGIN_SUCCESS", payload:res.data})
            navigate("/")
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data}) 
        }

    }


    
    
    return(
        <div className='login'>
            <div className='lcontainer'>
                <input type="text" className='lInput' id='username' placeholder="Username" onChange={handleChange} />
                <input type="Password" className='lInput' id='password' placeholder="Password" onChange={handleChange} />
                <button disabled={loading} onClick={handleLogin} className='lbutton'>Login</button>
                
                {error &&
                    <h3 className='errmessage'>{error.messgae}</h3>
                }
            </div>
        </div>
    )
 }

 export default Login