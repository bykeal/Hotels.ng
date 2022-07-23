import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import "./Hotel.css";
import { faLocationDot, faCircleXmark, faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import MailList from '../components/MailList';
import Footer from '../components/Footer';
import useFetch from '../hooks/useFetch';
import Loading from '../skeletons/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';
import Reserve from '../components/Reserve';

const Hotel = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const[slidenumber, setSlideNumber] = useState(0);
    const[open, setOpen] = useState(false);
    const[opeModal, setOpeModal] = useState(false);

    const { data, loading, error} = useFetch(`hotels/single/${id}`);
    console.log("api from hotel ", data);
    const{ user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { dates, options } = useContext(SearchContext);
    console.log('from options', options);

    const photos = [
        {
            src:'https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/03/trump-hotel-chicago-illinois-usa.jpg'
        },
        {
            src:'https://media.istockphoto.com/photos/interior-of-a-modern-luxury-hotel-double-bed-bedroom-picture-id1163498940?k=20&m=1163498940&s=612x612&w=0&h=tUPidNW2ny095sCR97dur7cbrCnYpcjHbevUTJyB8Jc='
        },
        {
            src:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
        },
        {
            src:'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHw%3D&w=1000&q=80'
        },
    ];

    const MilliSecondsPerDay = 1000 * 60 * 60 * 24;
    
    const dayDifference = (date1,date2) =>{
        const timeoff = Math.abs(date2.getTime() - date1.getTime());
        const dayDifference = Math.ceil(timeoff / MilliSecondsPerDay);
        return dayDifference;
    }

    const days = dayDifference(dates[0].startDate, dates[0].endDate);

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    }

    const handleMove = (direction) => {
        let newslideindex;

        if(direction==='l'){
            newslideindex = slidenumber === 0 ? photos.length-1 : slidenumber-1;

        }else{
            newslideindex = slidenumber === photos.length-1 ? 0 : slidenumber+1;
        } 

        setSlideNumber(newslideindex);
    }

    const handleReserve = () => {
        if(user){
            setOpeModal(true)
        }else{
            navigate("/login")
        }
    }

   return(
       <div>
        <Navbar/>
        <Header type="List"/>

        {loading ? (<Loading/>) : ( 
        <>
            <div className='hotelContainer'>
                {open &&  <div className='slider'>
                    <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
                    <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove('l')}/>
                    <div className='slideWrapper'>
                        <img src={photos[slidenumber].src} alt="" className='sliderimg'/>
                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove('r')}/>
                </div>
                }
                <div className='hotelwrapper'>
                    <button className='booknow' onClick={handleReserve}>Reserve or Book Now!</button>
                    <h1 className='hoteltitle'>{data?.name}</h1>
                    <div className='hotelAdd'>
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <span>{data?.address}</span>
                    </div>
                    <span className='hotelDistance'>
                        {data?.distance}
                    </span>
                    <span className='hotelpricehighlight'>
                        Hotel Highlight. Describes why the hotel is at ${data?.cheapestPrice}.
                    </span>

                    <div className='hotelimages'>
                        {photos.map((photo, i) => {
                            return(<div className='hotelimagewrapper'>
                                <img onClick={() => handleOpen(i)} src={photo.src} alt="" className='hotelimg'/>
                            </div>)
                        })}
                    </div>

                    <div className='hoteldetails'>
                        <div className='hoteldetailstexts'>
                            <h1 className='hoteltitle'>{data?.name}</h1>
                            <p className='hotelDesc'>
                                {data?.desc}
                            </p>
                        </div>
                        <div className='hoteldetailsprice'>
                            <h1>Perfect for a {days}-night stay</h1>
                            <span>
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            </span>
                            <h2>
                                {days <= 0 && 
                                    <>
                                        <b>${ data?.cheapestPrice * 0.8 * options.room }</b><span> ( {days} nights . {options.room} rooms ) </span>
                                    </>
                                }

                                {days > 0 && 
                                    <>
                                        <b>
                                            ${ data?.cheapestPrice * days * options.room }
                                        </b><span>({days} nights . {options.room} rooms )</span> 
                                    </>
                                }
                                
                            </h2>
                            <button onClick={handleReserve}>Reserve or Book Now</button>
                        </div>
                    </div>

                </div>

                <MailList/>
                <Footer/>
            </div>
        </>)}

        {opeModal && <Reserve setopen={setOpeModal} hoteliid={id}/>}
        
       </div>
   )
}

export default Hotel