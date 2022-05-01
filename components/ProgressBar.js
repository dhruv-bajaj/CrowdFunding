import React from 'react'
import { Progress } from 'semantic-ui-react'

const ProgressBar = (props) =>
{
    return(
        <div>
            <Progress value ={props.currAmt} total = {props.totalAmt} progress = 'percent'/>
        </div>
        );
} 


export default ProgressBar;