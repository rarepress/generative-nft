const Rarepress = require('rarepress')
const rarepress = new Rarepress();
(async () => {
  const tokenId = "38183734355667041789487856302460050713340420322540525998430549297824552022370"
  await rarepress.init({ network: "rinkeby" })
  let token = await rarepress.token.queryOne({
    where: { tokenId }
  })
  console.log("token", token)
})();
