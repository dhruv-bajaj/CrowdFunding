import React,{useState} from "react";
import { Form,Button,Input, Message,TextArea } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';
import axios from "axios";

const CampaignNew = ()=>{

    const [inputs,setInputs] = useState({});
    const [errorMessage,setErrorMessage]=useState("");
    const [loading,setLoading] = useState(false);
    const [imageSelected,setImageSelected] = useState("");
    const style = {color:'#78938A',fontSize:'20px'};

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    };

    const onSubmit = async (event)=>{
        event.preventDefault();
        setErrorMessage('');
        setLoading(true);
        try{
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "cfimage");
        let imageUrl=""; 
        await axios.post(
            "https://api.cloudinary.com/v1_1/ramfire/image/upload",
            formData
        ).then((response)=>{
            imageUrl=response.data.url;
        });
        const accounts = await web3.eth.getAccounts();
        await factory.methods
            .createCampaign(inputs.minimumContribution,inputs.fullName,inputs.campaignName,inputs.campaignDesc,imageUrl,inputs.targetAmount)
            .send({
                from:accounts[0]
            });
        setInputs(values => ({...values, minimumContribution: 0}));
        Router.pushRoute('/');
        }catch(err){
            setErrorMessage(err.message);
        }
        setLoading(false);
    };

    return(
        <Layout>
            <h1>Create Campaign</h1>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field style={style}>
                    <label>Minimum Contribution</label>
                    <Input 
                        name="minimumContribution"
                        label="wei" 
                        labelPosition="right"
                        value={inputs.minimumContribution || ""}
                        onChange={handleChange}    
                    />
                </Form.Field>
                <Form.Field style={style}>
                    <label>Your Full Name</label>
                    <Input 
                        name="fullName"
                        value={inputs.fullName || ""}
                        onChange={handleChange}    
                    />
                </Form.Field>
                <Form.Field style={style}>
                    <label>Campaign Name</label>
                    <Input 
                        name="campaignName"
                        value={inputs.campaignName || ""}
                        onChange={handleChange}    
                    />
                </Form.Field>
                <Form.Field style={style}>
                    <label>Campaign Description</label>
                    <TextArea rows={2} 
                        name="campaignDesc"
                        value={inputs.campaignDesc || ""}
                        onChange={handleChange}
                        placeholder='Tell us more'    
                    />
                </Form.Field>
                <Form.Field style={style}>
                    <label>Upload Image</label>
                    <input 
                        type="file"
                        onChange={(event)=>{
                            setImageSelected(event.target.files[0]);
                        }}
                    />
                </Form.Field>
                <Form.Field style={style}>
                    <label>Total Required Amount</label>
                    <Input 
                        name="targetAmount"
                        label="wei" 
                        labelPosition="right"
                        value={inputs.targetAmount || ""}
                        onChange={handleChange}    
                    />
                </Form.Field>
                <Message error header = "Oops!" content = {errorMessage}/>
                <Button loading={loading} primary> Create</Button>
            </Form>
        </Layout>
    );

}

export default CampaignNew;