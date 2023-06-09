#!/bin/bash

jslib=./tweed_assets/TweedSDK.jslib
cs=./tweed_assets/TweedSDK.cs
js=./tweed_assets/TweedSDK.js

unity_assets_path=./unity/example/Assets
unity_plugins_path=plugins
fe_assets_path=./fe/src
example_path=./unity/example.tgz
unity_main_path=./unity

cat ./unity/example.tar.bz2* > $example_path
tar -xvf $example_path -C $unity_main_path
cp $jslib "$unity_assets_path/$unity_plugins_path"
cp $cs $unity_assets_path
cp $js $fe_assets_path
rm -f ./unity/example.tgz
