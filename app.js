const ethers = require("ethers");
const fs = require("fs");
const readline = require("readline");

let wallets = [];

function createWallet() {
   //! Generate wallet
   const generateWallet = (count) => {
      for (let i = 0; i < count; i++) {
         const wallet = ethers.Wallet.createRandom();
         wallet.number = i + 1;
         wallets.push(wallet);
      }
   };

   //! Create and write file
   const writeInFile = (name, wallets) => {
      const dataToWrite = wallets.map(
         (wallet) =>
            `#${wallet.number}\naddress: ${wallet.address}\nprivateKey: ${wallet.privateKey}\nmnemonic: ${wallet.mnemonic.phrase}`
      );

      const data = dataToWrite.join("\n\n");

      fs.writeFile(name, data, (err) => {
         if (err) throw err;
         console.log("Wallet created");
      });
   };

   //! Enter amount wallets for generate
   const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
   });

   rl.question("Enter amount wallets for generate: ", (numberOfWallets) => {
      generateWallet(numberOfWallets);
      writeInFile("wallets.txt", wallets);
      rl.close();
   });
}

createWallet();
