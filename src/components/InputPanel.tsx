import type { ModelInputs } from '../types/model';
import SectionHeader from './SectionHeader';
import SliderInput from './SliderInput';

interface InputPanelProps {
  inputs: ModelInputs;
  onChange: (updates: Partial<ModelInputs>) => void;
}

const fmtSeats = (v: number) => v.toLocaleString();
const fmtDollar = (v: number) => `$${v.toLocaleString()}`;
const fmtPct = (v: number) => `${Math.round(v * 100)}%`;

const COLORS = {
  base: '#1E3A5F',
  agent: '#7C3AED',
  consumption: '#0D9488',
  platform: '#D97706',
  outcome: '#DC2626',
};

export default function InputPanel({ inputs, onChange }: InputPanelProps) {
  return (
    <div style={{
      width: 290,
      minWidth: 290,
      overflowY: 'auto',
      padding: '0 20px',
      background: '#FAFAFA',
      borderRight: '1px solid #E5E7EB',
      boxSizing: 'border-box',
    }}>
      {/* BASE METRICS */}
      <SectionHeader label="Base Metrics" color={COLORS.base} />
      <SliderInput
        label="Starting Seats"
        value={inputs.startingSeats}
        min={1000} max={100000} step={500}
        format={fmtSeats}
        color={COLORS.base}
        onChange={v => onChange({ startingSeats: v })}
      />
      <SliderInput
        label="Annual Seat Price"
        value={inputs.annualSeatPrice}
        min={100} max={10000} step={50}
        format={fmtDollar}
        color={COLORS.base}
        onChange={v => onChange({ annualSeatPrice: v })}
      />

      {/* SEAT DYNAMICS */}
      <SectionHeader label="Seat Dynamics" color={COLORS.base} />
      <SliderInput
        label="Annual Seat Attrition"
        subtitle="AI-driven seat displacement"
        value={inputs.seatAttrition}
        min={0} max={0.30} step={0.01}
        format={fmtPct}
        color={COLORS.base}
        onChange={v => onChange({ seatAttrition: v })}
      />
      <SliderInput
        label="Per-Seat Price Increase"
        subtitle="AI-enhanced seat value uplift"
        value={inputs.perSeatPriceIncrease}
        min={0} max={0.30} step={0.01}
        format={fmtPct}
        color={COLORS.base}
        onChange={v => onChange({ perSeatPriceIncrease: v })}
      />
      <SliderInput
        label="New Customer Growth"
        subtitle="Market penetration expansion"
        value={inputs.newCustomerGrowth}
        min={0} max={0.20} step={0.01}
        format={fmtPct}
        color={COLORS.base}
        onChange={v => onChange({ newCustomerGrowth: v })}
      />

      {/* AGENT WORKFLOWS */}
      <SectionHeader label="Agent Workflows" color={COLORS.agent} />
      <SliderInput
        label="Y1 Adoption"
        value={inputs.agentY1Adoption}
        min={0} max={0.30} step={0.01}
        format={fmtPct}
        color={COLORS.agent}
        onChange={v => onChange({ agentY1Adoption: v })}
      />
      <SliderInput
        label="Adoption Growth YoY"
        value={inputs.agentAdoptionGrowthYoY}
        min={0} max={1.00} step={0.01}
        format={fmtPct}
        color={COLORS.agent}
        onChange={v => onChange({ agentAdoptionGrowthYoY: v })}
      />
      <SliderInput
        label="Rev Per Customer Unit"
        value={inputs.agentRevPerUnit}
        min={100} max={5000} step={50}
        format={fmtDollar}
        color={COLORS.agent}
        onChange={v => onChange({ agentRevPerUnit: v })}
      />
      <SliderInput
        label="Agent Price Growth"
        value={inputs.agentPriceGrowth}
        min={0} max={0.30} step={0.01}
        format={fmtPct}
        color={COLORS.agent}
        onChange={v => onChange({ agentPriceGrowth: v })}
      />

      {/* CONSUMPTION / USAGE */}
      <SectionHeader label="Consumption / Usage" color={COLORS.consumption} />
      <SliderInput
        label="Y1 Adoption"
        value={inputs.consumptionY1Adoption}
        min={0} max={0.30} step={0.01}
        format={fmtPct}
        color={COLORS.consumption}
        onChange={v => onChange({ consumptionY1Adoption: v })}
      />
      <SliderInput
        label="Adoption Growth YoY"
        value={inputs.consumptionAdoptionGrowth}
        min={0} max={1.00} step={0.01}
        format={fmtPct}
        color={COLORS.consumption}
        onChange={v => onChange({ consumptionAdoptionGrowth: v })}
      />
      <SliderInput
        label="Rev Per Unit"
        value={inputs.consumptionRevPerUnit}
        min={50} max={3000} step={50}
        format={fmtDollar}
        color={COLORS.consumption}
        onChange={v => onChange({ consumptionRevPerUnit: v })}
      />
      <SliderInput
        label="Usage Price Growth"
        value={inputs.consumptionPriceGrowth}
        min={0} max={0.20} step={0.01}
        format={fmtPct}
        color={COLORS.consumption}
        onChange={v => onChange({ consumptionPriceGrowth: v })}
      />

      {/* PLATFORM FEES */}
      <SectionHeader label="Platform Fees" color={COLORS.platform} />
      <SliderInput
        label="Y1 Adoption"
        value={inputs.platformY1Adoption}
        min={0} max={0.40} step={0.01}
        format={fmtPct}
        color={COLORS.platform}
        onChange={v => onChange({ platformY1Adoption: v })}
      />
      <SliderInput
        label="Adoption Growth YoY"
        value={inputs.platformAdoptionGrowth}
        min={0} max={0.60} step={0.01}
        format={fmtPct}
        color={COLORS.platform}
        onChange={v => onChange({ platformAdoptionGrowth: v })}
      />
      <SliderInput
        label="Platform Fee"
        value={inputs.platformFee}
        min={500} max={10000} step={100}
        format={fmtDollar}
        color={COLORS.platform}
        onChange={v => onChange({ platformFee: v })}
      />
      <SliderInput
        label="Fee Price Growth"
        value={inputs.platformFeeGrowth}
        min={0} max={0.20} step={0.01}
        format={fmtPct}
        color={COLORS.platform}
        onChange={v => onChange({ platformFeeGrowth: v })}
      />

      {/* OUTCOME-BASED */}
      <SectionHeader label="Outcome-Based" color={COLORS.outcome} />
      <SliderInput
        label="Y1 Adoption"
        subtitle="Limited applicability"
        value={inputs.outcomeY1Adoption}
        min={0} max={0.15} step={0.01}
        format={fmtPct}
        color={COLORS.outcome}
        onChange={v => onChange({ outcomeY1Adoption: v })}
      />
      <SliderInput
        label="Adoption Growth YoY"
        value={inputs.outcomeAdoptionGrowth}
        min={0} max={0.60} step={0.01}
        format={fmtPct}
        color={COLORS.outcome}
        onChange={v => onChange({ outcomeAdoptionGrowth: v })}
      />
      <SliderInput
        label="Rev Per Unit"
        value={inputs.outcomeRevPerUnit}
        min={100} max={3000} step={50}
        format={fmtDollar}
        color={COLORS.outcome}
        onChange={v => onChange({ outcomeRevPerUnit: v })}
      />
      <SliderInput
        label="Outcome Price Growth"
        value={inputs.outcomePriceGrowth}
        min={0} max={0.25} step={0.01}
        format={fmtPct}
        color={COLORS.outcome}
        onChange={v => onChange({ outcomePriceGrowth: v })}
      />

      <div style={{ height: 24 }} />
    </div>
  );
}
