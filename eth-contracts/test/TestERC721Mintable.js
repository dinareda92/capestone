var ERC721MintableComplete = artifacts.require('ISBERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            for(let i = 0 ; i< 10 ; i++){
                await this.contract.mint(accounts[i],i,"mytoken");
            }
        })

        it('should return total supply', async function () { 
           let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply,10, "total supply should return 10");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.baalnceOf(accounts[5]);
            assert.equal(balance,1,"balance should return 1");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(5,{from: account_one});
            assert.equal(tokenURI,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/5");
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenOwner = await this.contract.ownerOf(6);
            assert.equal(tokenOwner,accounts[6],"incorrect owner");
            await this.transferFrom(accounts[6],accounts[7],6,{from:accounts[6]});
            tokenOwner = await this.contract.ownerOf(7);
            assert.equal(tokenOwner,accounts[7],"incorrect owner");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let errorCount = 0;
            try{
                await this.contract.mint(accounts[20],20,"mytoken",{from:accounts[20]});
            }catch(error){
                errorCount++;
            }
            assert.equal(errorCount,1,"Expected revert");
        })

        it('should return contract owner', async function () { 
            let ContractOwner = await this.contract.getOwner();
            assert.equal(ContractOwner,account_one,"incorrect owner");
        })

    });
})