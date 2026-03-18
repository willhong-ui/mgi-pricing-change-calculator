interface HeaderProps {
  onExportCSV: () => void;
  onExportJSON: () => void;
}

export default function Header({ onExportCSV, onExportJSON }: HeaderProps) {
  return (
    <div style={{
      padding: '20px 24px 16px',
      borderBottom: '1px solid #E5E7EB',
      background: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B5EA6' }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280' }}>
            Maxio · Pricing Migration Model
          </span>
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#111827', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
          SaaS Revenue Architecture Migration
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: '#6B7280' }}>
          Model the transition from seat-based to hybrid pricing: seats + agent workflows + consumption + platform fees + outcome-based.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 4, flexShrink: 0 }}>
        <button
          onClick={onExportCSV}
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: '1.5px solid #D1D5DB',
            background: '#fff',
            color: '#374151',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Export CSV
        </button>
        <button
          onClick={onExportJSON}
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: '1.5px solid #D1D5DB',
            background: '#fff',
            color: '#374151',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Export JSON
        </button>
      </div>
    </div>
  );
}
