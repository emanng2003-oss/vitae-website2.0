
import { createContext, useContext, useMemo, useState } from 'react';
import { gemOptions } from '../data.js';

const CustomiserContext = createContext(null);

export function CustomiserProvider({ children }) {
  const [metal, setMetal] = useState('silver');
  const [productType, setProductType] = useState('bracelet');
  const [selectedGem, setSelectedGem] = useState(gemOptions[0]);
  const [gemSize, setGemSize] = useState(10);
  const [rotation, setRotation] = useState(0);
  const [placements, setPlacements] = useState([
    { id: 1, angle: 225, color: gemOptions[0].color, size: 10, name: gemOptions[0].name },
    { id: 2, angle: 315, color: gemOptions[1].color, size: 10, name: gemOptions[1].name },
  ]);
  const [engraving, setEngraving] = useState('');
  const [dragGemId, setDragGemId] = useState(null);

  const basePrice = 449;
  const additionalCasePrice = productType === 'bracelet' ? 0 : 199;
  const goldTopUp = metal === 'gold' ? 150 : metal === 'rose' ? 120 : 0;
  const gemstoneTotal = placements.reduce((sum, p) => {
    const gem = gemOptions.find((g) => g.name === p.name);
    return sum + (gem?.price ?? 0);
  }, 0);
  const engravingPrice = engraving.trim() ? 39 : 0;
  const delivery = 20;
  const total = basePrice + additionalCasePrice + goldTopUp + gemstoneTotal + engravingPrice + delivery;

  const gemCounts = useMemo(() => {
    const counts = {};
    placements.forEach((p) => {
      counts[p.name] = (counts[p.name] || 0) + 1;
    });
    return Object.entries(counts);
  }, [placements]);

  const addPlacement = () => {
    if (placements.length >= 8) return;
    const nextAngle = 210 + placements.length * 18;
    setPlacements((prev) => [
      ...prev,
      { id: Date.now(), angle: nextAngle, color: selectedGem.color, size: gemSize, name: selectedGem.name },
    ]);
  };

  const placeOrMoveGemAtAngle = (angle, targetId = null, isDragging = false) => {
    const normalizedAngle = ((angle % 360) + 360) % 360;
    if (targetId) {
      setPlacements((prev) => prev.map((item) => item.id === targetId ? { ...item, angle: normalizedAngle } : item));
      return;
    }
    if (isDragging) return;
    setPlacements((prev) => {
      if (prev.length >= 8) return prev;
      return [
        ...prev,
        { id: Date.now() + Math.random(), angle: normalizedAngle, color: selectedGem.color, size: gemSize, name: selectedGem.name },
      ];
    });
  };

  const removePlacement = (id) => setPlacements((prev) => prev.filter((item) => item.id !== id));

  const resetForProduct = (id) => {
    setProductType(id);
    setPlacements([]);
    setRotation(0);
  };

  const value = {
    metal, setMetal,
    productType, setProductType, resetForProduct,
    selectedGem, setSelectedGem,
    gemSize, setGemSize,
    rotation, setRotation,
    placements, setPlacements,
    engraving, setEngraving,
    dragGemId, setDragGemId,
    gemCounts,
    addPlacement,
    placeOrMoveGemAtAngle,
    removePlacement,
    pricing: { basePrice, additionalCasePrice, goldTopUp, gemstoneTotal, engravingPrice, delivery, total },
  };

  return <CustomiserContext.Provider value={value}>{children}</CustomiserContext.Provider>;
}

export function useCustomiser() {
  const ctx = useContext(CustomiserContext);
  if (!ctx) throw new Error('useCustomiser must be used inside CustomiserProvider');
  return ctx;
}
