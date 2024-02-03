import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import inquirer from "inquirer";

let fullDataWallets = [];
const filePath = path.resolve("data");

function createWallet() {
   //! Generate wallet
   const generateWallet = (count, wallets) => {
      for (let i = 0; i < count; i++) {
         const wallet = ethers.Wallet.createRandom();
         wallet.number = i + 1;
         wallets.push(wallet);
      }
   };

   //! Create and write file
   const writeInFile = (path, wallets) => {
      const privateKeyData = wallets.map((wallet) => wallet.privateKey);
      const writeKeyData = privateKeyData.join("\n");
      fs.writeFile(`${path}/privateKey.txt`, writeKeyData, (err) => {
         if (err) throw err;
      });

      const addressData = wallets.map((wallet) => wallet.address);
      const writeAddressData = addressData.join("\n");
      fs.writeFile(`${path}/address.txt`, writeAddressData, (err) => {
         if (err) throw err;
      });

      const mainData = wallets.map(
         (wallet) =>
            `#${wallet.number}\naddress: ${wallet.address}\nprivateKey: ${wallet.privateKey}\nmnemonic: ${wallet.mnemonic.phrase}`
      );
      const writeMainData = mainData.join("\n\n");
      fs.writeFile(`${path}/wallets.txt`, writeMainData, (err) => {
         if (err) throw err;
         console.log("Wallet created");
      });
   };

   //! Enter amount wallets for generate
   const requestInput = () => {
      return inquirer
         .prompt([
            {
               type: "input",
               name: "answear",
               message: "Enter amount wallets for generate:",
               default: 1,
            },
         ])
         .then(({ answear }) => {
            if (Number.isInteger(+answear)) {
               generateWallet(answear, fullDataWallets);
               writeInFile(filePath, fullDataWallets);
            } else {
               console.error("Enter a valid number, not a string");
               requestInput();
            }
         });
   };
   requestInput();
}

createWallet();
