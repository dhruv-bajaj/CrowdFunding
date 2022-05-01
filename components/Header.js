import React from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from '../routes';
import Image from 'next/image';

export default ()=>{
    return (
        <Menu style={{marginTop:'10px',height:'80px', backgroundColor:'#525E75'}}>
            <Link route="/">
                <a className='item'> <Image src = "/CrowdFunding-logos.jpeg" height="70px" width="70px" style={{borderRadius:'50%'}}/>
                <span style={{color:"#F1DDBF",fontSize:'20px', margin:'5px 5px'}}>CrowdFunding</span> </a>
            </Link>
            <Menu.Menu position="right">
                <Link route="/">
                    <a className='item' style={{color:"#F1DDBF",fontSize:'20px'}}>Campaigns</a>
                </Link>
                <Link route="/campaigns/new">
                    <a className='item' style={{color:"#F1DDBF",fontSize:'20px'}}>+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    )
}