
import { Check, CircleDollarSign } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';

export default function PricingPage() {
  return (
    <div className="page-stack">
      <section className="page-section">
        <SectionTitle
          eyebrow="Pricing"
          title="Premium, but still designed for perceived value"
          text="The pricing strategy follows the slides: a bundled starter kit, premium upgrades through add-ons, and dynamic pricing for the gold line-up."
        />
      </section>

      <section className="split-grid">
        <div className="panel">
          <div className="panel-topline"><CircleDollarSign size={22} /> <span className="small-label">Price strategy</span></div>
          <div className="stack-list">
            <div className="soft-box"><strong>Starter Kit — S$449</strong><br />Includes 1 tracker core device, 1 jewellery base and the wireless charger.</div>
            <div className="soft-box"><strong>Additional case — S$199</strong><br />Extra bracelet, necklace or ring base without premium top-ups.</div>
            <div className="soft-box"><strong>Gold line-up — about S$100–S$150 top-up</strong><br />Dynamic pricing based on market gold price and material cost.</div>
            <div className="soft-box"><strong>Premium upgrades</strong><br />Engraving from S$39 and lab-grown gemstone accents from S$129+.</div>
          </div>
        </div>
        <div className="panel dark">
          <div className="small-label light">Why this works</div>
          <div className="stack-list light">
            <div className="check-line"><Check size={16} /> Bundle pricing creates higher perceived value and encourages first purchase.</div>
            <div className="check-line"><Check size={16} /> Add-on pricing increases customer lifetime value through gemstones, cases and premium materials.</div>
            <div className="check-line"><Check size={16} /> Market-skimming supports the luxury-tech positioning while helping recover development and production costs.</div>
            <div className="check-line"><Check size={16} /> Online orders include an additional S$20 delivery fee.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
