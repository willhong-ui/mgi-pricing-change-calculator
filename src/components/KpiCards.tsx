import type { ModelInputs, ModelOutput } from '../types/model';
import { formatDollars, formatPercent } from '../utils/formatters';

interface KpiCardsProps {
  inputs: ModelInputs;
  output: ModelOutput;
}

function Card({ label, value, valueColor, subtitle }: {
  label: string;
  value: string;
  valueColor: string;
  subtitle?: string;
}) {
  return (
    <div style={{
      flex: 1,
      background: '#F8F9FA',
      border: '1px solid #E5E7EB',
      borderRadius: 10,
      padding: '16px 20px',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, color: valueColor, lineHeight: 1.1 }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

export default function KpiCards({ inputs, output }: KpiCardsProps) {
  const { base, y5, cagr } = output;

  const baseRev = base.totalRevenue;
  const y5Rev = y5.totalRevenue;
  const delta = ((y5Rev - baseRev) / baseRev) * 100;
  const cagrPct = cagr * 100;
  const seatShareY5 = y5.seatShare;
  const seatErosion = ((y5.seats - inputs.startingSeats) / inputs.startingSeats) * 100;

  return (
    <div style={{ display: 'flex', gap: 12, padding: '16px 24px', borderBottom: '1px solid #E5E7EB', background: '#fff' }}>
      <Card
        label="Base Revenue"
        value={formatDollars(baseRev)}
        valueColor="#3B5EA6"
        subtitle={`${inputs.startingSeats.toLocaleString()} seats × $${inputs.annualSeatPrice.toLocaleString()}/yr`}
      />
      <Card
        label="Year 5 Revenue"
        value={formatDollars(y5Rev)}
        valueColor={delta >= 0 ? '#27AE60' : '#E74C3C'}
        subtitle={`${delta >= 0 ? '▲' : '▼'} ${Math.abs(delta).toFixed(1)}% vs base`}
      />
      <Card
        label="5-Year CAGR"
        value={`${cagrPct >= 0 ? '' : ''}${formatPercent(cagrPct)}`}
        valueColor={cagrPct >= 0 ? '#27AE60' : '#E74C3C'}
      />
      <Card
        label="Seat Share Y5"
        value={`${Math.round(seatShareY5)}%`}
        valueColor="#8B5CF6"
        subtitle={`was 100% · seats ${seatErosion >= 0 ? '+' : ''}${seatErosion.toFixed(1)}%`}
      />
    </div>
  );
}
