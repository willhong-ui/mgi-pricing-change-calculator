import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { ModelOutput } from '../types/model';

interface Props {
  output: ModelOutput;
}

const COLORS = {
  seats: '#6B9FD4',
  platform: '#F5A623',
  agent: '#9B59B6',
  consumption: '#27AE60',
  outcome: '#E74C3C',
};

function buildData(output: ModelOutput) {
  const years = ['base', 'y1', 'y2', 'y3', 'y4', 'y5'] as const;
  const labels = ['Base', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5'];
  return years.map((k, i) => {
    const d = output[k];
    const total = d.totalRevenue;
    const pct = (v: number) => total > 0 ? parseFloat(((v / total) * 100).toFixed(1)) : 0;
    return {
      year: labels[i],
      Seats: pct(d.seatRevenue),
      'Platform Fees': pct(d.platformRevenue),
      'Agent Workflows': pct(d.agentRevenue),
      Consumption: pct(d.consumptionRevenue),
      'Outcome-Based': pct(d.outcomeRevenue),
    };
  });
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 6, color: '#111827' }}>{label}</div>
      {[...payload].reverse().map(p => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, color: p.color, marginBottom: 2 }}>
          <span>{p.name}</span>
          <span style={{ fontWeight: 600 }}>{p.value.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
};

export default function RevenueMixChart({ output }: Props) {
  const data = buildData(output);
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 12 }}>
        Revenue Mix by Stream
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6B7280' }} />
          <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11, fill: '#6B7280' }} width={44} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 4 }} />
          <Bar dataKey="Seats" stackId="mix" fill={COLORS.seats} />
          <Bar dataKey="Platform Fees" stackId="mix" fill={COLORS.platform} />
          <Bar dataKey="Agent Workflows" stackId="mix" fill={COLORS.agent} />
          <Bar dataKey="Consumption" stackId="mix" fill={COLORS.consumption} />
          <Bar dataKey="Outcome-Based" stackId="mix" fill={COLORS.outcome} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
