import react from 'react';
import "./featuredprops.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../hooks/useFetch';
import Loading from '../skeletons/Loading';

 const FeaturedProperties = () => {
    const { data, loading, error} = useFetch("hotels/?featured=true&limit=3");
    console.log("from featured",data[0]);
    const images = [
        "https://www.hospitalitynet.org/picture/xxl_153127471.jpg?t=1621519725",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAg5JIBo73fhtgfbZ8FHKnt2MRqGcHZ0wBkA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrBlxNsWINEuclB5O4PEF5Ms_-EmIBB8NQqw&usqp=CAU"
    ]
    return(
        <div className='fp'>
           
            {loading ? (<Loading/>) : ( 
            <>
                { data && 
                    data.map((data, i)=>{
                    return(
                        <div className='fpItem' key={i}>
                            <img src={images[i]}/>
                            <span className='fpName'>{data?.name}</span>
                            <span className='fpCity'>{data?.City}</span>
                            <span className='fpPrice'>Starting from {data?.cheapestPrice}</span>
                            <div className='fpRating'>
                                <button>{data?.rating}</button>
                                <span>Excellent</span>
                            </div>
                        </div>
                    )
                })
                }
            </>)}
            
        </div>
    )
 }

 export default FeaturedProperties