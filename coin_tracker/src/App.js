import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setterCoins] = useState([]);
  const [money, setterMoney] = useState(0);
  const [selectedCoin, setterSelectedCoin] = useState("");
  const setMoney = (event) => setterMoney(event.target.value);
  const selectCoin = (event) => setterSelectedCoin(event.target.value);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setterCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : null}
      <select onChange={selectCoin}>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.quotes.USD.price}>
            {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
          </option>
        ))}
      </select>
      <h2> USD & Selected Coin Converter</h2>
      <label htmlFor="usd"> You have $</label>
      <input id="usd" type="number" value={money} onChange={setMoney} />{" "}
      <label htmlFor="usd">USD.</label>
      <h3>{`You can buy ${money / parseInt(selectedCoin)} coins`}</h3>
    </div>
  );
}
export default App;
