import React,{useState,useEffect} from 'react';
import { Card,Button,Grid,Image } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import DisplayCard from '../components/DisplayCard.js';

const App = (props)=>{

    const [arr,setArr] = useState(props.tempList);

    return (
        <Layout>
        <div style={{color:'#78938A', marginLeft:'10px'}}>
            <h3>Open Campaigns</h3>
        </div>
        <Grid stackable columns={2}>
            <Grid.Row>
                <Grid.Column width={13}>
                        <Card.Group id = "here" style={{backgroundColor:"#F1DDBF", padding:'10px 10px', margin:'10px 10px 0px 0px'}} fluid='true'>

                            {
                                props.campaigns.map((item,index)=>{
                                return (<DisplayCard address = {item} key ={item}/>);
                            }
                        </Card.Group>
                </Grid.Column>
                <Grid.Column width={3}>
                <Link route="/campaigns/new">
                    <a>
                        <Button style={{marginTop:'10px'}}
                            floated='right'
                            content='Create Campaign' 
                            icon='add circle' 
                            primary={true}
                        />
                    </a>
                </Link>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </Layout>
    );
}
App.getInitialProps = async ()=>{

       const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {campaigns};

}
export default App;