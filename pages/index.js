import React,{useState,useEffect} from 'react';
import { Card,Button,Grid,Image } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

const App = (props)=>{
    const renderCampaigns= ()=>{
        const [summary,setSummary]=useState("");
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
            }
        }
        const items =  props.campaigns.map((address)=>{
            const campaign = Campaign(address);
            const helper = async ()=>{
                const summary1 = await campaign.methods.getSummary().call();
                setSummary(summary1);
            }
            helper();
            return (
                <Card fluid key={address}>
                    <Image src={summary[8]} wrapped ui={false} />
                    <Card.Header style={mystyle.header}>
                        {address}
                    </Card.Header>
                    <Card.Description style={mystyle.description}>
                    <Link route={`/campaigns/${address}`}>
                        <a>View campaign</a>
                    </Link>
                    </Card.Description>
                </Card>
            );
        });
        return items;
    }

    return (
        <Layout>
        <Grid stackable columns={2}>
            <Grid.Row>
                <Grid.Column width={13}>
                        <Card.Group style={{backgroundColor:"#F1DDBF", padding:'10px 10px', margin:'10px 10px 0px 0px'}} fluid='true'>
                        <div style={{color:'#78938A', marginLeft:'10px'}}>
                            <h3>Open Campaigns</h3>
                        </div>
                            {renderCampaigns()}
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