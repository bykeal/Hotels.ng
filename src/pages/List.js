import react, { useState } from 'react';
import "./list.css";
import { format } from 'date-fns'; 
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import Searchitem from '../components/Searchitem';
import useFetch from '../hooks/useFetch';
import Loading from '../skeletons/Loading';

const List = () => {
const location = useLocation(); 
const [show, setshow] = useState(false);
const [destination,SetDestination] = useState(location.state.destinations);
const [dates,setDates] = useState(location.state.dates);
const [options,setOptions] = useState(location.state.options);
const [min,setMin] = useState(undefined);
const [max,setMax] = useState(undefined);

const { data, loading, error, reFetch} = useFetch(
    `hotels/searchHotel/?city=${destination}&min=${min || 0 }&max=${max || 999999}`
);
console.log("from ",data);

const handleClick = () => {
    reFetch()
}

return(
       <div>
            <Navbar/>
            <Header type="List"/>
            <div className='listcontainer'>
                <div className='listwrapper'>
                {/* search sidebar */}
                    <div className='listsearch'>
                        <div className='lsItem'>
                            <label>Destination</label>
                            <input type="text" placeholder={destination}  onChange={e=>SetDestination(e.target.value)}/>
                        </div>
                        <div className='lsItem'>
                            <label>Check-in-Date:</label>
                            <span onClick={()=>{setshow(!show)}}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                            {show && <DateRange
                                onChange={(item)=> setDates([item.selection])}
                                minDate={new Date()}
                                range={dates}
                                className="dater"
                            />}
                        </div>
                        <div className='lsItem'>
                            <label>Options</label>
                            <div className='lsOptionitem'>
                                <div className='lsoption'>
                                    <span className="lsoptext">
                                        Min price <small>per night</small>
                                    </span>
                                    <input type="number" onChange={e=>setMin(e.target.value)} className='lsopinput'/>
                                </div>
                                <div className='lsoption'>
                                    <span className="lsoptext">
                                        Max price <small>per night</small>
                                    </span>
                                    <input type="number" onChange={e=>setMax(e.target.value)} className='lsopinput'/>
                                </div>
                                <div className='lsoption'>
                                    <span className="lsoptext">
                                        Adult
                                    </span>
                                    <input type="number" min={1} className='lsopinput' placeholder={options.adult}/>
                                </div>
                                <div className='lsoption'>
                                    <span className="lsoptext">
                                        Children 
                                    </span>
                                    <input type="number" min={0} className='lsopinput' placeholder={options.children}/>
                                </div>
                                <div className='lsoption'>
                                    <span className="lsoptext">
                                        Room
                                    </span>
                                    <input type="number" min={1} className='lsopinput' placeholder={options.room}/>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>

                    {/* search answer */}
                    <div className='listresult'>
                    
                        {loading ? (<Loading/>) : ( 
                        <>
                            {data && 
                                data.map(item=>{
                                    return(
                                        <Searchitem item={item} key={item._id}/>
                                    )
                            })}
                            
                        </>)}
                    </div>

                </div>
            </div>

       </div>
   )
}

export default List