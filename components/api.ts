import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import Web3Modal from "web3modal";
const MATICx = "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7"; //USDCX MATICx https://docs.superfluid.finance/superfluid/protocol-developers/networks

export async function createIndex(): Promise<[boolean, number]> {
  try {
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

    const createIndexOperation = web3ModalSf.idaV1.createIndex({
      indexId: id as unknown as string,
      superToken: MATICx,
      // userData: "123",
    });

    await createIndexOperation.exec(signer).then((response) => {
      console.log(
        `Congrats - you've just created a new Pool!
        Network: Mumbai
        Super Token: USDCx
        Pool ID: ${id}
      `
      );
    });
    return [true, id];
  } catch (e) {
    console.error("Try/Catch error > ", e.message); //Handle SFError
    return [false, e.message];
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

  const signer = web3ModalProvider.getSigner();

  try {
    const updateSubscriptionOperation =
      web3ModalSf.idaV1.updateSubscriptionUnits({
        indexId: formState.indexid,
        superToken: MATICx,
        subscriber: formState.suscriber,
        units: formState.units,
        // userData?: string
      });

    console.log("Updating your Index...");

    await updateSubscriptionOperation.exec(signer);

    console.log(
      `Congrats - you've just updated an Index!
         Network: Mumbai
         Super Token: USDCx
         
         
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

  const signer = web3ModalProvider.getSigner();

  try {
    const distributeOperation = web3ModalSf.idaV1.distribute({
      indexId: formState.deposit_indexid,
      superToken: MATICx,
      amount: formState.deposit_amount,
      // userData?: string
    });

    console.log("Distributing funds to your index subscribers...");

    const resultDistribute = await distributeOperation.exec(signer);
    console.log("resultDistribute >", resultDistribute);
    console.log(
      `Congrats - you've just sent funds to your index!
         Network: Mumbai
         Super Token: USDCx
         Index ID: ${formState.deposit_indexid}
         Total Sent: Amount 4 Shares 50 - 25
      `
    );
  } catch (error) {
    console.error(error);
  }
}

export async function createFlow() {
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

  // WE ARE GOING TO CREATE THE FLOW

  try {
    console.log("Creating your Flow... >>");

    const createFlowOperation = web3ModalSf.cfaV1.createFlow({
      sender: "0xa8f6D583A415dA2142282ad97eBA682a37c1218f",
      receiver: "0xE7ab2D31396a89F91c4387ad88BBf94f590e8eB1",
      superToken: "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
      flowRate: "9000000000000000", //13000 month
    });

    console.log("createFlowOperation", createFlowOperation);
    const txnResponse = await createFlowOperation.exec(signer);
    console.log("txnResponse", txnResponse);

    const txnReceipt = await txnResponse.wait();
    console.log("txnReceipt", txnReceipt);
  } catch (error) {
    console.error(error);
  }

  /*  const flowInfo = await web3ModalSf.cfaV1.getFlow({
    superToken: "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
    sender: "0xa8f6D583A415dA2142282ad97eBA682a37c1218f",
    receiver: "0xE7ab2D31396a89F91c4387ad88BBf94f590e8eB1",
    providerOrSigner: web3ModalProvider,
  });
  console.log("flowInfo", flowInfo); */
}

export async function querySF() {
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

  try {
    type Paging = { take: number; skip?: number; lastId?: string };

    const pageResult = await web3ModalSf.query
      // The different queries can take different order by properties
      // given the properties that exist on the entity itself.

      .listStreams(
        { sender: "0xa8f6D583A415dA2142282ad97eBA682a37c1218f" },
        { take: 100 }
      );

    console.log("Page Result ", pageResult);
  } catch (e) {
    console.log("error", e);
  }
}
