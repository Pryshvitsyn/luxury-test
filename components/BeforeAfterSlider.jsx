
'use client';
import { useEffect, useRef, useState } from 'react';
export default function BeforeAfterSlider({ before, after, beforeAlt='Before image', afterAlt='After image', start=50, beforeLabel='BEFORE', afterLabel='AFTER' }) {
  const [value, setValue] = useState(start);
  const wrapRef = useRef(null);
  const rafRef = useRef(null);
  const pct = Math.max(0, Math.min(100, value));
  const updateFromPoint = (clientX) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const v = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.max(0, Math.min(100, v)));
  };
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onPointerDown = (e) => updateFromPoint(e.clientX);
    const onPointerMove = (e) => { if (e.buttons) { cancelAnimationFrame(rafRef.current); rafRef.current = requestAnimationFrame(() => updateFromPoint(e.clientX)); } };
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    return () => { el.removeEventListener('pointerdown', onPointerDown); el.removeEventListener('pointermove', onPointerMove); };
  }, []);
  return (<div ref={wrapRef} className="ba"><img className="ba-img" src={before} alt={beforeAlt} loading="lazy" /><div className="ba-after" style={{ width: `${pct}%` }}><img className="ba-img" src={after} alt={afterAlt} loading="lazy" /></div><div className="ba-line" style={{ left: `${pct}%` }} /><button className="ba-handle" style={{ left: `${pct}%` }} type="button" aria-label="Drag compare slider">↔</button><input className="ba-range" type="range" min="0" max="100" value={value} onChange={(e)=>setValue(Number(e.target.value))} aria-label="Before after range" /><span className="ba-chip left">{beforeLabel}</span><span className="ba-chip right">{afterLabel}</span></div>);
}
