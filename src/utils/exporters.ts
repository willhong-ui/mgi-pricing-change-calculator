import type { ModelInputs, ModelOutput } from '../types/model';

export function exportCSV(output: ModelOutput): void {
  const { base, y1, y2, y3, y4, y5, cagr } = output;

  const rows = [
    ['Year', 'Seat Revenue', 'Agent Revenue', 'Consumption Revenue', 'Platform Revenue', 'Outcome Revenue', 'Total Revenue', 'YoY Growth%', 'Seat Share%', 'CAGR'],
    formatRow('Base', base, null, null),
    formatRow('Y1', y1, y1.yoyGrowth, null),
    formatRow('Y2', y2, y2.yoyGrowth, null),
    formatRow('Y3', y3, y3.yoyGrowth, null),
    formatRow('Y4', y4, y4.yoyGrowth, null),
    formatRow('Y5', y5, y5.yoyGrowth, cagr),
  ];

  const csv = rows.map(r => r.join(',')).join('\n');
  downloadFile(csv, 'mgi-revenue-model.csv', 'text/csv');
}

function formatRow(
  year: string,
  d: { seatRevenue: number; agentRevenue: number; consumptionRevenue: number; platformRevenue: number; outcomeRevenue: number; totalRevenue: number; seatShare: number },
  yoyGrowth: number | null,
  cagr: number | null,
): (string | number)[] {
  return [
    year,
    d.seatRevenue.toFixed(0),
    d.agentRevenue.toFixed(0),
    d.consumptionRevenue.toFixed(0),
    d.platformRevenue.toFixed(0),
    d.outcomeRevenue.toFixed(0),
    d.totalRevenue.toFixed(0),
    yoyGrowth !== null ? yoyGrowth.toFixed(2) : '',
    d.seatShare.toFixed(2),
    cagr !== null ? (cagr * 100).toFixed(2) : '',
  ];
}

export function exportJSON(inputs: ModelInputs, output: ModelOutput, scenario: string): void {
  const { base, y1, y2, y3, y4, y5, cagr } = output;

  const payload = {
    scenario,
    inputs,
    outputs: { base, y1, y2, y3, y4, y5 },
    kpis: {
      baseRevenue: base.totalRevenue,
      y5Revenue: y5.totalRevenue,
      cagr,
      seatShareY5: y5.seatShare / 100,
    },
  };

  downloadFile(
    JSON.stringify(payload, null, 2),
    'mgi-revenue-model.json',
    'application/json',
  );
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
