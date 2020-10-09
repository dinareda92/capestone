pragma solidity ^0.5.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./verifier.sol";
import "./ERC721Mintable.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ISBERC721Token{
// TODO define a solutions struct that can hold an index & an address
    struct solutions{
        uint256 index;
        address Address;
    }
    // TODO define an array of the above struct


// TODO define a mapping to store unique solutions submitted
    mapping (bytes32 => solutions) solutionArray;

    // TODO Create an event to emit when a solution is added
    event solotionAdded( uint256 index,address Address);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(address _Address,uint256 _index , bytes32 _key) internal {
        solutionArray[_key] = solutions({
            index : _index,
            Address : _Address
        });

        emit solotionAdded(_index,_Address);

    }

    Verifier public VerifierContract;
    constructor(address VerifierContractAddress )public{
        VerifierContract = Verifier(VerifierContractAddress);
    }
    function getHash(
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input)
        internal view returns(bytes32 ){
            return keccak256(abi.encodePacked(a,a_p,b,b_p,c,c_p,h,k,input));
        }

        function mintNFT(address to,uint256 tokenID,
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input)public returns(uint256 ){
            bytes32 key = getHash(a,a_p,b,b_p,c,c_p,h,k,input);
            require(solutionArray[key].Address == address(0),"require uniq solution");
            require(VerifierContract.verifyTx(a,a_p,b,b_p,c,c_p,h,k,input),"not verified");
            addSolution(to, tokenID, key);
            return super.mint(to,tokenID,"TokenURI");
        }
}















// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

  


























