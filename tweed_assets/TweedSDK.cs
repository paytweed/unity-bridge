using System;
using UnityEngine;
using UnityEngine.UI;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Threading;
using AOT;

public static class TweedSdkImports {
    [DllImport("__Internal")]
    public static extern string GetOrCreateWallet(string blockchainId);
    [DllImport("__Internal")]
    public static extern string ShowRecoveryPhrase();
    [DllImport("__Internal")]
    public static extern string CreateRecovery();
    [DllImport("__Internal")]
    public static extern string Logout();
    [DllImport("__Internal")]
    public static extern string BuyNft(string nftId);
    [DllImport("__Internal")]
    public static extern string ShowAddress();
    [DllImport("__Internal")]
    public static extern string SignMessage();
    [DllImport("__Internal")]
    public static extern string GetRecoveryStatus();
    [DllImport("__Internal")]
    public static extern string LoggedIn();
    [DllImport("__Internal")]
    public static extern string ReCreateWallet();
    [DllImport("__Internal")]
    public static extern string GetAddresses();
    [DllImport("__Internal")]
    public static extern string GetAddress();
}

public class TweedSDK : MonoBehaviour
{   
    void Start() {
        Debug.Log("Tweed script started");
        setUI();
        attachActionsToButtons();
    }

    void setUI(){
        // create wallet
        Button btnCreateWallet = getComponentByName<Button>("btnCreateWallet");
        Text txtButton = btnCreateWallet.GetComponentInChildren<Text>();
        txtButton.text = "Create Wallet";
        txtButton.fontSize = 20;

        Text txtAddress = getComponentByName<Text>("txtWalletAddress");
        txtAddress.text = "";
        txtAddress.fontSize = 25;

        // create recovery
        Button btnCreateRecovery = getComponentByName<Button>("btnCreateRecovery");
        Text txtCreateRecoveryButton = btnCreateRecovery.GetComponentInChildren<Text>();
        txtCreateRecoveryButton.text = "Create Recovery Kit";
        txtCreateRecoveryButton.fontSize = 20;

        // buy nft
        Button btnBuyNft = getComponentByName<Button>("btnBuyNft");
        Text txtBuyNftButton = btnBuyNft.GetComponentInChildren<Text>();
        txtBuyNftButton.text = "Buy NFT";
        txtBuyNftButton.fontSize = 20;

        // QR code
        Button btnShowQRCode = getComponentByName<Button>("btnShowQRCode");
        Text txtShowQRCodeButton = btnShowQRCode.GetComponentInChildren<Text>();
        txtShowQRCodeButton.text = "Show QR Code";
        txtShowQRCodeButton.fontSize = 20;

        // recovery phrase
        Button btnShowRecoveryPhrase = getComponentByName<Button>("btnShowRecoveryPhrase");
        Text txtShowRecoveryPhraseButton = btnShowRecoveryPhrase.GetComponentInChildren<Text>();
        txtShowRecoveryPhraseButton.text = "Show Recovery Phrase";
        txtShowRecoveryPhraseButton.fontSize = 20;
    }

    void attachActionsToButtons() {
        // create wallet
        Button btnCreateWallet = getComponentByName<Button>("btnCreateWallet");
        btnCreateWallet.onClick.AddListener(btnCreateWalletOnClick);

        // create recovery
        Button btnCreateRecovery = getComponentByName<Button>("btnCreateRecovery");
        btnCreateRecovery.onClick.AddListener(btnCreateRecoveryOnClick);

        // buy nft
        Button btnBuyNft = getComponentByName<Button>("btnBuyNft");
        btnBuyNft.onClick.AddListener(btnBuyNftOnClick);

        // QR code
        Button btnShowQRCode = getComponentByName<Button>("btnShowQRCode");
        btnShowQRCode.onClick.AddListener(btnShowQRCodeOnClick);

        // recovery phrase
        Button btnShowRecoveryPhrase = getComponentByName<Button>("btnShowRecoveryPhrase");
        btnShowRecoveryPhrase.onClick.AddListener(btnShowRecoveryPhraseOnClick);
    }

    T getComponentByName<T>(string name) {
        Canvas canvas = GetComponent<Canvas>();
        T[] components = canvas.GetComponentsInChildren<T>();

        for(int i = 0 ; i < components.Length ; ++i)
        {
            T comp = (T)(components[i]);
            PropertyInfo prop = comp.GetType().GetProperty("name");
            if(prop == null){
                Debug.Log("Could not find components");
                continue;
            }

            string value = (string)prop.GetValue(comp);
            if(value == name){
                return components[i];
            }
        }

        throw new Exception($"Component - {name} - Not Found");
    }

    void getOrCreateWallet_cb(string walletAddress) {
        Text inputFieldAddress = getComponentByName<Text>("txtWalletAddress");
        inputFieldAddress.text = walletAddress;
    }

    void getRecoveryStatus_cb(string recoveryStatus) {
        Debug.Log(recoveryStatus);
    }

    void loggedIn_cb(string isLoggedIn) {
        Debug.Log(isLoggedIn);
    }

    void getAddress_cb(string address) {
        Debug.Log(address);
    }

    void getAddresses_cb(string addresses) {
        Debug.Log(addresses);
    }

    void btnCreateWalletOnClick() {
        Debug.Log("Inside btnCreateWalletOnClick");
        TweedSdkImports.GetOrCreateWallet("ethereumGoerli");
        Debug.Log("after btnCreateWalletOnClick");
    }

    void btnBuyNftOnClick() {
        Debug.Log("Inside btnBuyNftOnClick");
        TweedSdkImports.BuyNft("1"); 
        Debug.Log("after btnBuyNftOnClick");
    }

    void btnCreateRecoveryOnClick() {
        Debug.Log("Inside btnCreateRecoveryOnClick");
        TweedSdkImports.CreateRecovery();
        Debug.Log("after btnCreateRecoveryOnClick");
    }

    void btnShowQRCodeOnClick() {
        Debug.Log("Inside btnShowQRCodeOnClick");
        TweedSdkImports.ShowAddress();
        Debug.Log("after btnShowQRCodeOnClick");
    }

    void btnShowRecoveryPhraseOnClick() {
         Debug.Log("Inside btnShowRecoveryPhraseOnClick");
        TweedSdkImports.ShowRecoveryPhrase();
        Debug.Log("after btnShowRecoveryPhraseOnClick");
    }
}
