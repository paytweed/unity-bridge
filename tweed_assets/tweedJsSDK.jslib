mergeInto(LibraryManager.library, {
  GetOrCreateWallet: async function () {
    address = await getOrCreateWallet();
    console.log("B - " + address);
  },
  ShowRecoveryPhrase: async function () {
    await showRecoveryPhrase();
  },
  GetOrCreateWallet: async function () {
    await getOrCreateWallet();
  },
  ShowRecoveryPhrase: async function () {
    await showRecoveryPhrase();
  },
  CreateRecovery: async function () {
    await createRecovery();
  },
  Logout: async function () {
    await logout();
  },
  BuyNft: async function () {
    await buyNft();
  },
  ShowAddress: async function () {
    await showAddress();
  },
  SignMessage: async function () {
    await signMessage();
  },
  GetRecoveryStatus: async function () {
    await getRecoveryStatus();
  },
  LoggedIn: async function () {
    await loggedIn();
  },
  ReCreateWallet: async function () {
    await reCreateWallet();
  },
  GetAddresses: async function () {
    await getAddresses();
  },
  GetAddress: async function () {
    await getAddress();
  },
});
