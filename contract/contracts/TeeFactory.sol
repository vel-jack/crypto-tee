//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./utils/SafeMath.sol";

contract TeeFactory {
    using SafeMath for uint256;
    uint256 designMod = 10**9;
    uint256 public initial_amount = 0.00002 ether;

    struct Tee {
        string name;
        uint256 design;
    }

    uint256 public totalTeeDesigned;
    mapping(uint256 => Tee) public tees;
    mapping(uint256 => address) public teeOwner;
    mapping(address => uint256) public howManyOwns;

    function designTee(string memory tee_name) public {
        uint256 randClr = generateRandomColor(tee_name);
        _designTee(tee_name, randClr);
    }

    function _designTee(string memory _name, uint256 _design) private {
        uint256 index = totalTeeDesigned;
        tees[index] = Tee(_name, _design);
        teeOwner[index] = msg.sender;
        howManyOwns[msg.sender].add(1);
        totalTeeDesigned.add(1);
    }

    function generateRandomColor(string memory tee_name)
        private
        view
        returns (uint256)
    {
        return
            uint256(keccak256(abi.encodePacked(tee_name, block.timestamp))) %
            designMod;
    }
}
