// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
 var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
 var Verifier = artifacts.require("verifier");

 contract(SolnSquareVerifier,accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe("testing SolnSquareVerifier" , function() {
        beforeEach(async function (){
            VerifierContract =  await Verifier.new({from:account_one});
            this.contract = await SolnSquareVerifier.new(VerifierContract.address,{from:account_one});
        });

        it("should get token balance", async function(){
            for(var i = 0 ; i< 5 ;i++){
                await this.contract.mint(accounts[5],i,"token");
            }
            let balance = await this.contract.balanceOf(accounts[5]);
            assert.equal(balance,5,"balance should return 1");
        })
        it("Test if a new solution can be added for contract - SolnSquareVerifier"),async function(){
            await this.contract.mint(accounts[1],1,"token");
            let balance = await this.contract.balanceOf(accounts[1]);
            assert.equal(balance,1,"balance should return 1");
        }
        it("test if ERC721 token can be minted for contract - SolnSquareVerifier " , async function(){
            let CorrectProof = {
                "A":["0x175e07b53d4b9b0f88b15f8dd066266f6d8aeac027789758bdfdf76c79121bb2", "0x154ec17488c8625a544afd3345dc192775b9d8043acd89c596a6faea02fc4314"],
                "A_p":["0x1edb3dc591c379505c59622e7b04af985552c99b9e974120ad92808ac0881bd0", "0x197591fba31aefbef38de529e3dde7d5cdb43b33c4820fd1ac2a3c04d38729ff"],
                "B":
                    [["0x1a6d087a3b035ed5dbdf61ccfd056b9fb64fcb6e0c966070aeb3d1337e7d6b77", "0x17208c08efb0891e12bec3d530a7bd1525a7deaec04768250d9814fe6a19a578"], ["0xd4f4599642015fe3e515ad37911e2b8240f7c041a2b633377de8f13c10ffcb", "0x2729cd35956be3bc9c3aa034530e28dda48e6ca04c093adc6e5c4e2a81705e85"]],
                
                "B_p":["0x112c3def382d5333d559ad0fd524bc54347566c192e85bb0ef117281d9f65b76", "0xb79d49ebe6dfc3e871bc0e1df93593705a844924ae8273d39fbb3171717afb4"],
                "C":["0x297cb1a1a2012b6ff8245b7d8a64353297008daf47ae8fe8e00e130bbb15a469", "0x2713309595e8b14d1e694fd430fba3943c63150fea12641eebf8626f06a6b620"],
                "C_p":["0xe43e6473f1122d00cc95c9613e890d60ee18dc84fa70f7fb735aad0475384d1", "0x2ed5c041c19fe6cbc3ad8b6cd21e1d81c2b2e0be3b8394680f476369f8c598ba"],
                "H":["0x4e217ccc4d7bc95482e89177de71c38f4d6b14fe7ef9f4a03fc49472c08ec64", "0x134344794300ece5450b9acdf599e5cbb4983c8bf35105a46d201c2c356f44ef"],
                "K":["0x23547e31136c549f427e9613c9286f736832b6c76b7f8f733102bd4a3f2311f0", "0x14d9e419a6ba1597213afdb1b1776e8d7212e01aab31bb334b75cfd53f80b030"],
                "input":[9,1]
            }
            let tx = await this.contract.mintNFT(accounts[2],5,CorrectProof.A,CorrectProof.A_p,CorrectProof.B,CorrectProof.B_p,
                CorrectProof.C,CorrectProof.C_p,CorrectProof.H,CorrectProof.K,CorrectProof.input);
                assert.equal(tx.logs[1].event,'Transfer',"correct proof is not working");
        })
    });
 })