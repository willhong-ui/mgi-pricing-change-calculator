const COLORS = {
  base: '#1E3A5F',
  agent: '#7C3AED',
  consumption: '#0D9488',
  platform: '#D97706',
  outcome: '#DC2626',
  seats: '#1E3A5F',
};

function FlowStep({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{
        padding: '6px 12px',
        borderRadius: 6,
        background: highlight ? '#16a34a' : '#F3F4F6',
        color: highlight ? '#fff' : '#374151',
        fontSize: 12,
        fontWeight: 600,
        border: `1px solid ${highlight ? '#16a34a' : '#E5E7EB'}`,
        whiteSpace: 'nowrap',
      }}>
        {label}
      </div>
    </div>
  );
}

function Arrow() {
  return <div style={{ color: '#9CA3AF', fontSize: 16, fontWeight: 400, flexShrink: 0 }}>→</div>;
}

function FormulaBox({ text, timing }: { text: string; timing: 'y0' | 'year' | 'revenue' }) {
  const colors = { y0: '#0D9488', year: '#3B5EA6', revenue: '#16a34a' };
  return (
    <div style={{
      fontFamily: 'ui-monospace, Consolas, monospace',
      fontSize: 11,
      background: '#F8F9FA',
      border: `1px solid ${colors[timing]}33`,
      borderLeft: `3px solid ${colors[timing]}`,
      padding: '6px 10px',
      borderRadius: 4,
      color: '#374151',
      marginTop: 4,
    }}>
      {text}
    </div>
  );
}

interface ParamDoc {
  name: string;
  range: string;
  description: string;
  formulas: { text: string; timing: 'y0' | 'year' | 'revenue' }[];
}

function SectionDocs({ color, label, params }: { color: string; label: string; params: ParamDoc[] }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color,
        borderBottom: `2px solid ${color}`,
        paddingBottom: 6,
        marginBottom: 14,
      }}>
        {label}
      </div>
      {params.map(p => (
        <div key={p.name} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{p.name}</span>
            <span style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 12 }}>{p.range}</span>
          </div>
          <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 6px', lineHeight: 1.5 }}>{p.description}</p>
          {p.formulas.map((f, i) => <FormulaBox key={i} text={f.text} timing={f.timing} />)}
        </div>
      ))}
    </div>
  );
}

export default function ModelReference() {
  return (
    <div style={{ overflowY: 'auto', height: '100%', padding: '4px 4px 24px' }}>
      <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, marginBottom: 20 }}>
        This model simulates a SaaS company transitioning from a single seat-based revenue stream to a
        diversified hybrid architecture with five concurrent pricing modalities. Users adjust 21 parameters
        to project revenue across six time periods (Base + 5 years), observing how attrition, price changes,
        and new stream adoption interact to determine whether the company grows through the "pricing transition valley."
      </p>

      {/* Flow diagram */}
      <div style={{
        background: '#F8F9FA',
        border: '1px solid #E5E7EB',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Computation Flow
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
          <FlowStep label="Base Seats × Seat Price" />
          <Arrow />
          <FlowStep label="Apply Attrition & New Growth" />
          <Arrow />
          <FlowStep label="+ Agent Revenue" />
          <Arrow />
          <FlowStep label="+ Consumption Revenue" />
          <Arrow />
          <FlowStep label="+ Platform Fee Revenue" />
          <Arrow />
          <FlowStep label="+ Outcome Revenue" />
          <Arrow />
          <FlowStep label="Total Revenue" highlight />
        </div>
      </div>

      {/* Callout */}
      <div style={{
        background: '#EFF6FF',
        border: '1px solid #BFDBFE',
        borderRadius: 8,
        padding: '14px 18px',
        marginBottom: 24,
        fontSize: 13,
        color: '#1E40AF',
        lineHeight: 1.6,
        fontStyle: 'italic',
      }}>
        "Three forces act on seat revenue each year. Attrition removes seats (AI displacement), New Customer Growth
        adds seats (market expansion), and Price Increase raises the value of each remaining seat."
      </div>

      <SectionDocs color={COLORS.base} label="Base Metrics" params={[
        {
          name: 'Starting Seats',
          range: '1,000 – 100,000 (step 500)',
          description: 'The initial number of seat licenses at the beginning of the model. Used as the base for adoption calculations across all new pricing streams.',
          formulas: [{ text: 'Y0 Seat Revenue = Starting Seats × Annual Seat Price', timing: 'y0' }],
        },
        {
          name: 'Annual Seat Price',
          range: '$100 – $10,000 (step $50)',
          description: 'The per-seat annual contract value at Year 0. Price compounds each year by the Per-Seat Price Increase percentage.',
          formulas: [{ text: 'Y0 Seat Revenue = Starting Seats × Annual Seat Price', timing: 'y0' }],
        },
      ]} />

      <SectionDocs color={COLORS.seats} label="Seat Dynamics" params={[
        {
          name: 'Annual Seat Attrition',
          range: '0% – 30% (step 1%)',
          description: 'Percentage of the prior year\'s seats lost each year — driven by AI displacement, contract non-renewal, or seat consolidation.',
          formulas: [
            { text: 'Seats Lost = Prior Seats × Attrition%', timing: 'year' },
            { text: 'Net Seats = Prior Seats × (1 − Attrition% + Growth%)', timing: 'year' },
          ],
        },
        {
          name: 'Per-Seat Price Increase',
          range: '0% – 30% (step 1%)',
          description: 'Annual price escalation applied to each remaining seat. Represents the uplift from AI-enhanced seat value, premium features, or contractual escalators.',
          formulas: [{ text: 'Seat Price = Prior Price × (1 + Price Increase%)', timing: 'year' }],
        },
        {
          name: 'New Customer Growth',
          range: '0% – 20% (step 1%)',
          description: 'New seat additions as a percentage of the prior seat count — representing net new logo growth and market expansion.',
          formulas: [{ text: 'Seats Added = Prior Seats × Growth%', timing: 'year' }],
        },
      ]} />

      <SectionDocs color={COLORS.agent} label="Agent Workflows" params={[
        {
          name: 'Y1 Adoption',
          range: '0% – 30% (step 1%)',
          description: 'Percentage of base seats that adopt the agent workflow pricing stream in Year 1.',
          formulas: [{ text: 'Y1 Adopters = Base Seats × Y1 Adoption%', timing: 'year' }],
        },
        {
          name: 'Adoption Growth YoY',
          range: '0% – 100% (step 1%)',
          description: 'Year-over-year growth in adopter count. Capped at 85% of base seats.',
          formulas: [{ text: 'Adopters = min(Prior × (1 + Growth%), Base Seats × 0.85)', timing: 'year' }],
        },
        {
          name: 'Rev Per Customer Unit',
          range: '$100 – $5,000 (step $50)',
          description: 'Average revenue per agent workflow adopter in Year 1. Grows annually by Agent Price Growth.',
          formulas: [{ text: 'Agent Revenue = Adopters × Rev/Unit', timing: 'revenue' }],
        },
        {
          name: 'Agent Price Growth',
          range: '0% – 30% (step 1%)',
          description: 'Annual increase in revenue per unit for the agent workflow stream.',
          formulas: [{ text: 'Rev/Unit = Prior Rev/Unit × (1 + Price Growth%)', timing: 'year' }],
        },
      ]} />

      <SectionDocs color={COLORS.consumption} label="Consumption / Usage" params={[
        {
          name: 'Y1 Adoption',
          range: '0% – 30% (step 1%)',
          description: 'Percentage of base seats that begin consumption-based billing in Year 1. Lowest friction stream — highest ceiling (90%).',
          formulas: [{ text: 'Y1 Adopters = Base Seats × Y1 Adoption%', timing: 'year' }],
        },
        {
          name: 'Adoption Growth YoY',
          range: '0% – 100% (step 1%)',
          description: 'Year-over-year adopter growth, capped at 90% of base seats.',
          formulas: [{ text: 'Adopters = min(Prior × (1 + Growth%), Base Seats × 0.90)', timing: 'year' }],
        },
        {
          name: 'Rev Per Unit',
          range: '$50 – $3,000 (step $50)',
          description: 'Average annual consumption revenue per adopter at Year 1 rates.',
          formulas: [{ text: 'Consumption Revenue = Adopters × Rev/Unit', timing: 'revenue' }],
        },
        {
          name: 'Usage Price Growth',
          range: '0% – 20% (step 1%)',
          description: 'Annual increase in per-unit consumption price.',
          formulas: [{ text: 'Rev/Unit = Prior Rev/Unit × (1 + Usage Price Growth%)', timing: 'year' }],
        },
      ]} />

      <SectionDocs color={COLORS.platform} label="Platform Fees" params={[
        {
          name: 'Y1 Adoption',
          range: '0% – 40% (step 1%)',
          description: 'Percentage of base seats enrolled in a platform fee tier in Year 1. Limited to customers large enough for committed tiers — ceiling 70%.',
          formulas: [{ text: 'Y1 Adopters = Base Seats × Y1 Adoption%', timing: 'year' }],
        },
        {
          name: 'Adoption Growth YoY',
          range: '0% – 60% (step 1%)',
          description: 'Year-over-year growth in platform fee adopters, capped at 70% of base seats.',
          formulas: [{ text: 'Adopters = min(Prior × (1 + Growth%), Base Seats × 0.70)', timing: 'year' }],
        },
        {
          name: 'Platform Fee',
          range: '$500 – $10,000 (step $100)',
          description: 'Annual platform fee per adopter at Year 1 rates.',
          formulas: [{ text: 'Platform Revenue = Adopters × Fee', timing: 'revenue' }],
        },
        {
          name: 'Fee Price Growth',
          range: '0% – 20% (step 1%)',
          description: 'Annual increase in the platform fee per unit.',
          formulas: [{ text: 'Fee = Prior Fee × (1 + Fee Price Growth%)', timing: 'year' }],
        },
      ]} />

      <SectionDocs color={COLORS.outcome} label="Outcome-Based" params={[
        {
          name: 'Y1 Adoption',
          range: '0% – 15% (step 1%)',
          description: 'Percentage of base seats on outcome-based pricing in Year 1. Structurally limited — ceiling 25% due to measurement challenges.',
          formulas: [{ text: 'Y1 Adopters = Base Seats × Y1 Adoption%', timing: 'year' }],
        },
        {
          name: 'Adoption Growth YoY',
          range: '0% – 60% (step 1%)',
          description: 'Year-over-year adopter growth, capped at 25% of base seats — the tightest ceiling.',
          formulas: [{ text: 'Adopters = min(Prior × (1 + Growth%), Base Seats × 0.25)', timing: 'year' }],
        },
        {
          name: 'Rev Per Unit',
          range: '$100 – $3,000 (step $50)',
          description: 'Average outcome-based revenue per adopter at Year 1 rates.',
          formulas: [{ text: 'Outcome Revenue = Adopters × Rev/Unit', timing: 'revenue' }],
        },
        {
          name: 'Outcome Price Growth',
          range: '0% – 25% (step 1%)',
          description: 'Annual increase in the outcome-based revenue rate per unit.',
          formulas: [{ text: 'Rev/Unit = Prior Rev/Unit × (1 + Outcome Price Growth%)', timing: 'year' }],
        },
      ]} />
    </div>
  );
}
