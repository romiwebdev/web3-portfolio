import { useEffect, useState } from "react";
import { ethers } from "ethers";

const contractAddress = "0x39B54E194772BF4AF5ff7a973B6AbBDEf0610a75";
const abi = [
  "function message() view returns (string)",
  "function updateMessage(string memory newMessage) public",
];

export default function Web3App() {
  const [msg, setMsg] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const prov = new ethers.BrowserProvider(window.ethereum);
      setProvider(prov);
      prov.getSigner().then((signer) => {
        const contractInstance = new ethers.Contract(contractAddress, abi, signer);
        setContract(contractInstance);
        loadMessage(contractInstance);
      });
    } else {
      alert("MetaMask not detected");
    }
  }, []);

  async function loadMessage(contract) {
    const message = await contract.message();
    setMsg(message);
  }

  async function update() {
    const tx = await contract.updateMessage(newMsg);
    await tx.wait();
    loadMessage(contract);
    setNewMsg("");
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>🦊 Web3 Message Viewer</h1>
      <p><b>Current message:</b> {msg}</p>

      <input
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        placeholder="New message"
        style={{ padding: 10, width: "60%", marginRight: 10 }}
      />
      <button onClick={update}>Update Message</button>
    </div>
  );
}
