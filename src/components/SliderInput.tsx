interface SliderInputProps {
  label: string;
  subtitle?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  color: string;
  onChange: (v: number) => void;
}

export default function SliderInput({
  label,
  subtitle,
  value,
  min,
  max,
  step,
  format,
  color,
  onChange,
}: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <div>
          <span style={{ fontSize: 13, color: '#111827', fontWeight: 400 }}>{label}</span>
          {subtitle && (
            <div style={{ fontSize: 11, color: '#9CA3AF', fontStyle: 'italic', lineHeight: 1.3 }}>
              {subtitle}
            </div>
          )}
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', marginLeft: 8 }}>
          {format(value)}
        </span>
      </div>
      <div style={{ position: 'relative', height: 20, display: 'flex', alignItems: 'center' }}>
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 4,
          borderRadius: 2,
          background: '#E5E7EB',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${pct}%`,
            height: '100%',
            background: color,
            borderRadius: 2,
          }} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            width: '100%',
            margin: 0,
            opacity: 0,
            height: 20,
            cursor: 'pointer',
          }}
        />
        {/* Thumb indicator */}
        <div style={{
          position: 'absolute',
          left: `calc(${pct}% - 8px)`,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: '#fff',
          border: `2px solid ${color}`,
          boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
          pointerEvents: 'none',
          transition: 'left 0ms',
        }} />
      </div>
    </div>
  );
}
