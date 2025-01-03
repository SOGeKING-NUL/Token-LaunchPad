import { useState } from "react";

export function LaunchPad() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    imageURL: "",
    initialSupply: "",
  });

  const createToken = () => {
    const { name, symbol, imageURL, initialSupply } = formData;
    console.log("Token Data:", { name, symbol, imageURL, initialSupply });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
      }}
    >
      <h2>SOLANA TOKEN PAUNCHPAD</h2>
      <input
        className="inputText"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="name"
      ></input>
      <br />
      <input
        className="inputText"
        type="text"
        name="symbol"
        value={formData.symbol}
        onChange={handleChange}
        placeholder="symbol"
      ></input>
      <br />
      <input
        className="inputText"
        type="text"
        name="imageURL"
        value={formData.imageURL}
        onChange={handleChange}
        placeholder="image URL"
      ></input>
      <br />
      <input
        className="inputText"
        type="text"
        name="initialSupply"
        value={formData.initialSupply}
        onChange={handleChange}
        placeholder="Initial Supply"
      ></input>
      <br />
      <br />
      <button onClick={createToken}>CRETAE TOKEN</button>
      <br />
    </div>
  );
}
