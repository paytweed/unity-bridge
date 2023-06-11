var canvas = document.querySelector("#unity-canvas");
canvas.style.width = "100%";
canvas.style.height = "100%";

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
    if (!_unityInstance) {
      const errMsg = document.createElement("p");
      errMsg.textContent =
        "Could not create Unity Instance, you should probably run npm deploy and compile your WebGL content";
      errMsg.style.zIndex = "1000";
      errMsg.style.color = "#FF9494";
      errMsg.style.fontSize = "20px";
      errMsg.style.margin = "0px";
      errMsg.style.position = "fixed";
      errMsg.style.bottom = "30px";
      errMsg.style.left = "30px";

      document.body.appendChild(errMsg);
      console.log(
        "Could not create Unity Instance, you should probably run npm deploy and compile your WebGL content"
      );
    }
  });
document.body.appendChild(script);

function getUnityInstance() {
  return _unityInstance;
}

window.getUnityInstance = getUnityInstance;
