/* test/sample-test.js */
describe("NFTMarket", function() {
  it("Should create and execute market sales", async function() {
    /* deploy the marketplace */
    const OtentixMarketPlace = await ethers.getContractFactory("OtentixMarketPlace")
    const Otx = await OtentixMarketPlace.deploy()
    await OtentixMarketPlace.deployed()

    let listingPrice = await OtentixMarketPlace.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    /* create two tokens */
    await OtentixMarketPlace.createToken("https://www.mytokenlocation.com", auctionPrice, { value: listingPrice })
    await OtentixMarketPlace.createToken("https://www.mytokenlocation2.com", auctionPrice, { value: listingPrice })

    const [_, buyerAddress] = await ethers.getSigners()

    /* execute sale of token to another user */
    await OtentixMarketPlace.connect(buyerAddress).createMarketSale(1, { value: auctionPrice })

    /* resell a token */
    await OtentixMarketPlace.connect(buyerAddress).resellToken(1, auctionPrice, { value: listingPrice })

    /* query for and return the unsold items */
    items = await OtentixMarketPlace.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await OtentixMarketPlace.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)
  })
})