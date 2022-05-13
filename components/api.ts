import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import Web3Modal from "web3modal";
export async function createIndex() {
  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: {},
  });

  const web3ModalRawProvider = await web3Modal.connect();

  const web3ModalProvider = new ethers.providers.Web3Provider(
    web3ModalRawProvider
  );

  const web3ModalSf = await Framework.create({
    networkName: "mumbai",
    provider: web3ModalProvider,
  });

  const id = Math.floor(Math.random() * 1000000000);

  const signer = web3ModalProvider.getSigner();

  const MATICx = "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4"; //MATICx https://docs.superfluid.finance/superfluid/protocol-developers/networks

  /*   Congrats - you've just created a new Index!
  Network: Mumbai
  Super Token: MATICx
  Index ID: 856296430 */

  try {
    const createIndexOperation = web3ModalSf.idaV1.createIndex({
      indexId: id as unknown as string,
      superToken: MATICx,
      // userData?: string
    });

    console.log("Creating your Index...");

    await createIndexOperation.exec(signer);

    console.log(
      `Congrats - you've just created a new Index!
       Network: Mumbai
       Super Token: MATICx
       Index ID: ${id}
       Now you need to wrap your funds into MATICx. Smart Contract 0x96B82B65ACF7072eFEb00502F45757F254c2a0D4
    `
    );
    return id;
  } catch (error) {
    console.error(error);
  }
}

export async function updateSubscription(formState) {
  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: {},
  });

  const web3ModalRawProvider = await web3Modal.connect();

  const web3ModalProvider = new ethers.providers.Web3Provider(
    web3ModalRawProvider
  );

  const web3ModalSf = await Framework.create({
    networkName: "mumbai",
    provider: web3ModalProvider,
  });

  const MATICx = "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4";
  const signer = web3ModalProvider.getSigner();

  try {
    const updateSubscriptionOperation =
      web3ModalSf.idaV1.updateSubscriptionUnits({
        indexId: formState.indexid,
        superToken: MATICx,
        subscriber: formState.subscriber,
        units: formState.units,
        // userData?: string
      });

    console.log("Updating your Index...");

    await updateSubscriptionOperation.exec(signer);

    console.log(
      `Congrats - you've just updated an Index!
         Network: Kovan
         Super Token: DAIx
         Index ID: 856296430
         Subscriber: 0xABe151555989845e50d6f9534eA223c95c1da4e6
         Units: 25 units
         
      `
    );
  } catch (error) {
    console.error(error);
  }
}

export async function distribute(formState) {
  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: {},
  });

  const web3ModalRawProvider = await web3Modal.connect();

  const web3ModalProvider = new ethers.providers.Web3Provider(
    web3ModalRawProvider
  );

  const web3ModalSf = await Framework.create({
    networkName: "mumbai",
    provider: web3ModalProvider,
  });

  const MATICx = "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4";
  const signer = web3ModalProvider.getSigner();

  try {
    const distributeOperation = web3ModalSf.idaV1.distribute({
      indexId: formState.deposit_indexid,
      superToken: MATICx,
      amount: formState.deposit_amount,
      // userData?: string
    });

    console.log("Distributing funds to your index subscribers...");

    await distributeOperation.exec(signer);

    console.log(
      `Congrats - you've just sent funds to your index!
         Network: Mumbai
         Super Token: Maticx
         Index ID: 856296430
         Total Sent: Amount 4 Shares 50 - 25
      `
    );
  } catch (error) {
    console.error(error);
  }
}
