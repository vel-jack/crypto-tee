//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./utils/SafeMath.sol";
import "./utils/Ownable.sol";

contract TeeFactory is Ownable {
    using SafeMath for uint256;
    uint256 designMod = 10**9;
    uint256 public initialAmount = 0.0002 ether;
    struct Tee {
        string name;
        uint256 design;
        uint256 amount;
    }

    uint256 public totalTeeDesigned;
    mapping(uint256 => Tee) public tees;
    mapping(uint256 => address) public teeOwner;
    mapping(address => uint256) public howManyOwns;

    event Designed(string name, uint256 design);

    function designTee(string memory tee_name) internal {
        uint256 randClr = generateRandomColor(tee_name);
        _designTee(tee_name, randClr);
    }

    function _designTee(string memory _name, uint256 _design) private {
        uint256 index = totalTeeDesigned;
        tees[index] = Tee(_name, _design, initialAmount);
        teeOwner[index] = msg.sender;
        howManyOwns[msg.sender] = howManyOwns[msg.sender].add(1);
        totalTeeDesigned = index.add(1);
        emit Designed(_name, _design);
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

    function getMyTees() public view returns (Tee[] memory) {
        uint256 totalTees = totalTeeDesigned;
        uint256 index = 0;
        Tee[] memory _tees = new Tee[](howManyOwns[msg.sender]);
        for (uint256 i = 0; i < totalTees; i++) {
            if (teeOwner[i] == msg.sender) {
                _tees[index] = tees[i];
                index++;
            }
        }
        return _tees;
    }
}
