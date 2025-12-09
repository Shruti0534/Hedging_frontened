import { createContext, useContext, useState } from "react";

export const MarketPriceContext = createContext<any>(null);

export function MarketPriceProvider({ children }: any) {
  const [prices, setPrices] = useState({}); // { MUSTARD: 6210, SOYBEAN: 5012 }

  return (
    <MarketPriceContext.Provider value={{ prices, setPrices }}>
      {children}
    </MarketPriceContext.Provider>
  );
}

export const useMarketPrices = () => useContext(MarketPriceContext);
