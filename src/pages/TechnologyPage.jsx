
import SectionTitle from '../components/SectionTitle.jsx';
import { featureCards, metricBars } from '../data.js';

export default function TechnologyPage() {
  return (
    <div className="page-stack">
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
              <div key={card.title} className="info-card">
                <div className="icon-chip"><Icon size={22} /></div>
                <h3>{card.title}</h3>
                <p>{card.subtitle}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="split-grid">
        <div className="panel soft">
          <div className="small-label">Desired health metrics</div>
          <div className="stack-list">
            {metricBars.map((item) => (
              <div key={item.label}>
                <div className="metric-row"><span>{item.label}</span><span>{item.value}%</span></div>
                <div className="metric-track"><div className="metric-fill" style={{ width: `${item.value}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="small-label">How the system works</div>
          <div className="stack-list">
            <div className="soft-box">Sensors track steps, heart rate and stress levels in real time through the concealed core.</div>
            <div className="soft-box">Data syncs with the companion app, giving users access to health trends, goals and insights.</div>
            <div className="soft-box">Notifications can alert users to significant wellness changes while keeping the jewellery discreet and elegant.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
