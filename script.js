if (typeof window.ethereum !== undefined && window.ethereum.isMetaMask) {
    console.log(`MetaMask is installed!`);
    const ethereumButton = document.querySelector(`.enableEthereumButton`);
    const showAccount = document.querySelector(`.showAccount`);
    const showChainID = document.querySelector(`.showChainID`);

    const changeChainIDButton = document.querySelector(`.changeChainIDButton`);
    let text_input_chainid = document.getElementById(`text_input_chainid`);
    changeChainIDButton.addEventListener(`click`, async () => { await window.ethereum.request({ method: `wallet_switchEthereumChain`, params: [{ chainId: `0x${Number(text_input_chainid.value).toString(16)}` }] }); await getAccount(); });

    ethereumButton.addEventListener(`click`, () => { getAccount(); });
    showAccount.innerHTML = `Connect <b>Wallet</b>`;

    async function getAccount() {
        const accounts = await window.ethereum.request({ method: `eth_requestAccounts` }).catch((err) => { if (err.code === 4001) { console.log(`Please connect to MetaMask.`); } else { console.error(err); } });
        const account = accounts[0];
        showAccount.innerHTML = `<b>Account:</b> <code>${account}</code>`;
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        showChainID.innerHTML = `<b>ChainID:</b> <code>${parseInt(chainId, 16)}</code>`;
    }

    const selectEthMainnet = document.querySelector(`.selectEthMainnet`);
    selectEthMainnet.addEventListener(`click`, async () => { await window.ethereum.request({ method: `wallet_switchEthereumChain`, params: [{ chainId: `0x1` }] }); await getAccount(); });

    const selectBnbTestnet = document.querySelector(`.selectBnbTestnet`);
    selectBnbTestnet.addEventListener(`click`, async () => { await window.ethereum.request({ method: `wallet_switchEthereumChain`, params: [{ chainId: `0x61` }] }); await getAccount(); });

    const selectPolygonMumbai = document.querySelector(`.selectPolygonMumbai`);
    selectPolygonMumbai.addEventListener(`click`, async () => { await window.ethereum.request({ method: `wallet_switchEthereumChain`, params: [{ chainId: `0x13881` }] }); await getAccount(); });
} else {
    console.log(`MetaMask not installed!`);
}
