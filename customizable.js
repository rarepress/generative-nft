const { createAvatar } = require('@dicebear/avatars');
const style = require('@dicebear/open-peeps');
const Rarepress = require('rarepress');

// Simply increment the INDEX value to mint collections from a new address every time.
const INDEX = 1;
// Tweak the TOTAL attribute to change how many items you want to mint in your collection.
const TOTAL = 10;

(async () => {
  const rarepress = new Rarepress();
  await rarepress.init({ network: "mainnet", key: `m'/44'/60'/0'/0/${INDEX}` })
  for(let i=0; i<TOTAL; i++) {
    let svg = createAvatar(style, { seed: i.toString() });
    let cid = await rarepress.fs.add(Buffer.from(svg))
    let token = await rarepress.token.create({
      metadata: {
        name: `${i}`,
        description: `${i}.svg`,
        image: `/ipfs/${cid}`
      }
    })
    await rarepress.fs.push(cid)
    await rarepress.fs.push(token.uri)
    let sent = await rarepress.token.send(token)
    console.log(`[${i}] published: https://rarible.com/token/${sent.id}`)
  }
})();
