import type { ModelInputs, ModelOutput, YearData } from '../types/model';
import { formatDollars } from '../utils/formatters';

interface Props {
  output: ModelOutput;
  inputs: ModelInputs;
}

const HEADER_STYLE: React.CSSProperties = {
  padding: '8px 12px',
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  color: '#6B7280',
  background: '#F3F4F6',
  textAlign: 'right',
  whiteSpace: 'nowrap',
};

const CELL_STYLE: React.CSSProperties = {
  padding: '8px 12px',
  fontSize: 13,
  textAlign: 'right',
  whiteSpace: 'nowrap',
};

function formatSeatPrice(price: number): string {
  return `$${Math.round(price).toLocaleString()}`;
}

function formatSeats(seats: number): string {
  return Math.round(seats).toLocaleString();
}

export default function DetailedProjectionsTable({ output, inputs }: Props) {
  const p = inputs.perSeatPriceIncrease;
  const base0 = inputs.annualSeatPrice;

  const rows: Array<{ label: string; data: YearData; seatPrice: number }> = [
    { label: 'Base', data: output.base, seatPrice: base0 },
    { label: 'Y1',   data: output.y1,   seatPrice: base0 * Math.pow(1 + p, 1) },
    { label: 'Y2',   data: output.y2,   seatPrice: base0 * Math.pow(1 + p, 2) },
    { label: 'Y3',   data: output.y3,   seatPrice: base0 * Math.pow(1 + p, 3) },
    { label: 'Y4',   data: output.y4,   seatPrice: base0 * Math.pow(1 + p, 4) },
    { label: 'Y5',   data: output.y5,   seatPrice: base0 * Math.pow(1 + p, 5) },
  ];

  return (
    <div style={{ padding: '0 20px 28px' }}>
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: '#6B7280',
        marginBottom: 10,
      }}>
        Detailed Projections
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 13,
          border: '1px solid #E5E7EB',
          borderRadius: 8,
          overflow: 'hidden',
        }}>
          <thead>
            <tr>
              <th style={{ ...HEADER_STYLE, textAlign: 'left' }}>Year</th>
              <th style={HEADER_STYLE}>Seats</th>
              <th style={HEADER_STYLE}>$/Seat</th>
              <th style={{ ...HEADER_STYLE, color: '#6B9FD4' }}>Seat Rev</th>
              <th style={{ ...HEADER_STYLE, color: '#9B59B6' }}>Agent</th>
              <th style={{ ...HEADER_STYLE, color: '#27AE60' }}>Usage</th>
              <th style={{ ...HEADER_STYLE, color: '#F5A623' }}>Platform</th>
              <th style={{ ...HEADER_STYLE, color: '#E74C3C' }}>Outcome</th>
              <th style={{ ...HEADER_STYLE, color: '#111827' }}>Total</th>
              <th style={{ ...HEADER_STYLE, color: '#27AE60' }}>YoY %</th>
              <th style={{ ...HEADER_STYLE, color: '#8B5CF6' }}>Seat %</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ label, data, seatPrice }, i) => {
              const isBase = label === 'Base';
              const bg = i % 2 === 0 ? '#ffffff' : '#FAFAFA';

              const yoyDisplay = isBase || data.yoyGrowth === null
                ? '—'
                : `${data.yoyGrowth >= 0 ? '+' : ''}${data.yoyGrowth.toFixed(1)}%`;
              const yoyColor = isBase || data.yoyGrowth === null
                ? '#6B7280'
                : data.yoyGrowth >= 0 ? '#27AE60' : '#E74C3C';

              return (
                <tr key={label} style={{ background: bg }}>
                  <td style={{
                    ...CELL_STYLE,
                    textAlign: 'left',
                    fontWeight: 600,
                    color: '#111827',
                    borderRight: '1px solid #E5E7EB',
                  }}>
                    {label}
                  </td>
                  <td style={{ ...CELL_STYLE, color: '#374151' }}>
                    {formatSeats(data.seats)}
                  </td>
                  <td style={{ ...CELL_STYLE, color: '#374151' }}>
                    {formatSeatPrice(seatPrice)}
                  </td>
                  <td style={{ ...CELL_STYLE, color: '#6B9FD4' }}>
                    {formatDollars(data.seatRevenue)}
                  </td>
                  <td style={{ ...CELL_STYLE, color: '#9B59B6' }}>
                    {isBase ? '—' : formatDollars(data.agentRevenue)}
                  </td>
                  <td style={{ ...CELL_STYLE, color: '#27AE60' }}>
                    {isBase ? '—' : formatDollars(data.consumptionRevenue)}
                  </td>
                  <td style={{ ...CELL_STYLE, color: '#F5A623' }}>
                    {isBase ? '—' : formatDollars(data.platformRevenue)}
                  </td>
                  <td style={{ ...CELL_STYLE, color: '#E74C3C' }}>
                    {isBase ? '—' : formatDollars(data.outcomeRevenue)}
                  </td>
                  <td style={{ ...CELL_STYLE, fontWeight: 700, color: '#111827', borderLeft: '1px solid #E5E7EB' }}>
                    {formatDollars(data.totalRevenue)}
                  </td>
                  <td style={{ ...CELL_STYLE, color: yoyColor, fontWeight: 500 }}>
                    {yoyDisplay}
                  </td>
                  <td style={{ ...CELL_STYLE, color: '#8B5CF6', fontWeight: 500 }}>
                    {isBase ? '100%' : `${Math.round(data.seatShare)}%`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
