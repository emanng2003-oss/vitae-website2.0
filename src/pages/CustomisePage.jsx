
import { X } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import JewelleryPreview from '../components/JewelleryPreview.jsx';
import { gemOptions, productTypes } from '../data.js';
import { CustomiserProvider, useCustomiser } from '../components/CustomiserContext.jsx';

function CustomiseInner() {
  const {
    metal, setMetal,
    productType, resetForProduct,
    selectedGem, setSelectedGem,
    gemSize, setGemSize,
    rotation, setRotation,
    placements, setPlacements,
    engraving, setEngraving,
    dragGemId, setDragGemId,
    gemCounts, addPlacement, placeOrMoveGemAtAngle, removePlacement,
    pricing,
  } = useCustomiser();

  return (
    <div className="custom-grid">
      <div className="page-stack">
        <section className="page-section">
          <SectionTitle
            eyebrow="Customiser"
            title={`Design your own VITAE ${productType}`}
            text="This page reflects the elegant workshop feel of the original concept while keeping the build stable for Vercel deployment."
          />
        </section>

        <JewelleryPreview
          productType={productType}
          metal={metal}
          placements={placements}
          rotation={rotation}
          onCanvasClick={placeOrMoveGemAtAngle}
          dragGemId={dragGemId}
          setDragGemId={setDragGemId}
        />

        <div className="card-grid three">
          {gemCounts.length ? gemCounts.map(([name, count]) => (
            <div key={name} className="mini-card">
              <div className="small-label">Placed gemstone</div>
              <div className="mini-card-title">{name}</div>
              <div>{count} added</div>
            </div>
          )) : (
            <div className="mini-card span-3">No gemstones placed yet.</div>
          )}
        </div>
      </div>

      <div className="sidebar-stack">
        <div className="panel">
          <div className="small-label">1. Product type</div>
          <div className="button-grid three">
            {productTypes.map((option) => (
              <button key={option.id} className={`choice-btn ${productType === option.id ? 'active' : ''}`} onClick={() => resetForProduct(option.id)}>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="small-label">2. Metal finish</div>
          <div className="button-grid three">
            {[{ id: 'silver', label: 'Silver' }, { id: 'gold', label: 'Gold' }, { id: 'rose', label: 'Rose Gold' }].map((option) => (
              <button key={option.id} className={`choice-btn ${metal === option.id ? 'active' : ''}`} onClick={() => setMetal(option.id)}>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="small-label">3. Gemstone selection</div>
          <div className="gem-grid">
            {gemOptions.map((gem) => (
              <button key={gem.id} className={`gem-btn ${selectedGem.id === gem.id ? 'active' : ''}`} onClick={() => setSelectedGem(gem)}>
                <div className="gem-row">
                  <span className="gem-dot" style={{ backgroundColor: gem.color }} />
                  <span>{gem.name}</span>
                </div>
                <div className="gem-price">{gem.price === 0 ? 'Included' : `+S$${gem.price}`}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="small-label">4. Placement controls</div>
          <p className="tiny-copy">Use the mouse directly on the jewellery preview to place gemstones and drag them around the piece.</p>
          <div className="stack-list">
            <div>
              <div className="control-label">Gem size</div>
              <input type="range" min="6" max="16" step="1" value={gemSize} onChange={(e) => setGemSize(Number(e.target.value))} className="range-input" />
              <div className="helper-text">Current size: {gemSize}px</div>
            </div>
            <div>
              <div className="control-label">Piece rotation</div>
              <input type="range" min="-35" max="35" step="1" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="range-input" />
              <div className="helper-text">{rotation}°</div>
            </div>
            <div className="button-grid two">
              <button className="primary-dark" onClick={addPlacement}>Add {selectedGem.name}</button>
              <button className="secondary-soft" onClick={() => setPlacements([])}>Clear stones</button>
            </div>
            {placements.length ? (
              <div className="placed-list">
                {placements.map((item, index) => (
                  <div key={item.id} className="placed-item">
                    <div className="gem-row">
                      <span className="gem-dot" style={{ backgroundColor: item.color }} />
                      <span>{item.name} #{index + 1}</span>
                    </div>
                    <button className="ghost-icon" onClick={() => removePlacement(item.id)}><X size={16} /></button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="panel">
          <div className="small-label">5. Engraving</div>
          <textarea
            value={engraving}
            onChange={(e) => setEngraving(e.target.value.slice(0, 18))}
            rows={3}
            placeholder="Add initials or a short message"
            className="text-area"
          />
          <div className="helper-text">Up to 18 characters · +S$39</div>
        </div>

        <div className="panel dark">
          <div className="small-label light">Order summary</div>
          <div className="summary-list">
            <div><span>Starter Kit</span><span>S${pricing.basePrice}</span></div>
            <div><span>{productType === 'bracelet' ? 'Bracelet base' : productType === 'necklace' ? 'Necklace base' : 'Ring base'}</span><span>{pricing.additionalCasePrice ? `S$${pricing.additionalCasePrice}` : 'Included'}</span></div>
            <div><span>Metal upgrade</span><span>{pricing.goldTopUp ? `S$${pricing.goldTopUp}` : 'Included'}</span></div>
            <div><span>Gemstone add-ons</span><span>{pricing.gemstoneTotal ? `S$${pricing.gemstoneTotal}` : 'Included'}</span></div>
            <div><span>Engraving</span><span>{pricing.engravingPrice ? `S$${pricing.engravingPrice}` : '—'}</span></div>
            <div><span>Delivery</span><span>S${pricing.delivery}</span></div>
            <div className="divider" />
            <div className="summary-total"><span>Total</span><span>S${pricing.total}</span></div>
          </div>
          <button className="full-light-btn">Save Design</button>
        </div>
      </div>
    </div>
  );
}

export default function CustomisePage() {
  return (
    <CustomiserProvider>
      <CustomiseInner />
    </CustomiserProvider>
  );
}
