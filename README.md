# Tweed SDK Unity Example

The files for the bridge can be found under the tweed_assets folder. 
the deploy.sh script will put them in the right places, all you need to do is to compile the WebGL example.

## Using the Tweed-Unity SDK connector

```js
npm install
```

```js
npm deploy
```

Now compile your webGL to ./deploy/tweed


run the BE:
```js
npm run backend
```

Run the FE:
```js
npm run frontend
```

In your browser go to http://localhost:5173/ to see the example

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
2. tweedIntegration.js - The file that setup the Tweed SDK and routes the calls from the unity to the SDK

## The Unity connector
The unity connector is build from two files: 
1. tweedJsSDK.jslib - The module that is forming the channel Unity -> Browser
2. TweedUnityHandler.cs - The file that gives the Unity the Tweed functionality and gets the data from the browser (Browswer -> Unity)

The deploy.sh script will put the files in the right paths of the example.

# Architecture
[TweedUnityHandler.cs] -> [tweedJsSDK.jslib] -> [tweedIntegration.js]   
       [Unity]             [Unity-Browser]            [Browser]

More info here: 
https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html
https://docs.unity3d.com/Packages/com.unity.industrial.forma@3.0/manual/forma-js-api-devGuide.html


