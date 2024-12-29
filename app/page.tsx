"use client";
import React, { useEffect, useState } from "react";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
};

export default function BAWSAQPage() {
  const [activeTab, setActiveTab] = useState<"markets" | "tokenomics" | "disclaimer">("markets");
  const [topCoins, setTopCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchTopCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data: Coin[] = await response.json();
        setTopCoins(data);
      } catch (error) {
        console.error("Error fetching coins data:", error);
      }
    };

    fetchTopCoins();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-[1024px] bg-green-500 rounded-lg shadow-xl overflow-hidden">
        <header className="bg-lime-700 text-center p-4">
          <h1 className="text-4xl font-bold">BALLSACK</h1>
          <p className="text-sm">Dealing in Life&apos;s Ups and Downs</p>
        </header>

        <nav className="bg-green-800 flex justify-between items-center p-2 px-4">
          <div className="flex space-x-6">
            <button
              className={`text-sm font-semibold ${
                activeTab === "markets" ? "text-white" : "hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("markets")}
            >
              Markets
            </button>
            <button
              className={`text-sm font-semibold ${
                activeTab === "tokenomics" ? "text-white" : "hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("tokenomics")}
            >
              Tokenomics
            </button>
            <button
              className={`text-sm font-semibold ${
                activeTab === "disclaimer" ? "text-white" : "hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("disclaimer")}
            >
              Disclaimer
            </button>
          </div>
          <div className="text-sm">My Cash: $3085</div>
        </nav>

        <main className="p-4 text-white">
          {activeTab === "markets" && (
            <div className="bg-stone-800 p-4 rounded-lg shadow-lg">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-green-500 p-2">Ticker</th>
                    <th className="border-b border-green-500 p-2">Name</th>
                    <th className="border-b border-green-500 p-2">Price (USD)</th>
                    <th className="border-b border-green-500 p-2">Market Cap</th>
                    <th className="border-b border-green-500 p-2">% Change</th>
                  </tr>
                </thead>
                <tbody>
                  {topCoins.length > 0 ? (
                    topCoins.map((coin) => (
                      <tr
                        key={coin.id}
                        className="hover:bg-green-800 transition-all cursor-pointer"
                      >
                        <td className="border-b border-green-500 p-2">{coin.symbol.toUpperCase()}</td>
                        <td className="border-b border-green-500 p-2">{coin.name}</td>
                        <td className="border-b border-green-500 p-2">${coin.current_price.toFixed(2)}</td>
                        <td className="border-b border-green-500 p-2">
                          ${coin.market_cap.toLocaleString()}
                        </td>
                        <td
                          className={`border-b border-green-500 p-2 ${
                            coin.price_change_percentage_24h > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center p-4 border-b border-green-500">
                        Loading data...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "tokenomics" && (
            <div className="bg-green-700 p-4 rounded-lg shadow-lg">
              <p>Tokenomics Content Here</p>
            </div>
          )}

          {activeTab === "disclaimer" && (
            <div className="bg-green-700 p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
              <p className="text-sm leading-relaxed">
                The information provided on this platform is for educational purposes only. Please don&apos;t invest more than you can afford to lose.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
