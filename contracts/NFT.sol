// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Conunter private _tokenIds;
    address countractAddress;

    constrcutor(address marketPlaceAddress) ERC721("Metaverse Tokens", "MEET") {
        contractAddress = marketPlaceAddress;
    }

    function createToken(string memory tokenURI) public ruturns (uint) {
        _tokenIds.increnet();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.senderm newItemid);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        
        return newItemId;
    }
}