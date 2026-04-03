
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle.jsx';
import JewelleryPreview from '../components/JewelleryPreview.jsx';
import { featureCards, formFactors } from '../data.js';
import { CustomiserProvider, useCustomiser } from '../components/CustomiserContext.jsx';

function HomeInner() {
  const { productType, metal, placements, rotation, placeOrMoveGemAtAngle, dragGemId, setDragGemId } = useCustomiser();

  return (
    <div className="page-stack">
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="capsule">The Magnetic Smart Core System</div>
          <div className="hero-small">One Core. Designed for Every Moment.</div>
          <h1>One Core. <br /> Endless Expression.</h1>
          <p>
            Redefining accessible luxury by integrating advanced biometric tracking into premium,
            interchangeable jewellery bases. Wellness, style and customisation come together in one seamless wearable.
          </p>

          <div className="hero-stats">
            <div className="stat-pill">
              <div className="stat-value">91.1%</div>
              <div className="stat-label">Prefer Bracelet</div>
            </div>
            <div className="stat-pill">
              <div className="stat-value">3</div>
              <div className="stat-label">Interchangeable Forms</div>
            </div>
            <div className="stat-pill">
              <div className="stat-value">S$449</div>
              <div className="stat-label">Starter Kit</div>
            </div>
          </div>

          <div className="button-row">
            <Link to="/customise" className="primary-btn">Start Customising <ArrowRight size={16} /></Link>
            <Link to="/design" className="secondary-btn">Explore Collection</Link>
          </div>

          <div className="mini-card-grid">
            {[
              'Bracelet as flagship form factor',
              'Shared rechargeable core across bases',
              'Gemstone and metal customisation',
            ].map((item) => <div key={item} className="mini-card">{item}</div>)}
          </div>
        </div>

        <motion.div
          className="hero-preview-shell"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <JewelleryPreview
            productType={productType}
            metal={metal}
            placements={placements}
            rotation={rotation}
            onCanvasClick={placeOrMoveGemAtAngle}
            dragGemId={dragGemId}
            setDragGemId={setDragGemId}
          />
        </motion.div>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Technology"
          title="Intelligence, Concealed"
          text="The compact core is designed to support the health metrics most valued by survey respondents: activity and steps, stress level, and heart rate monitoring."
        />
        <div className="card-grid four">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} whileHover={{ y: -6 }} className="info-card">
                <div className="icon-chip"><Icon size={22} /></div>
                <h3>{card.title}</h3>
                <p>{card.subtitle}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="page-section">
        <SectionTitle
          eyebrow="Style & Design"
          title="Versatile, Elegant, Adaptable to Your Style"
          text="A single intelligent core powers an interchangeable jewellery collection, moving effortlessly from bracelet to necklace to ring depending on the moment."
        />
        <div className="card-grid three">
          {formFactors.map((item) => (
            <div key={item.name} className="info-card">
              <div className="small-label">Preferred form</div>
              <div className="display-name">{item.name}</div>
              <div className="display-pct">{item.pct}</div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <div className="small-label">Customisation</div>
          <h3>Build your own VITAE piece</h3>
          <p>
            Inspired by the customiser concept, this experience lets customers choose a bracelet,
            necklace or ring, then personalise metal, gemstones, engraving and arrangement before checkout.
          </p>
          <Link to="/customise" className="primary-btn">Open Customiser <ArrowRight size={16} /></Link>
        </div>
        <div className="card-grid two">
          {[
            'Choose silver, gold or rose gold finishes',
            'Add included or premium gemstone accents',
            'Preview bracelet look live before checkout',
            'Personalise with engraving for gifting',
          ].map((item) => <div key={item} className="mini-card">{item}</div>)}
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <CustomiserProvider>
      <HomeInner />
    </CustomiserProvider>
  );
}
