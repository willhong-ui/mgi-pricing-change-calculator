import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { ModelOutput } from '../types/model';

interface Props {
  output: ModelOutput;
}

function buildData(output: ModelOutput) {
  const years = ['y1', 'y2', 'y3', 'y4', 'y5'] as const;
  const labels = ['Y1', 'Y2', 'Y3', 'Y4', 'Y5'];
  return years.map((k, i) => {
    const d = output[k];
    return {
      year: labels[i],
      'Revenue Growth %': d.yoyGrowth !== null ? parseFloat(d.yoyGrowth.toFixed(2)) : 0,
      'Seats (K)': parseFloat((d.seats / 1000).toFixed(2)),
    };
  });
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 6, color: '#111827' }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, color: p.color, marginBottom: 2 }}>
          <span>{p.name === 'Revenue Growth %' ? 'Revenue Growth' : 'Seats'}</span>
          <span style={{ fontWeight: 600 }}>
            {p.name === 'Revenue Growth %' ? `${p.value.toFixed(1)}%` : `${p.value.toFixed(1)}K`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function GrowthSeatsChart({ output }: Props) {
  const data = buildData(output);
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 12 }}>
        YoY Revenue Growth &amp; Seat Count Trajectory
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart data={data} margin={{ top: 10, right: 50, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6B7280' }} />
          <YAxis
            yAxisId="left"
            tickFormatter={v => `${v.toFixed(0)}%`}
            tick={{ fontSize: 11, fill: '#6B7280' }}
            width={50}
            label={{ value: 'Growth %', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#6B7280' }, offset: 10 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={v => `${v.toFixed(0)}K`}
            tick={{ fontSize: 11, fill: '#6B7280' }}
            width={44}
            label={{ value: 'Seats (K)', angle: 90, position: 'insideRight', style: { fontSize: 10, fill: '#6B7280' }, offset: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 4 }} />
          <Bar yAxisId="left" dataKey="Revenue Growth %" fill="#6B9FD4" opacity={0.85} radius={[3, 3, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="Seats (K)" stroke="#E74C3C" strokeWidth={2.5} dot={{ r: 4, fill: '#E74C3C', strokeWidth: 0 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
