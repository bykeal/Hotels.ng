import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../hooks/useFetch';
import { SearchContext } from '../context/SearchContext';
import "./reserve.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


 const Reserve = ({ setopen, hoteliid }) => {
    const navigate = useNavigate();
    const [Roomselect, SetRoomselect] = useState([])
    const { data, loading, error, reFetch} = useFetch(`hotels/room/${hoteliid}`)
    const { dates } = useContext(SearchContext)

    const getDateRange = (startDate,endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())

        let list = []

        while(date <= end){
            list.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
            // console.log('date increment',date)
        }

        return list
    }

    const allDates = getDateRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (Room) => {
        
        const isFound = Room.unavailableDates.some((date)=>{
            allDates.includes(new Date(date).getTime())
        })
        return !isFound
    }


    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        SetRoomselect(
            checked ? [...Roomselect, value] : Roomselect.filter(item => item != value)
        )
    }

    const handleClick = async () => {
        
        try{
            await Promise.all(
                Roomselect.map((roomId) => {
                    let url = `http://localhost:8800/api/rooms/availability/${roomId}`
                    console.log(url)
                    const res = axios.put(url, {
                        dates: allDates,
                    });
                    return res.data;
                })
            )
            setopen(false)
            navigate("/")
        }catch(err){ 
            console.log(err)
        }
    }
    console.log(Roomselect);
    return(
        <div className='reserve'>
            <div className='rcontainer'>
                <FontAwesomeIcon icon={faCircleXmark} 
                    className="rclose" 
                    onClick={() => setopen(false)}
                />
                 <span>Select your rooms:</span>

                {loading ? (<p className='loading'>Loading...</p>) : (
                    <>
                        {data?.map(item => {
                            return(
                                <div className='ritem'>
                                    <div className='riteminfo'>
                                        <div className='rTitle'>{item.title}</div>
                                        <div className='rDesc'>{item.desc}</div>
                                        <div className='rMax'>Max people: <b>{item.maxPeople}</b></div>
                                        <div className='rPrice'>Price: {item.price}</div>
                                    </div>
                                    
                                    <div className='selectCon'>
                                        {item.roomNumbers.map(room => {
                                            return(
                                                <div className='rooms'>
                                                    <label>{room.number}</label>
                                                    <input type="checkbox" value={room._id} onChange={handleSelect} disabled={!isAvailable(room)}/>
                                                </div> 
                                            )
                                        })}
                                    </div>

                                    
                                    
                                </div>
                            )
                        })}
                    </>
                )}

                <button onClick={handleClick} className='rbutton'>Reserve Now!</button>

            </div>
        </div>
    )
 }

 export default Reserve