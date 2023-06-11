# Tweed SDK Unity Example

The files for the bridge can be found under the tweed_assets folder.
the deploy.sh script will put them in the right places, all you need to do is to compile the WebGL example using Unity.

## Using the Tweed-Unity SDK connector

```js
npm install
```

```js
npm run deploy
```

Open the unity example from: ./unity/example
Compile to WebGL (file --> Build Settings... --> WebGL --> Build) to ./unity/deploy/tweed

run the BE:
```js
npm run backend
```

Run the FE:
```js
npm run frontend
```

Open the browser and hit http://localhost:5173/ to see the example running

## The Backend
The backend has two roles: 
1. To integrate the Tweed Backend SDK
2. To serve the Unity files 

There are 4 files that needs to be pulled by the frontend: 
loader - the code that pulls the other packages
framework - the unity wrapper 
wasm - the actual app
data - misc data that the app needs

## The frontend 
The frontend is a vite project that imports two js files:
1. unityPreloader.js - The file that fetches the unity files from the backend
2. TweedSDK.js - The file that setup the Tweed SDK and routes the calls from the unity to the SDK

## The Unity connector
The unity connector is build from two files: 
1. TweedSDK.jslib - The module that is forming the channel Unity -> Browser
2. TweedSDK.cs - The file that gives the Unity the Tweed functionality and gets the data from the browser (Browswer -> Unity)

The deploy.sh script will put the files in the right paths of the example.

# Architecture
[TweedSDK.cs] -> [TweedSDK.jslib] -> [TweedSDK.js]   
       [Unity]             [Unity-Browser]            [Browser]

More info here: https://docs.paytweed.com/unity-bridge/

