export interface ModelInputs {
  // Base Metrics
  startingSeats: number;
  annualSeatPrice: number;

  // Seat Dynamics
  seatAttrition: number;
  perSeatPriceIncrease: number;
  newCustomerGrowth: number;

  // Agent Workflows
  agentY1Adoption: number;
  agentAdoptionGrowthYoY: number;
  agentRevPerUnit: number;
  agentPriceGrowth: number;

  // Consumption / Usage
  consumptionY1Adoption: number;
  consumptionAdoptionGrowth: number;
  consumptionRevPerUnit: number;
  consumptionPriceGrowth: number;

  // Platform Fees
  platformY1Adoption: number;
  platformAdoptionGrowth: number;
  platformFee: number;
  platformFeeGrowth: number;

  // Outcome-Based
  outcomeY1Adoption: number;
  outcomeAdoptionGrowth: number;
  outcomeRevPerUnit: number;
  outcomePriceGrowth: number;
}

export interface YearData {
  seats: number;
  seatRevenue: number;
  agentAdopters: number;
  agentRevenue: number;
  consumptionAdopters: number;
  consumptionRevenue: number;
  platformAdopters: number;
  platformRevenue: number;
  outcomeAdopters: number;
  outcomeRevenue: number;
  totalRevenue: number;
  yoyGrowth: number | null;
  seatShare: number;
}

export interface ModelOutput {
  base: YearData;
  y1: YearData;
  y2: YearData;
  y3: YearData;
  y4: YearData;
  y5: YearData;
  cagr: number;
}

export type Scenario = 'bear' | 'base' | 'bull' | 'custom';
