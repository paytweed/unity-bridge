const cors = require("cors");
const fs = require("fs");
const os = require("os");
const express = require("express");
const { Environment, TweedBackendSDK } = require("@paytweed/backend-sdk");

const UnityObject = {
  framework: {
    path: "unity/deploy/tweed/Build/tweed.framework.js",
    data: "",
    endpoint: "/unity/framework",
  },
  wasm: {
    path: "unity/deploy/tweed/Build/tweed.wasm",
    data: "",
    endpoint: "/unity/wasm",
  },
  data: {
    path: "unity/deploy/tweed/Build/tweed.data",
    data: "",
    endpoint: "/unity/data",
  },
  loader: {
    path: "unity/deploy/tweed/Build/tweed.loader.js",
    data: "",
    endpoint: "/unity/loader",
  },
};

const authenticatedUser = {
  email: "test@example.com",
  id: "1",
};

async function readUnityData() {
  UnityObject.framework.data = fs.readFileSync(UnityObject.framework.path);
  UnityObject.data.data = fs.readFileSync(UnityObject.data.path);
  UnityObject.wasm.data = fs.readFileSync(UnityObject.wasm.path);
  UnityObject.loader.data = fs.readFileSync(UnityObject.loader.path);

  console.log(
    `Finish reading ${UnityObject.framework.data.length} ${UnityObject.data.data.length} ${UnityObject.wasm.data.length} ${UnityObject.loader.data.length}`
  );
}

const getNftPurchaseData = async ({ nftId, fiatCurrencyId }) => {
  const nftData = {
    nftId,
    priceInCents: 100,
    fiatCurrencyId: fiatCurrencyId || "USD",
    tokenUri: "https://tweed-demo.web.app/seasonTicketSmall.png",
    contractAddress: "0x48CE5586f43Bb83206d289E9d44e2F72e8f23B61",
    chain: "ethereumSepolia",
    title: "NFTname",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    abi: "mint(address,string)",
  };
  return nftData;
};

async function start() {
  readUnityData();

  const sdk = await TweedBackendSDK.setup({
    apiKey: "lpXEHzanN27uJdqdAT6z9MjkXxwR42Gx",
    apiSecret:
      "fmaCOxvVBKjDHLaZMQbHWNuavNNb5hCDXwodtFHsd7DYhZzF1gEeAuMnYJNZxiwN",
    callbacks: { getNftPurchaseData },
    defaultBlockchainIds: ["tezosGhost", "polygonMumbai", "ethereumGoerli"],
  });

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/unity/data", (req, res) => {
    res.writeHead(200, { "Content-Type": "application/octet-stream" });
    res.write(UnityObject.data.data);
    res.end();
    console.log("data sent");
  });

  app.get("/unity/framework", (req, res) => {
    res.writeHead(200, { "Content-Type": "application/wasm" });
    res.write(UnityObject.framework.data);
    res.end();
    console.log("framework sent");
  });

  app.get("/unity/wasm", (req, res) => {
    res.writeHead(200, { "Content-Type": "application/wasm" });
    res.write(UnityObject.wasm.data);
    res.end();
    console.log("wasm sent");
  });

  app.get("/unity/loader", (req, res) => {
    res.writeHead(200, { "Content-Type": "application/javascript" });
    res.write(UnityObject.loader.data);
    res.end();
    console.log("Loader sent");
  });

  app.post("/message", async (req, res) => {
    const answer = await sdk.handleMessageFromFrontend(
      req.body.message,
      authenticatedUser.id,
      authenticatedUser.email
    );
    res.send({ answer });
  });

  const port = 3010;
  app.listen(port, () => console.log(`App is listening on port ${port}`));
}

start();
