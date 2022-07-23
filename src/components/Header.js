import react,  { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDay, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import "./Header.css";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns'; 
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';


const Header = ({type}) => {
    const navigate = useNavigate();
    const [destinations, setDestinations] = useState("");
    const [openDate, setOpendate] = useState(false);
    const [openOptions, setopenOptions] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const[options, setOptions] =useState({
        adult:1,
        children:1,
        room:1,
    })

    const { user } = useContext(AuthContext) 
    const handleOption = (name, op) =>{
        setOptions((prev) => {
            return{
                ...prev,
                [name]:op === 'i'? options[name] + 1 : options[name] - 1,
            }
        })
    }
    
    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: {  destinations,options,dates }})
        navigate("/hotels", {state: { destinations,dates,options }}); 
    }
   return(
       <div className='header'>
            <div className={type === "List" ? "headerContainer listMode" : "headerContainer"}>
                <div className='headerList'>
                    <div className='headerListItem active'>
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className='headerListItem'>
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className='headerListItem'>
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className='headerListItem'>
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className='headerListItem'>
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Taxi</span>
                    </div>
                </div>

                { type !== "List" &&
                <>
                <h1 className='headerTitle'>
                    A lifetime of discounts? It's Genius.
                </h1>

                <p className='headerDesc'>
                   Get rewarded for your travels - unlock instant savings of 10% or more
                   with a free Hotel.ng account.
                </p>

                {!user && <button className='headerBtn'>Sign in / Register</button>}

                <div className='headerSearch'>
                    <div className='headerSearchitem'>
                        <FontAwesomeIcon icon={faBed} className="headersearchicon"/>
                        <input 
                            type="text"
                            placeholder='where are you going'
                            className='headerSearchinput'
                            onChange={e=>{setDestinations(e.target.value)}}
                        />
                    </div>
                    <div className='headerSearchitem'>
                        <FontAwesomeIcon icon={faCalendarDay} className="headersearchicon"/>
                        <span onClick={()=>setOpendate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                        {openDate && <DateRange editableDateInputs={true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            className="date"
                        />}
                    </div>
                    <div className='headerSearchitem'>
                        <FontAwesomeIcon icon={faPerson} className="headersearchicon"/>
                        <span 
                            onClick={()=>setopenOptions(!openOptions)}
                            className='headerSearchText'>{`${options.adult} Adults - ${options.children} children - ${options.room} room`}</span>
                        {openOptions && <div className='options'>
                            <div className='optionitem'>
                                <span className='optiontext'>Adult</span>
                                <div className='optioncounter'>
                                    <button 
                                        disabled={options.adult<= 1}
                                        onClick={()=>handleOption('adult','d')}
                                        className='optionbutton'>-</button>
                                    <span className='counter'>{options.adult}</span>
                                    <button 
                                        onClick={()=>handleOption('adult','i')}
                                        className='optionbutton'>+</button>
                                </div>
                            </div>

                            <div className='optionitem'>
                                <span className='optiontext'>Children</span>
                                <div className='optioncounter'>
                                    <button 
                                        disabled={options.children <= 0}   
                                        onClick={()=>handleOption('children','d')}
                                        className='optionbutton'>-</button>
                                    <span className='counter'>{options.children}</span>
                                    <button 
                                        onClick={()=>handleOption('children','i')}
                                        className='optionbutton'>+</button>
                                </div>
                            </div>

                            <div className='optionitem'>
                                <span className='optiontext'>Room</span>
                                <div className='optioncounter'>
                                    <button 
                                        disabled={options.room<= 1}
                                        onClick={()=>handleOption('room','d')}
                                        className='optionbutton'>-</button>
                                    <span className='counter'>{options.room}</span>
                                    <button 
                                        onClick={()=>handleOption('room','i')}
                                        className='optionbutton'>+</button>
                                </div>
                            </div>

                        </div>}
                    </div>
                    <div className='headerSearchitem'>
                        <button className='headerBtn' onClick={handleSearch}>Search</button>
                    </div>
                </div>
                </>
                }
            </div>
       </div>
   )
}

export default Header