// src/contexts/CropContext.tsx
import { createContext, useContext, useState  } from "react";
import type {ReactNode} from "react";
interface Crop {
  symbol: string;
  name: string;
}

interface CropContextType {
  crops: Crop[];
  selectedCrop: Crop;
  setSelectedCrop: (crop: Crop) => void;
}

const CropContext = createContext<CropContextType | undefined>(undefined);

const cropList: Crop[] = [
  { symbol: "SOYBEAN", name: "Soybean" },
  { symbol: "MUSTARD", name: "Mustard (RMSEED)" },
  { symbol: "GROUNDNUT", name: "Groundnut" },
  { symbol: "SUNFLOWER", name: "Sunflower" },
  { symbol: "SESAME", name: "Sesame" }
];

export function CropProvider({ children }: { children: ReactNode }) {
  const [selectedCrop, setSelectedCrop] = useState<Crop>(cropList[1]); // default Mustard

  return (
    <CropContext.Provider value={{ crops: cropList, selectedCrop, setSelectedCrop }}>
      {children}
    </CropContext.Provider>
  );
}

export const useCrop = () => {
  const ctx = useContext(CropContext);
  if (!ctx) throw new Error("useCrop must be used inside CropProvider");
  return ctx;
};
