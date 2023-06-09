import { TweedFrontendSDK } from "@paytweed/frontend-sdk";

//Setup the frontend SDK
const frontendSDK = TweedFrontendSDK.setup({
  defaultBlockchainIds: ["ethereumGoerli", "polygonMumbai"],
  sendMessageToBackend: async (message) => {
    const response = await fetch("http://127.0.0.1:3010/message", {
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const { answer } = await response.json();
    return answer;
  },
});

let _waiting = false;
//Unified get or create wallet function
export async function getOrCreateWallet(blockchainId) {
  console.log("yyy" + blockchainId)
  if (!_waiting) {
    let address = "";

    if (!(await frontendSDK.wallet.exists())) {
      address = await frontendSDK.wallet.create({
        settings: { returnUrl: false },
      });
    } else {
      address = await frontendSDK.wallet.getAddress({
        blockchainId: blockchainId,
      });
    }

    _waiting = true;

    getUnityInstance().SendMessage("Canvas", "getOrCreateWallet_cb", address);
  }
}

export async function showRecoveryPhrase() {
  await frontendSDK.wallet.showRecoveryPhrase();
}

export async function createRecovery() {
  await frontendSDK.wallet.createRecovery();
}

export async function logout() {
  await frontendSDK.wallet.logout();
}

export async function buyNft() {
  await frontendSDK.nft.buyWithFiat({
    nftId: "1",
  });
}

export async function showAddress() {
  await frontendSDK.wallet.showAddress({ blockchainId: "ethereumGoerli" });
}

export async function signMessage() {
  await frontendSDK.wallet.signMessage({
    blockchainId: "ethereumGoerli",
    message: "hello tweed",
  });
}

export async function getRecoveryStatus() {
  const recoveryStatus = await frontendSDK.wallet.getRecoveryStatus();
  getUnityInstance().SendMessage(
    "Canvas",
    "getRecoveryStatus_cb",
    recoveryStatus
  );
}

export async function loggedIn() {
  const isLoggedIn = await frontendSDK.wallet.loggedIn();
  getUnityInstance().SendMessage(
    "Canvas",
    "loggedIn_cb",
    isLoggedIn.toString()
  );
}

export async function reCreateWallet() {
  await frontendSDK.wallet.recreate();
}

export async function getAddress() {
  const walletAddress = await frontendSDK.wallet.getAddress();
  if (walletAddress) {
    getUnityInstance().SendMessage("Canvas", "getAddress_cb", walletAddress);
  }
}

export async function getAddresses() {
  const walletAddresses = await frontendSDK.wallet.getAddresses();
  getUnityInstance().SendMessage(
    "Canvas",
    "showRecoveryPhrase_cb",
    walletAddresses
  );
}

//Export to global context
window.getOrCreateWallet = getOrCreateWallet;
window.showRecoveryPhrase = showRecoveryPhrase;
window.createRecovery = createRecovery;
window.logout = logout;
window.buyNft = buyNft;
window.showAddress = showAddress;
window.signMessage = signMessage;
window.getRecoveryStatus = getRecoveryStatus;
window.loggedIn = loggedIn;
window.reCreateWallet = reCreateWallet;
window.getAddress = getAddress;
window.getAddresses = getAddresses;
