// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./TeeFactory.sol";

contract TeePurchase is TeeFactory {
    using SafeMath for uint256;
    event Purchase(string messaeg, uint256 teeIndex);
    event Transfer(address from, address to, uint256 teeIndex, uint256 amount);
    event Approve(address from, address to, uint256 teeIndex);
    event PriceChange(uint256 teeIndex, uint256 newAmount);
    struct Transfers {
        address from;
        address to;
        uint256 teeIndex;
        uint256 amount;
    }
    Transfers[] public transfers;
    mapping(uint256 => address) public approved;
    mapping(uint256 => address) public pendingApproval;
    uint256 public changeApprovalFee = 0.0001 ether;

    fallback() external payable {}

    receive() external payable {}

    modifier onlyOwnerOf(uint256 teeIndex) {
        require(
            teeOwner[teeIndex] == msg.sender,
            "Only owner of the item can make changes"
        );
        _;
    }

    function withdraw() external onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    function purchaseTee(string memory _name) external payable {
        uint256 amount = initialAmount;
        require(msg.value >= amount, "Not enough ether to purchase");
        designTee(_name);
        transfers.push(
            Transfers(address(this), msg.sender, totalTeeDesigned, amount)
        );
        emit Purchase("Purchased", totalTeeDesigned);
    }

    function _transfer(
        address from,
        address to,
        uint256 teeIndex,
        uint256 amount
    ) private {
        howManyOwns[from] = howManyOwns[from].sub(1);
        teeOwner[teeIndex] = to;
        howManyOwns[to] = howManyOwns[to].add(1);
        transfers.push(Transfers(from, to, teeIndex, amount));
        emit Transfer(from, to, teeIndex, amount);
    }

    function transferTo(address to, uint256 teeIndex)
        external
        payable
        onlyOwnerOf(teeIndex)
    {
        _transfer(msg.sender, to, teeIndex, 0);
    }

    function buyFromOwner(address payable from, uint256 teeIndex)
        external
        payable
    {
        require(
            approved[teeIndex] == msg.sender,
            "You are not approved to buy"
        );
        uint256 teeAmount = tees[teeIndex].amount;
        require(msg.value >= teeAmount, "Insufficient ethers to buy");
        from.transfer(msg.value);
        pendingApproval[teeIndex] = address(0);
        _transfer(from, msg.sender, teeIndex, teeAmount);
    }

    function getAllTransfers() public view returns (Transfers[] memory) {
        return transfers;
    }

    function getTransferLength() public view returns (uint256) {
        return transfers.length;
    }

    function changePrice(uint256 teeIndex, uint256 newAmount)
        external
        onlyOwnerOf(teeIndex)
    {
        Tee storage tee = tees[teeIndex];
        tee.amount = newAmount;
        emit PriceChange(teeIndex, newAmount);
    }

    function approveTo(address to, uint256 teeIndex)
        external
        onlyOwnerOf(teeIndex)
    {
        approved[teeIndex] = to;
        emit Approve(msg.sender, to, teeIndex);
    }

    function askForApproval(uint256 teeIndex) external {
        require(
            pendingApproval[teeIndex] == address(0),
            "Already asked for Approval"
        );
        pendingApproval[teeIndex] = msg.sender;
    }

    function changeApprovalRequestToMe(uint256 teeIndex) external payable {
        require(msg.value >= changeApprovalFee);
        require(
            pendingApproval[teeIndex] != msg.sender,
            "Already You asked for Approval"
        );
        pendingApproval[teeIndex] = msg.sender;
    }
}
