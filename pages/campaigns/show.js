import React from 'react';
import { Card, Grid, Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';


const CampaignShow = (props)=>{
    const renderCards = ()=>{
        const mystyle={
            header: {
                fontWeight:'bold',
                fontSize:'14px',
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
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
            campaignName,
            description,
            target,
            fullName
        } = props;

        return(
            <Card.Group style={{backgroundColor:"#F1DDBF", padding:'20px 20px', margin:'10px 5px 0px 0px'}} fluid='true'>
            <h3 style={{color:'#78938A',fontSize:'20px'}}>Campaign Details</h3>
            <Grid stackable columns={2}>
            <Grid.Row>
            <Grid.Column >
            <Card fluid>
                <Card.Header style={mystyle.header}>{campaignName}</Card.Header>
                <Card.Meta style={mystyle.meta}>Creator Name</Card.Meta>
                <Card.Description style={mystyle.description}>{fullName}</Card.Description>
            </Card>
            </Grid.Column>
            <Grid.Column >
            <Card fluid>
                <Card.Header style={mystyle.header}>{minimumContribution}</Card.Header>
                <Card.Meta style={mystyle.meta}>'Minimum Contribution (Wei)</Card.Meta>
                <Card.Description style={mystyle.description}>You must contribute at least this much wei to become an approver</Card.Description>
            </Card>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column >
            <Card fluid>
                <Card.Header style={mystyle.header}>{requestsCount}</Card.Header>
                <Card.Meta style={mystyle.meta}>Number Of Requests</Card.Meta>
                <Card.Description style={mystyle.description}>A request tries to withdraw money from the contract</Card.Description>
            </Card>
            </Grid.Column>
            <Grid.Column >
             <Card fluid>
                <Card.Header style={mystyle.header}>{approversCount}</Card.Header>
                <Card.Meta style={mystyle.meta}>Number Of Approvers</Card.Meta>
                <Card.Description style={mystyle.description}>Number of people who have already donated to this campaign</Card.Description>
            </Card>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column >
            <Card fluid>
                <Card.Header style={mystyle.header}>{web3.utils.fromWei(balance,'ether')}</Card.Header>
                <Card.Meta style={mystyle.meta}>Campaign Balance(ether)</Card.Meta>
                <Card.Description style={mystyle.description}>This balance is how much money this campaign has left to spend.</Card.Description>
            </Card>
            </Grid.Column>
            <Grid.Column >
            <Card fluid>
                <Card.Header style={mystyle.header}>{web3.utils.fromWei(target,'ether')}</Card.Header>
                <Card.Meta style={mystyle.meta}>Target Amount</Card.Meta>
                <Card.Description style={mystyle.description}>We are hoping to raise this much amount.</Card.Description>
            </Card>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            
            <Card fluid style={{marginLeft:"10px",marginRight:"10px"}}> 
                <Card.Header style={mystyle.header}>Description</Card.Header>
                <Card.Description style={mystyle.description}>{description}</Card.Description>
            </Card>
            
            </Grid.Row>
            </Grid>
            </Card.Group>
            );
    }
    return(
        <Layout>
            <Grid stackable columns={2}>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={props.address}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/campaigns/${props.address}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    );
}
CampaignShow.getInitialProps = async (props)=>{
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
        address:props.query.address,
        minimumContribution:summary[0],
        balance:summary[1],
        requestsCount:summary[2],
        approversCount:summary[3],
        manager:summary[4],
        campaignName:summary[6],
        description:summary[7],
        target:summary[9],
        fullName: summary[5]

    };
}

export default CampaignShow;