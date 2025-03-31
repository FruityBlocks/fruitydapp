import Web3 from "web3";
import MyContract from "../build/contracts/MyContract.json";

async function init() {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[networkId];

    const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
    );

    console.log("Contrat chargé :", contract);
}

init();