import React from 'react';
import { Card,Image } from 'semantic-ui-react';
import ProgressBar from './ProgressBar.js';
import { Link } from '../routes';
const DisplayCard  = (props) =>{
    const mystyle={
        header: {
            fontWeight:'bold',
            fontSize:'18px',
            color:'#243D25',
            padding:'3px',
            overflowWrap:'break-word',
        },
        meta: {
            padding:'3px',
            overflowWrap:'break-word',
        },
        description:{
            padding:'3px',
            overflowWrap:'break-word',
        },
        img:{
           
        }
    }
    return(
       
            <Card key = {props.address}>
                    <Image style = {mystyle.image} src={props.summary[8]} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header style={mystyle.header}>
                            {props.summary[6]}
                        </Card.Header>
                        <Card.Description style={mystyle.description}>
                        <p>
                            {props.summary[7]}
                            {props.summary[1]}
                            {props.summary[9]}
                        </p>
                        <ProgressBar currAmt = {props.summary[1]} totalAmt = {props.summary[9]}/>
                        <Link route={`/campaigns/${props.address}`}>
                            <a>View campaign</a>
                        </Link>
                        </Card.Description>
                    </Card.Content>
                </Card>
    );
}
export default DisplayCard;