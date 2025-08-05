import React from 'react';
import '../CartStyles/CheckoutPath.css'
import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material';

function CheckoutPath({activePath}) {
    const path=[
        {
            label:'Shipping Details',
            icon:<LocalShipping/>
        },
        {
            label:'Confirm Order',
            icon:<LibraryAddCheck/>
        },
        {
            label:'Payment',
            icon:<AccountBalance/>
        }
    ]
  return (
    <div className="checkoutPath">
       {path.map((item,index)=>(
        <div className="checkoutPath-step" key={index}
        active={activePath===index?'true':'false'}
        completed={activePath>=index?'true':'false'}
        >
            <p className="checkoutPath-icon">{item.icon}</p>
            <p className="checkoutPath-label">{item.label}</p>
        </div>
       )) }
    </div>
  )
}

export default CheckoutPath
