import react from 'react';
import "./serachitem.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBed } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


 const Searchitem = ({item}) => {
    return(
        <div className='searchitem'>
            <img 
                src='https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8&w=1000&q=80'
                alt=''
                className='simg'
              />

            <div className='siDesc'>
                <h1 className='sititle'>{item.name}</h1>
                <span className="sidistance">{item.distance}</span>
                <span className="sitaxi">Free</span>
                <span className="sisubtitle">
                    Studio Apartment.
                </span>
                <span className="sifeatures">
                     {item.desc}
                </span>
                <span className="iscancelop">Free cancellation</span>
                <span className='iscancelopsubtyitle'>
                    you can cancel later.
                </span>
            </div>

            <div className='sidetails'>
                {item.rating && <div className='sirating'>
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div>}
                <div className='sidetailtexts'>
                    <span className='siprice'>${item.cheapestPrice}</span>
                    <span className='sitaxop'>Includes taxes and fees</span>
                    <Link to={`/hotel/${item._id}`}>
                        <button className='ischecked'>See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
 }

 export default Searchitem