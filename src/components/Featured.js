import react from 'react';
import "./featured.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../hooks/useFetch';
import Loading from '../skeletons/Loading';


 const Featured = () => {

    const { data, loading, error} = useFetch("hotels/countByCity?cities=Awka,Onitsha,Ekwulobia");
   
    return(
        <div className='featured'>
            {loading ? (<Loading/>) : ( 
                <>
                    <div className='featuredItem'>
                        <img src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/229254035.jpg?k=428bfff3bd5b79f42c728ae697fe8d29a1fc93fe80c2f26b7f11da8997dd3a3b&o="></img>
                        <div className='featuredTitles'>
                            <h1>Awka</h1>
                            <h2>{data[0]} properties</h2>
                        </div>
                    </div>

                    <div className='featuredItem'>
                        <img  src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/229254035.jpg?k=428bfff3bd5b79f42c728ae697fe8d29a1fc93fe80c2f26b7f11da8997dd3a3b&o="></img>
                        <div className='featuredTitles'>
                            <h1>Onitsha</h1>
                            <h2>{data[1]} properties</h2>
                        </div>
                    </div>

                    <div className='featuredItem'>
                        <img  src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/229254035.jpg?k=428bfff3bd5b79f42c728ae697fe8d29a1fc93fe80c2f26b7f11da8997dd3a3b&o="></img>
                        <div className='featuredTitles'>
                            <h1>Ekwulobia</h1>
                            <h2>{data[2]} properties</h2>
                        </div>
                    </div>
                </>
            )}
        
        </div>
    )
 }

 export default Featured