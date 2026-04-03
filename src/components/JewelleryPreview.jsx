
import { useRef } from 'react';

export default function JewelleryPreview({
  productType = 'bracelet',
  metal = 'silver',
  placements = [],
  rotation = 0,
  onCanvasClick,
  dragGemId,
  setDragGemId,
}) {
  const svgRef = useRef(null);
  const metalStroke = metal === 'gold' ? '#b98b39' : metal === 'rose' ? '#b97b74' : '#a9afb8';
  const metalHighlight = metal === 'gold' ? '#f3d58c' : metal === 'rose' ? '#efb0a9' : '#f1f3f6';

  const geometry = {
    bracelet: { cx: 260, cy: 180, rx: 130, ry: 105, inner: 0.72, outer: 1.32, label: 'bracelet' },
    necklace: { cx: 260, cy: 160, rx: 115, ry: 125, inner: 0.8, outer: 1.28, label: 'necklace pendant' },
    ring: { cx: 260, cy: 185, rx: 92, ry: 92, inner: 0.72, outer: 1.28, label: 'ring' },
  }[productType];

  const getPieceAngle = (clientX, clientY) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 520;
    const y = ((clientY - rect.top) / rect.height) * 380;
    const { cx, cy, rx, ry, inner, outer } = geometry;
    const normalized = Math.sqrt(((x - cx) ** 2) / (rx ** 2) + ((y - cy) ** 2) / (ry ** 2));
    if (normalized < inner || normalized > outer) return null;
    const rawAngle = Math.atan2((y - cy) / ry, (x - cx) / rx);
    const angleDeg = (rawAngle * 180) / Math.PI;
    return angleDeg - rotation;
  };

  const handleSvgClick = (e) => {
    if (!onCanvasClick || dragGemId) return;
    const angle = getPieceAngle(e.clientX, e.clientY);
    if (angle == null) return;
    onCanvasClick(angle);
  };

  const startDrag = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    setDragGemId?.(id);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragGemId || !onCanvasClick) return;
    const angle = getPieceAngle(e.clientX, e.clientY);
    if (angle == null) return;
    onCanvasClick(angle, dragGemId, true);
  };

  const stopDrag = () => {
    if (dragGemId != null) setDragGemId?.(null);
  };

  const getPlacementXY = (angleDeg) => {
    const angle = (angleDeg * Math.PI) / 180;
    if (productType === 'bracelet') return { x: 260 + 130 * Math.cos(angle), y: 180 + 105 * Math.sin(angle) };
    if (productType === 'necklace') return { x: 260 + 115 * Math.cos(angle), y: 160 + 125 * Math.sin(angle) };
    return { x: 260 + 92 * Math.cos(angle), y: 185 + 92 * Math.sin(angle) };
  };

  return (
    <div className="preview-card">
      <div className="preview-topline">
        <span>Live preview</span>
        <span>{metal === 'silver' ? 'Sterling Silver' : metal === 'gold' ? 'Gold Line-up' : 'Rose Gold'}</span>
      </div>
      <div className="preview-help">
        Click on the {geometry.label} to place a gemstone. Drag an existing gemstone to reposition it.
      </div>
      <div className="preview-stage">
        <svg
          ref={svgRef}
          viewBox="0 0 520 380"
          className="preview-svg"
          onClick={handleSvgClick}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onPointerLeave={stopDrag}
        >
          <defs>
            <linearGradient id="metalGrad" x1="0" x2="1">
              <stop offset="0%" stopColor={metalHighlight} />
              <stop offset="45%" stopColor={metalStroke} />
              <stop offset="100%" stopColor={metalHighlight} />
            </linearGradient>
            <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="rgba(0,0,0,0.22)" />
            </filter>
          </defs>
          <ellipse cx="260" cy="320" rx="150" ry="18" fill="rgba(0,0,0,0.08)" />

          {productType === 'bracelet' && (
            <g transform={`rotate(${rotation} 260 180)`} filter="url(#shadow)">
              <path d="M110 185 C115 110, 190 70, 260 70 C330 70, 405 110, 410 185" fill="none" stroke="url(#metalGrad)" strokeWidth="34" strokeLinecap="round" />
              <path d="M110 185 C115 245, 170 282, 235 290" fill="none" stroke="url(#metalGrad)" strokeWidth="34" strokeLinecap="round" />
              <path d="M285 290 C350 282, 405 245, 410 185" fill="none" stroke="url(#metalGrad)" strokeWidth="34" strokeLinecap="round" />
              <rect x="237" y="272" width="46" height="22" rx="11" fill="#101114" />
              {placements.map((p) => {
                const pos = getPlacementXY(p.angle);
                return (
                  <g key={p.id} onPointerDown={(e) => startDrag(e, p.id)} className="gem-pointer">
                    <circle cx={pos.x} cy={pos.y} r={p.size + 5} fill={metalHighlight} opacity="0.96" />
                    <circle cx={pos.x} cy={pos.y} r={p.size} fill={p.color} />
                    <circle cx={pos.x - p.size / 3} cy={pos.y - p.size / 3} r={Math.max(2, p.size / 3.5)} fill="rgba(255,255,255,0.55)" />
                  </g>
                );
              })}
            </g>
          )}

          {productType === 'necklace' && (
            <g transform={`rotate(${rotation} 260 160)`} filter="url(#shadow)">
              <path d="M150 60 C175 120, 205 165, 245 210" fill="none" stroke="url(#metalGrad)" strokeWidth="8" strokeLinecap="round" />
              <path d="M370 60 C345 120, 315 165, 275 210" fill="none" stroke="url(#metalGrad)" strokeWidth="8" strokeLinecap="round" />
              <path d="M260 105 C212 105, 175 140, 175 190 C175 250, 220 295, 260 326 C300 295, 345 250, 345 190 C345 140, 308 105, 260 105 Z" fill="url(#metalGrad)" opacity="0.95" />
              <path d="M260 133 C227 133, 203 158, 203 193 C203 236, 233 268, 260 290 C287 268, 317 236, 317 193 C317 158, 293 133, 260 133 Z" fill="#101114" />
              <rect x="242" y="279" width="36" height="16" rx="8" fill="#17181c" opacity="0.95" />
              {placements.map((p) => {
                const pos = getPlacementXY(p.angle);
                return (
                  <g key={p.id} onPointerDown={(e) => startDrag(e, p.id)} className="gem-pointer">
                    <circle cx={pos.x} cy={pos.y} r={p.size + 4} fill={metalHighlight} opacity="0.96" />
                    <circle cx={pos.x} cy={pos.y} r={p.size} fill={p.color} />
                    <circle cx={pos.x - p.size / 3} cy={pos.y - p.size / 3} r={Math.max(2, p.size / 3.5)} fill="rgba(255,255,255,0.55)" />
                  </g>
                );
              })}
            </g>
          )}

          {productType === 'ring' && (
            <g transform={`rotate(${rotation} 260 185)`} filter="url(#shadow)">
              <ellipse cx="260" cy="185" rx="92" ry="92" fill="none" stroke="url(#metalGrad)" strokeWidth="30" />
              <ellipse cx="260" cy="185" rx="50" ry="50" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="4" />
              <rect x="238" y="262" width="44" height="18" rx="9" fill="#101114" />
              {placements.map((p) => {
                const pos = getPlacementXY(p.angle);
                return (
                  <g key={p.id} onPointerDown={(e) => startDrag(e, p.id)} className="gem-pointer">
                    <circle cx={pos.x} cy={pos.y} r={p.size + 5} fill={metalHighlight} opacity="0.96" />
                    <circle cx={pos.x} cy={pos.y} r={p.size} fill={p.color} />
                    <circle cx={pos.x - p.size / 3} cy={pos.y - p.size / 3} r={Math.max(2, p.size / 3.5)} fill="rgba(255,255,255,0.55)" />
                  </g>
                );
              })}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
