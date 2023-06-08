#!/bin/bash

jslib=./tweed_assets/tweedJsSDK.jslib
cs=./tweed_assets/TweedUnityHandler.cs

unity_assets_path=./unity/example/Assets
unity_plugins_path=plugins
example_path=./unity/example.tgz

cat ./unity/example.tar.tgz* > $example_path
tar -xvf $example_path
cp $jslib ./example/Assets/plugins
cp $cs ./example/Assets
