// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CampaignFactory{
    address[] public deployedCampaigns;
    function createCampaign(uint minimum,string calldata fname,string calldata campaignName,string calldata campaignDesc,string calldata imageUrl,uint targetAmount) public{
        address newCampaign = address(new Campaign(minimum, fname, campaignName, campaignDesc, imageUrl, targetAmount,msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory)
    {
        return deployedCampaigns;
    }
}

contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    uint public numRequests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    mapping (uint => Request) public requests;

     string public full_name;
     string public campaign_name;
     string public campaign_desc;
     string public image_url;
     uint public target_amount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum,string memory fname,string memory campaignName,string memory campaignDesc,string memory imageUrl,uint targetAmount,address creator){
        manager = creator;
        minimumContribution = minimum;
        approversCount = 0;
        full_name= fname;
        campaign_name= campaignName;
        campaign_desc= campaignDesc;
        image_url= imageUrl;
        target_amount= targetAmount;
    }

    function contribute() public payable{
        require(msg.value > minimumContribution);
        // approvers[msg.sender]=true;
        // approversCount++;
        if(!approvers[msg.sender])
        {
            approvers[msg.sender] = true;
            approversCount++;
        }
    }

    function createRequest(string memory description , uint value , address payable recipient ) public restricted{
        Request storage newRequest = requests[numRequests++];
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public{
        Request storage request= requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted{
        Request storage request= requests[index];

        // require(!request.complete);
        // require(request.approvalCount > (approversCount/2));

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns(uint, uint, uint, uint, address,string memory ,string memory, string memory, string memory,uint){
        return (
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount, 
            manager,
            full_name,
            campaign_name,
            campaign_desc,
            image_url,
            target_amount

        );
    }
    
    function getRequestsCount() public view returns(uint){
        return(
            numRequests
        );
    }
}

