
import SectionTitle from '../components/SectionTitle.jsx';
import { formFactors } from '../data.js';

export default function DesignPage() {
  return (
    <div className="page-stack">
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

      <section className="card-grid three">
        <div className="info-card">
          <h3>Sterling silver base</h3>
          <p>All rings, bracelets and necklaces begin with a sterling silver foundation for an affordable yet premium look.</p>
        </div>
        <div className="info-card">
          <h3>Gemstone options</h3>
          <p>Customers can personalise with gemstone colours and premium accents, from included amethyst and rose quartz to higher-value gemstone upgrades.</p>
        </div>
        <div className="info-card">
          <h3>One shared core</h3>
          <p>The same rechargeable core works across the collection with a waterproof-friendly, low-maintenance concept and wireless charging.</p>
        </div>
      </section>
    </div>
  );
}
