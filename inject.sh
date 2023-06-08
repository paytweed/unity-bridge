#!/bin/bash

jslib=./tweed_assets/tweedJsSDK.jslib
cs=./tweed_assets/TweedUnityHandler.cs

unity_assets_path=./unity/example/Assets
unity_plugins_path=Plugins
example_path=./unity/example.tgz

cat example[a-z] > example.tgz
tar -xvf $example_path
cp $jslib "$unity_assets_path/$unity_plugins_path"
cp $cs $unity_assets_path
