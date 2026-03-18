import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { ModelOutput } from '../types/model';
import { formatDollarsAxis, formatDollars } from '../utils/formatters';

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
    return {
      year: labels[i],
      Seats: d.seatRevenue,
      'Platform Fees': d.platformRevenue,
      'Agent Workflows': d.agentRevenue,
      Consumption: d.consumptionRevenue,
      'Outcome-Based': d.outcomeRevenue,
      Total: d.totalRevenue,
    };
  });
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload) return null;
  const total = payload.reduce((s, p) => s + p.value, 0);
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 6, color: '#111827' }}>{label}</div>
      {[...payload].reverse().map(p => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, color: p.color, marginBottom: 2 }}>
          <span>{p.name}</span>
          <span style={{ fontWeight: 600 }}>{formatDollars(p.value)}</span>
        </div>
      ))}
      <div style={{ borderTop: '1px solid #E5E7EB', marginTop: 6, paddingTop: 6, fontWeight: 700, color: '#111827', display: 'flex', justifyContent: 'space-between' }}>
        <span>Total</span>
        <span>{formatDollars(total)}</span>
      </div>
    </div>
  );
};

export default function RevenueStackChart({ output }: Props) {
  const data = buildData(output);
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 12 }}>
        Stacked Revenue by Pricing Modality
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <defs>
            {Object.entries(COLORS).map(([key, color]) => (
              <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.85} />
                <stop offset="95%" stopColor={color} stopOpacity={0.65} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6B7280' }} />
          <YAxis tickFormatter={formatDollarsAxis} tick={{ fontSize: 11, fill: '#6B7280' }} width={60} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 4 }}
          />
          <Area type="monotone" dataKey="Seats" stackId="a" stroke={COLORS.seats} fill={`url(#grad-seats)`} strokeWidth={1.5} />
          <Area type="monotone" dataKey="Platform Fees" stackId="a" stroke={COLORS.platform} fill={`url(#grad-platform)`} strokeWidth={1.5} />
          <Area type="monotone" dataKey="Agent Workflows" stackId="a" stroke={COLORS.agent} fill={`url(#grad-agent)`} strokeWidth={1.5} />
          <Area type="monotone" dataKey="Consumption" stackId="a" stroke={COLORS.consumption} fill={`url(#grad-consumption)`} strokeWidth={1.5} />
          <Area type="monotone" dataKey="Outcome-Based" stackId="a" stroke={COLORS.outcome} fill={`url(#grad-outcome)`} strokeWidth={1.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
