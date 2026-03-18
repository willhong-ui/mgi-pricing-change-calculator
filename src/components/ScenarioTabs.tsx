import type { Scenario } from '../types/model';

interface ScenarioTabsProps {
  active: Scenario;
  onSelect: (s: Scenario) => void;
}

const TABS: { id: Scenario; label: string }[] = [
  { id: 'custom', label: 'Custom' },
  { id: 'bear', label: 'Bear Case' },
  { id: 'base', label: 'Base Case' },
  { id: 'bull', label: 'Bull Case' },
];

export default function ScenarioTabs({ active, onSelect }: ScenarioTabsProps) {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '14px 24px', borderBottom: '1px solid #E5E7EB', background: '#fff' }}>
      {TABS.map(tab => {
        const isActive = active === tab.id;
        const isCustom = tab.id === 'custom';

        let style: React.CSSProperties = {
          padding: '7px 18px',
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          border: '1.5px solid',
          transition: 'all 0.15s',
          userSelect: 'none',
        };

        if (isActive) {
          if (isCustom) {
            style = {
              ...style,
              background: '#fff',
              color: '#16a34a',
              borderColor: '#16a34a',
            };
          } else {
            style = {
              ...style,
              background: '#111827',
              color: '#fff',
              borderColor: '#111827',
            };
          }
        } else {
          style = {
            ...style,
            background: '#fff',
            color: '#374151',
            borderColor: '#D1D5DB',
          };
        }

        return (
          <button
            key={tab.id}
            style={style}
            onClick={() => onSelect(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
