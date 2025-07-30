

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const WLD_ADDRESS = "0x2cFc85d8E48F8EAB294be644d9E25C3030863003";
const WLD_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

export default function Home() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState('0.00');
  const [leche, setLeche] = useState(0);
  const [quesoTotal, setQuesoTotal] = useState(0);
  const [quesoAcumulado, setQuesoAcumulado] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [wldEarned, setWLDEarned] = useState(0);

  const wldOptions = [0.15, 0.25, 1, 3, 5, 10, 25, 50];
  const milkByWLD = {
    0.15: 17,
    0.25: 29,
    1: 119,
    3: 357,
    5: 595,
    10: 1190,
    25: 2975,
    50: 5950,
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Instalá una wallet como MetaMask o World App');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(WLD_ADDRESS, WLD_ABI, signer);
    const raw = await contract.balanceOf(accounts[0]);
    const decimals = await contract.decimals();
    const formatted = Number(ethers.utils.formatUnits(raw, decimals)).toFixed(2);
    setAddress(accounts[0]);
    setBalance(formatted);
  };

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
  };

  const handleBuy = () => {
    const lecheGanada = milkByWLD[selectedAmount];
    setLeche(prev => prev + lecheGanada);
    alert(`Compraste ${selectedAmount} WLD y recibiste ${lecheGanada} leche`);
  };

  const handleFermentar = () => {
    setQuesoTotal(prev => prev + quesoAcumulado);
    setQuesoAcumulado(0);
  };

  const handleSellCheese = () => {
    const reward = quesoTotal * 0.002; // 0.002 WLD por queso
    setWLDEarned(prev => prev + reward);
    setQuesoTotal(0);
    alert(`Vendiste tu queso y ganaste ${reward.toFixed(4)} WLD`);
  };

  // Acumulación pasiva de queso
  useEffect(() => {
    const interval = setInterval(() => {
      setQuesoAcumulado(prev => prev + leche * 0.0005);
    }, 1000);
    return () => clearInterval(interval);
  }, [leche]);

  return (
    <div style={{
      fontFamily: 'sans-serif',
      backgroundColor: '#fefae0',
      color: '#333',
      padding: '20px',
      maxWidth: '480px',
      margin: '0 auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold' }}>Chesse Farm</div>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Balance WLD: {balance}</div>
      </div>

      {!address && (
        <button onClick={connectWallet} style={{ marginTop: '10px', padding: '10px', background: '#23b29c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Conectar Wallet
        </button>
      )}

      <div style={{ display: 'flex', marginTop: '16px', gap: '10px' }}>
        <div style={{ flex: 1, backgroundColor: '#dff6f0', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
          <div role="img" aria-label="leche" style={{ fontSize: '24px' }}>🥛</div>
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Leche: {leche}</div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#fde9b2', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
          <div role="img" aria-label="queso" style={{ fontSize: '24px' }}>🧀</div>
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Queso: {quesoTotal.toFixed(2)}</div>
        </div>
      </div>

      <div style={{
        backgroundColor: '#fff7dd',
        padding: '12px',
        borderRadius: '8px',
        marginTop: '12px',
        marginBottom: '12px',
        fontWeight: 'bold'
      }}>
        🧀 Queso acumulado: {quesoAcumulado.toFixed(4)}
        <br />
        <button onClick={handleFermentar} style={{ marginTop: '8px', padding: '8px', background: '#f7b733', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          Fermentar
        </button>
      </div>

      <div style={{
        backgroundColor: '#fff0e0',
        padding: '12px',
        borderRadius: '8px',
        fontWeight: 'bold',
        marginBottom: '12px'
      }}>
        💰 WLD por venta de queso: {(quesoTotal * 0.002).toFixed(4)} WLD
        <br />
        <button
          onClick={handleSellCheese}
          disabled={quesoTotal <= 0}
          style={{
            marginTop: '8px',
            padding: '8px',
            background: quesoTotal > 0 ? '#ff914d' : '#ccc',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: quesoTotal > 0 ? 'pointer' : 'not-allowed'
          }}
        >
          Vender Queso
        </button>
      </div>

      <h3 style={{ marginTop: '20px' }}>🛒 Comprar Leche</h3>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
        {wldOptions.map((amount) => (
          <button
            key={amount}
            onClick={() => handleSelectAmount(amount)}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: selectedAmount === amount ? '#3fd0b3' : '#f4e4c3',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {amount} WLD
          </button>
        ))}
      </div>

      <div style={{
        backgroundColor: '#fff7dd',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '12px',
        fontWeight: 'bold',
        color: '#0077cc'
      }}>
        ✨ Obtendrás: {milkByWLD[selectedAmount]} leche
      </div>

      <button
        onClick={handleBuy}
        style={{
          backgroundColor: '#23b29c',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '10px',
          fontWeight: 'bold',
          fontSize: '16px',
          width: '100%',
          marginBottom: '16px',
          cursor: 'pointer'
        }}
      >
        Comprar {selectedAmount} WLD
      </button>
    </div>
  );
}

