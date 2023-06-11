mergeInto(LibraryManager.library, {
  ShowRecoveryPhrase: async function () {
    await showRecoveryPhrase();
  },
  GetOrCreateWallet: async function (blockchainId) {
    await getOrCreateWallet(UTF8ToString(blockchainId));
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
  BuyNft: async function (nftId) {
    await buyNft(UTF8ToString(nftId));
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
