import { useState } from 'react';
import type { ModelOutput } from '../types/model';
import RevenueStackChart from './RevenueStackChart';
import RevenueMixChart from './RevenueMixChart';
import GrowthSeatsChart from './GrowthSeatsChart';
import ModelReference from './ModelReference';

type ChartTab = 'stack' | 'mix' | 'growth' | 'reference';

const TABS: { id: ChartTab; label: string }[] = [
  { id: 'stack', label: 'Revenue Stack' },
  { id: 'mix', label: 'Revenue Mix' },
  { id: 'growth', label: 'Growth & Seats' },
  { id: 'reference', label: 'Model Reference' },
];

interface Props {
  output: ModelOutput;
}

export default function ChartPanel({ output }: Props) {
  const [activeTab, setActiveTab] = useState<ChartTab>('stack');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, padding: '12px 20px 0', borderBottom: '1px solid #E5E7EB', background: '#fff' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '7px 16px',
              borderRadius: '6px 6px 0 0',
              border: '1.5px solid',
              borderBottom: activeTab === tab.id ? '1.5px solid #fff' : '1.5px solid #E5E7EB',
              background: activeTab === tab.id ? '#fff' : '#F9FAFB',
              color: activeTab === tab.id ? '#111827' : '#6B7280',
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 600 : 400,
              cursor: 'pointer',
              borderColor: activeTab === tab.id ? '#E5E7EB' : '#E5E7EB',
              marginBottom: activeTab === tab.id ? -1 : 0,
              position: 'relative',
              zIndex: activeTab === tab.id ? 1 : 0,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart area */}
      <div style={{ flex: 1, padding: '20px 20px 16px', overflow: 'hidden' }}>
        {activeTab === 'stack' && <RevenueStackChart output={output} />}
        {activeTab === 'mix' && <RevenueMixChart output={output} />}
        {activeTab === 'growth' && <GrowthSeatsChart output={output} />}
        {activeTab === 'reference' && <ModelReference />}
      </div>
    </div>
  );
}
