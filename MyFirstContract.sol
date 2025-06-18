// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyFirstContract {
    string public message = "Hello Web3!";

    function updateMessage(string memory newMessage) public {
        message = newMessage;
    }
}
