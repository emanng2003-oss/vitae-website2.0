
import { HeartPulse, ShieldCheck, Sparkles, Waves } from 'lucide-react';

export const gemOptions = [
  { id: 'amethyst', name: 'Amethyst', color: '#9b59b6', price: 0 },
  { id: 'rose-quartz', name: 'Rose Quartz', color: '#d98ca3', price: 0 },
  { id: 'emerald', name: 'Emerald', color: '#1f8b5f', price: 79 },
  { id: 'sapphire', name: 'Sapphire', color: '#2f5fb3', price: 89 },
  { id: 'ruby', name: 'Ruby', color: '#b13a52', price: 99 },
  { id: 'diamond', name: 'Diamond', color: '#d9dde8', price: 129 },
];

export const formFactors = [
  { name: 'Bracelet', pct: '91.1%', description: 'Flagship form factor with the most reliable skin contact for health tracking.' },
  { name: 'Necklace', pct: '46.7%', description: 'Alternative styling option for evening looks and occasion wear.' },
  { name: 'Ring', pct: '40%', description: 'Compact styling option with engraving and gemstone customisation.' },
];

export const featureCards = [
  { title: 'Heart rate monitoring', subtitle: 'Next-gen PPG sensor', icon: HeartPulse },
  { title: 'Stress & wellness sensors', subtitle: 'Biofeedback and stress detection', icon: Sparkles },
  { title: 'Activity & step tracking', subtitle: 'Accelerometer and pedometer', icon: Waves },
  { title: 'Water resistant', subtitle: 'IP68-ready concept with low-maintenance design', icon: ShieldCheck },
];

export const productTypes = [
  { id: 'bracelet', label: 'Bracelet' },
  { id: 'necklace', label: 'Necklace' },
  { id: 'ring', label: 'Ring' },
];

export const metricBars = [
  { label: 'Activity / Steps', value: 100 },
  { label: 'Stress level', value: 64.4 },
  { label: 'Heart rate', value: 64.4 },
  { label: 'Sleep tracker', value: 37.8 },
  { label: 'Temperature', value: 24.4 },
];
