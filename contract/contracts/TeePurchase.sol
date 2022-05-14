// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./TeeFactory.sol";

contract TeePurchase is TeeFactory {
    using SafeMath for uint256;
    uint256 public initialAmount = 0.0002 ether;
    event Purchased(string msg, uint256 teeIndex);
    event Transfered(address from, address to, uint256 teeIndex);
    struct Transfers {
        address from;
        address to;
        uint256 teeIndex;
    }
    Transfers[] public transfers;

    fallback() external payable {}

    receive() external payable {}

    function withdraw() external onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    function purchase_tee(string memory _name) external payable {
        uint256 amount = initialAmount;
        require(msg.value >= amount, "Not enough ether to purchase");
        designTee(_name);
        transfers.push(Transfers(address(this), msg.sender, totalTeeDesigned));
        emit Purchased("Purchased", totalTeeDesigned);
    }

    function transferTo(address to, uint256 teeIndex) external payable {
        uint256 _teeIndex = teeIndex;
        require(
            teeOwner[_teeIndex] == msg.sender,
            "Only owner can transfer the item"
        );
        howManyOwns[msg.sender] = howManyOwns[msg.sender].sub(1);
        teeOwner[_teeIndex] = to;
        howManyOwns[to] = howManyOwns[to].add(1);
        transfers.push(Transfers(msg.sender, to, _teeIndex));
        emit Transfered(msg.sender, to, _teeIndex);
    }

    function getAllTransactions() public view returns (Transfers[] memory) {
        return transfers;
    }
}
