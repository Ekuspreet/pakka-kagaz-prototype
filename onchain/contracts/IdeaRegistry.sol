// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract IdeaRegistry is ERC721URIStorage, Ownable {
  using Strings for uint256;

  struct Idea {
    uint256 id;
    string title;
    string inventor;
    string description;
    string fileUrl;
    uint256 timestamp;
  }

  uint256 public ideaCounter;
  mapping(uint256 => Idea) public ideas;

  event IdeaIssued(
    uint256 id,
    string title,
    string inventor,
    uint256 timestamp
  );

  constructor() ERC721("IdeaNFT", "IDEA") {}

  function issueIdea(
    string memory _title,
    string memory _inventor,
    string memory _description,
    string memory _fileUrl
  ) public {
    ideaCounter++;
    ideas[ideaCounter] = Idea(
      ideaCounter,
      _title,
      _inventor,
      _description,
      _fileUrl,
      block.timestamp
    );
    _mint(msg.sender, ideaCounter);

    string memory metadata = string(
      abi.encodePacked(
        '{"name": "',
        _title,
        '", "description": "',
        _description,
        '", "fileUrl": "',
        _fileUrl,
        '", "image": "https://raw.githubusercontent.com/Ekuspreet/pakka-kagaz-prototype/main/server/public/assets/logo.png", ',
        '"creator": "',
        _inventor,
        '", "timestamp": "',
        block.timestamp.toString(),
        '"}'
      )
    );

    string memory json = Base64.encode(bytes(metadata));
    string memory tokenUri = string(
      abi.encodePacked("data:application/json;base64,", json)
    );
    _setTokenURI(ideaCounter, tokenUri);

    emit IdeaIssued(ideaCounter, _title, _inventor, block.timestamp);
  }

  function getIdea(uint256 _id) public view returns (Idea memory) {
    return ideas[_id];
  }
}
