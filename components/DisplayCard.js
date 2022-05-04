import React,{useState,useEffect} from 'react';
import { Card,Image } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import ProgressBar from './ProgressBar.js';
import { Link } from '../routes';
const DisplayCard  = (props) =>{
    const [summary,setSummary] = useState([]);
    useEffect(async () =>{
        const tempCampaign = Campaign(props.address);
        const summaryTemp = await tempCampaign.methods.getSummary().call();
        setSummary(summaryTemp);
    },[]);
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
                    <Image style = {mystyle.image} src={summary["8"]} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header style={mystyle.header}>
                            {summary["6"]}
                        </Card.Header>
                        <Card.Description style={mystyle.description}>
                        <p>
                            <label>current balance (wei)</label>
                            <div>{summary["1"]}</div>
                            <label>target amount (wei)</label>
                            <div>{summary["9"]}</div>
                        </p>
                        <ProgressBar currAmt = {summary["1"]} totalAmt = {summary["9"]}/>

                        <Link route={`/campaigns/${props.address}`}>
                            <a>View campaign</a>
                        </Link>
                        </Card.Description>
                    </Card.Content>
                </Card>
    );
}
export default DisplayCard;