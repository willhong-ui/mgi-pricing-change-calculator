import { useState, useMemo } from 'react';
import type { ModelInputs, Scenario } from './types/model';
import { computeModel } from './utils/compute';
import { BEAR_CASE, BASE_CASE, BULL_CASE } from './utils/presets';
import { exportCSV, exportJSON } from './utils/exporters';
import Header from './components/Header';
import ScenarioTabs from './components/ScenarioTabs';
import KpiCards from './components/KpiCards';
import InputPanel from './components/InputPanel';
import ChartPanel from './components/ChartPanel';

const PRESET_MAP: Record<Exclude<Scenario, 'custom'>, ModelInputs> = {
  bear: BEAR_CASE,
  base: BASE_CASE,
  bull: BULL_CASE,
};

export default function App() {
  const [scenario, setScenario] = useState<Scenario>('bear');
  const [inputs, setInputs] = useState<ModelInputs>(BEAR_CASE);

  const output = useMemo(() => computeModel(inputs), [inputs]);

  function handleInputChange(updates: Partial<ModelInputs>) {
    setInputs(prev => ({ ...prev, ...updates }));
    setScenario('custom');
  }

  function handleScenarioSelect(s: Scenario) {
    if (s === 'custom') {
      setScenario('custom');
      return;
    }
    setScenario(s);
    setInputs(PRESET_MAP[s]);
  }

  function handleExportCSV() {
    exportCSV(output);
  }

  function handleExportJSON() {
    exportJSON(inputs, output, scenario);
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      minWidth: 1100,
      fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
      background: '#fff',
      color: '#111827',
    }}>
      <Header onExportCSV={handleExportCSV} onExportJSON={handleExportJSON} />
      <ScenarioTabs active={scenario} onSelect={handleScenarioSelect} />
      <KpiCards inputs={inputs} output={output} />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <InputPanel inputs={inputs} onChange={handleInputChange} />
        <ChartPanel output={output} />
      </div>
    </div>
  );
}
