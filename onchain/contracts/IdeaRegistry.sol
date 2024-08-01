// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract IdeaRegistry is ERC721, Ownable {
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
    emit IdeaIssued(ideaCounter, _title, _inventor, block.timestamp);
  }

  function getIdea(uint256 _id) public view returns (Idea memory) {
    return ideas[_id];
  }

  function tokenURI(
    uint256 tokenId
  ) public view virtual override returns (string memory) {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    Idea memory idea = ideas[tokenId];
    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          base64Encode(
            bytes(
              string(
                abi.encodePacked(
                  '{"name": "',
                  idea.title,
                  '", ',
                  '"description": "',
                  idea.description,
                  '", ',
                  '"fileUrl": "',
                  idea.fileUrl,
                  '", ',
                  '"image": "https://raw.githubusercontent.com/Ekuspreet/pakka-kagaz-prototype/main/server/public/assets/logo.png", ',
                  '"creator": "',
                  idea.inventor,
                  '", ',
                  '"timestamp": "',
                  idea.timestamp.toString(),
                  '"}'
                )
              )
            )
          )
        )
      );
  }

  function base64Encode(
    bytes memory data
  ) internal pure returns (string memory) {
    // Base64 encoding logic
    string
      memory TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    uint256 encodeLen = 4 * ((data.length + 2) / 3);
    string memory encoded = new string(encodeLen);
    assembly {
      let tablePtr := add(TABLE, 1)
      let resultPtr := add(encoded, 32)
      let endPtr := add(resultPtr, encodeLen)
      let dataPtr := data
      for {

      } lt(resultPtr, endPtr) {

      } {
        dataPtr := add(dataPtr, 3)
        let input := mload(dataPtr)
        let out := mload(tablePtr)
        out := shl(18, out)
        out := add(out, shl(12, and(shr(6, input), 0x3F)))
        out := add(out, shl(6, and(shr(12, input), 0x3F)))
        out := add(out, and(input, 0x3F))
        mstore8(resultPtr, byte(0, out))
        mstore8(add(resultPtr, 1), byte(1, out))
        mstore8(add(resultPtr, 2), byte(2, out))
        mstore8(add(resultPtr, 3), byte(3, out))
        resultPtr := add(resultPtr, 4)
      }
    }
    return encoded;
  }
}
