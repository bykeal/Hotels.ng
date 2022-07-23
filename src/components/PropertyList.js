import react from 'react';
import "./propertylist.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../hooks/useFetch';
import Loading from '../skeletons/Loading';


 const PropertyList = () => {

    const { data, loading, error} = useFetch("hotels/countByType");
    const images = [
        "https://q-xx.bstatic.com/xdata/images/hotel/840x460/229254035.jpg?k=428bfff3bd5b79f42c728ae697fe8d29a1fc93fe80c2f26b7f11da8997dd3a3b&o=",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvZG5tuRS_YLtgRzFlnHUSZfCZtV81fyff8w&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbDjcCkLn65kns3_5NLa30ioRty9E5MfyZBw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAg5JIBo73fhtgfbZ8FHKnt2MRqGcHZ0wBkA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrBlxNsWINEuclB5O4PEF5Ms_-EmIBB8NQqw&usqp=CAU"
    ]
    console.log(data);

    return(
        <div className='pList'>
            {loading ? (<Loading/>) : ( 
            <>
                { data && 
                    images.map((img, i)=>{
                    return(
                        <div className='pListItem' key={i}>
                            <img src={img} />
                            <div className='pListTitles'>
                                <h1>{data[i]?.type}</h1>
                                <h2>{data[i]?.count} {data[i]?.type}</h2>
                            </div>
                        </div>
                    )
                })
                }
            </>)}
        </div>
    )
 }

 export default PropertyList