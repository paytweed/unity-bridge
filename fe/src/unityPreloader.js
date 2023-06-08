var canvas = document.querySelector("#unity-canvas");
canvas.style.width = "99vw";
canvas.style.height = "99vh";

var buildUrl = "http://127.0.0.1:3010/unity";
var loaderUrl = buildUrl + "/loader";

var config = {
  dataUrl: buildUrl + "/data",
  frameworkUrl: buildUrl + "/framework",
  codeUrl: buildUrl + "/wasm",
};

var _unityInstance;
var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () =>
  createUnityInstance(canvas, config).then((unityInstance) => {
    _unityInstance = unityInstance;
    console.log(_unityInstance);
  });
document.body.appendChild(script);

function getUnityInstance() {
  return _unityInstance;
}

window.getUnityInstance = getUnityInstance;
