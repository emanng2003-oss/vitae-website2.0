import { Download, X } from 'lucide-react';
import { useRef, useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import JewelleryPreview from '../components/JewelleryPreview.jsx';
import { gemOptions, productTypes } from '../data.js';
import { CustomiserProvider, useCustomiser } from '../components/CustomiserContext.jsx';

function downloadSvgScreenshot(svgElement, filename) {
  if (!svgElement) return;

  const clonedSvg = svgElement.cloneNode(true);
  clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clonedSvg.setAttribute('width', '520');
  clonedSvg.setAttribute('height', '380');

  const serializer = new XMLSerializer();
  const svgMarkup = serializer.serializeToString(clonedSvg);
  const svgBlob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#f8f4ec');
    gradient.addColorStop(1, '#efe7da');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255,255,255,0.82)';
    roundRect(ctx, 120, 90, 1360, 1020, 42);
    ctx.fill();

    ctx.strokeStyle = 'rgba(137,114,76,0.16)';
    ctx.lineWidth = 2;
    roundRect(ctx, 120, 90, 1360, 1020, 42);
    ctx.stroke();

    ctx.fillStyle = '#8a6528';
    ctx.font = '700 48px Georgia';
    ctx.fillText('VITAE', 180, 178);

    ctx.fillStyle = '#7f786c';
    ctx.font = '500 22px Inter, Arial, sans-serif';
    ctx.fillText('Custom Design Preview', 180, 220);

    ctx.fillStyle = '#6f675a';
    ctx.font = '500 18px Inter, Arial, sans-serif';
    ctx.fillText(filename.replace('.png', '').replace(/-/g, ' '), 180, 254);

    const stageX = 220;
    const stageY = 290;
    const stageW = 1160;
    const stageH = 680;

    const stageGradient = ctx.createLinearGradient(0, stageY, 0, stageY + stageH);
    stageGradient.addColorStop(0, '#ffffff');
    stageGradient.addColorStop(1, '#efede7');
    ctx.fillStyle = stageGradient;
    roundRect(ctx, stageX, stageY, stageW, stageH, 28);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 2;
    roundRect(ctx, stageX + 2, stageY + 2, stageW - 4, stageH - 4, 26);
    ctx.stroke();

    const scale = Math.min(stageW / 520, stageH / 380);
    const drawW = 520 * scale;
    const drawH = 380 * scale;
    const drawX = stageX + (stageW - drawW) / 2;
    const drawY = stageY + (stageH - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const pngUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(pngUrl);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  img.src = url;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function CustomiseInner() {
  const previewRef = useRef(null);
  const [saveMessage, setSaveMessage] = useState('');

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

  const handleSaveScreenshot = () => {
    const svg = previewRef.current?.querySelector('svg');
    const filename = `vitae-${productType}-design.png`;
    downloadSvgScreenshot(svg, filename);
    setSaveMessage('Screenshot downloaded.');
    window.setTimeout(() => setSaveMessage(''), 2200);
  };

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

        <div ref={previewRef}>
          <JewelleryPreview
            productType={productType}
            metal={metal}
            placements={placements}
            rotation={rotation}
            onCanvasClick={placeOrMoveGemAtAngle}
            dragGemId={dragGemId}
            setDragGemId={setDragGemId}
          />
        </div>

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
          <button className="full-light-btn" onClick={handleSaveScreenshot}>
            <Download size={16} />
            Save Design Screenshot
          </button>
          {saveMessage ? <div className="save-note">{saveMessage}</div> : null}
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
