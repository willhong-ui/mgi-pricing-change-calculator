import type { ModelInputs, ModelOutput, YearData } from '../types/model';

function makeYearData(
  seats: number,
  seatRevenue: number,
  agentAdopters: number,
  agentRevenue: number,
  consumptionAdopters: number,
  consumptionRevenue: number,
  platformAdopters: number,
  platformRevenue: number,
  outcomeAdopters: number,
  outcomeRevenue: number,
  priorTotal: number | null,
): YearData {
  const totalRevenue =
    seatRevenue + agentRevenue + consumptionRevenue + platformRevenue + outcomeRevenue;
  const yoyGrowth =
    priorTotal !== null ? ((totalRevenue - priorTotal) / priorTotal) * 100 : null;
  const seatShare = totalRevenue > 0 ? (seatRevenue / totalRevenue) * 100 : 100;

  return {
    seats,
    seatRevenue,
    agentAdopters,
    agentRevenue,
    consumptionAdopters,
    consumptionRevenue,
    platformAdopters,
    platformRevenue,
    outcomeAdopters,
    outcomeRevenue,
    totalRevenue,
    yoyGrowth,
    seatShare,
  };
}

export function computeModel(inputs: ModelInputs): ModelOutput {
  const {
    startingSeats,
    annualSeatPrice,
    seatAttrition,
    perSeatPriceIncrease,
    newCustomerGrowth,
    agentY1Adoption,
    agentAdoptionGrowthYoY,
    agentRevPerUnit,
    agentPriceGrowth,
    consumptionY1Adoption,
    consumptionAdoptionGrowth,
    consumptionRevPerUnit,
    consumptionPriceGrowth,
    platformY1Adoption,
    platformAdoptionGrowth,
    platformFee,
    platformFeeGrowth,
    outcomeY1Adoption,
    outcomeAdoptionGrowth,
    outcomeRevPerUnit,
    outcomePriceGrowth,
  } = inputs;

  // Base year
  const baseRevenue = startingSeats * annualSeatPrice;
  const base = makeYearData(
    startingSeats,
    baseRevenue,
    0, 0, 0, 0, 0, 0, 0, 0,
    null,
  );

  // Adoption ceilings
  const agentCeiling = startingSeats * 0.85;
  const consumptionCeiling = startingSeats * 0.90;
  const platformCeiling = startingSeats * 0.70;
  const outcomeCeiling = startingSeats * 0.25;

  // Year 1
  const y1Seats = startingSeats * (1 - seatAttrition + newCustomerGrowth);
  const y1SeatPrice = annualSeatPrice * (1 + perSeatPriceIncrease);
  const y1SeatRevenue = y1Seats * y1SeatPrice;

  const y1AgentAdopters = startingSeats * agentY1Adoption;
  const y1AgentRevPerUnit = agentRevPerUnit;
  const y1AgentRevenue = y1AgentAdopters * y1AgentRevPerUnit;

  const y1ConsumptionAdopters = startingSeats * consumptionY1Adoption;
  const y1ConsumptionRevPerUnit = consumptionRevPerUnit;
  const y1ConsumptionRevenue = y1ConsumptionAdopters * y1ConsumptionRevPerUnit;

  const y1PlatformAdopters = startingSeats * platformY1Adoption;
  const y1PlatformFee = platformFee;
  const y1PlatformRevenue = y1PlatformAdopters * y1PlatformFee;

  const y1OutcomeAdopters = startingSeats * outcomeY1Adoption;
  const y1OutcomeRevPerUnit = outcomeRevPerUnit;
  const y1OutcomeRevenue = y1OutcomeAdopters * y1OutcomeRevPerUnit;

  const y1 = makeYearData(
    y1Seats, y1SeatRevenue,
    y1AgentAdopters, y1AgentRevenue,
    y1ConsumptionAdopters, y1ConsumptionRevenue,
    y1PlatformAdopters, y1PlatformRevenue,
    y1OutcomeAdopters, y1OutcomeRevenue,
    base.totalRevenue,
  );

  // Helper to compute subsequent years
  function nextYear(
    priorSeats: number,
    priorSeatPrice: number,
    priorAgentAdopters: number,
    priorAgentRevPerUnit: number,
    priorConsumptionAdopters: number,
    priorConsumptionRevPerUnit: number,
    priorPlatformAdopters: number,
    priorPlatformFee: number,
    priorOutcomeAdopters: number,
    priorOutcomeRevPerUnit: number,
    priorTotal: number,
  ): YearData & {
    seatPrice: number;
    agentRevPerUnit: number;
    consumptionRevPerUnit: number;
    platformFee: number;
    outcomeRevPerUnit: number;
  } {
    const seats = priorSeats * (1 - seatAttrition + newCustomerGrowth);
    const seatPrice = priorSeatPrice * (1 + perSeatPriceIncrease);
    const seatRevenue = seats * seatPrice;

    const agentAdopters = Math.min(
      priorAgentAdopters * (1 + agentAdoptionGrowthYoY),
      agentCeiling,
    );
    const newAgentRevPerUnit = priorAgentRevPerUnit * (1 + agentPriceGrowth);
    const agentRevenue = agentAdopters * newAgentRevPerUnit;

    const consumptionAdopters = Math.min(
      priorConsumptionAdopters * (1 + consumptionAdoptionGrowth),
      consumptionCeiling,
    );
    const newConsumptionRevPerUnit = priorConsumptionRevPerUnit * (1 + consumptionPriceGrowth);
    const consumptionRevenue = consumptionAdopters * newConsumptionRevPerUnit;

    const platformAdopters = Math.min(
      priorPlatformAdopters * (1 + platformAdoptionGrowth),
      platformCeiling,
    );
    const newPlatformFee = priorPlatformFee * (1 + platformFeeGrowth);
    const platformRevenue = platformAdopters * newPlatformFee;

    const outcomeAdopters = Math.min(
      priorOutcomeAdopters * (1 + outcomeAdoptionGrowth),
      outcomeCeiling,
    );
    const newOutcomeRevPerUnit = priorOutcomeRevPerUnit * (1 + outcomePriceGrowth);
    const outcomeRevenue = outcomeAdopters * newOutcomeRevPerUnit;

    return {
      ...makeYearData(
        seats, seatRevenue,
        agentAdopters, agentRevenue,
        consumptionAdopters, consumptionRevenue,
        platformAdopters, platformRevenue,
        outcomeAdopters, outcomeRevenue,
        priorTotal,
      ),
      seatPrice,
      agentRevPerUnit: newAgentRevPerUnit,
      consumptionRevPerUnit: newConsumptionRevPerUnit,
      platformFee: newPlatformFee,
      outcomeRevPerUnit: newOutcomeRevPerUnit,
    };
  }

  const y2raw = nextYear(
    y1Seats, y1SeatPrice,
    y1AgentAdopters, y1AgentRevPerUnit,
    y1ConsumptionAdopters, y1ConsumptionRevPerUnit,
    y1PlatformAdopters, y1PlatformFee,
    y1OutcomeAdopters, y1OutcomeRevPerUnit,
    y1.totalRevenue,
  );

  const y3raw = nextYear(
    y2raw.seats, y2raw.seatPrice,
    y2raw.agentAdopters, y2raw.agentRevPerUnit,
    y2raw.consumptionAdopters, y2raw.consumptionRevPerUnit,
    y2raw.platformAdopters, y2raw.platformFee,
    y2raw.outcomeAdopters, y2raw.outcomeRevPerUnit,
    y2raw.totalRevenue,
  );

  const y4raw = nextYear(
    y3raw.seats, y3raw.seatPrice,
    y3raw.agentAdopters, y3raw.agentRevPerUnit,
    y3raw.consumptionAdopters, y3raw.consumptionRevPerUnit,
    y3raw.platformAdopters, y3raw.platformFee,
    y3raw.outcomeAdopters, y3raw.outcomeRevPerUnit,
    y3raw.totalRevenue,
  );

  const y5raw = nextYear(
    y4raw.seats, y4raw.seatPrice,
    y4raw.agentAdopters, y4raw.agentRevPerUnit,
    y4raw.consumptionAdopters, y4raw.consumptionRevPerUnit,
    y4raw.platformAdopters, y4raw.platformFee,
    y4raw.outcomeAdopters, y4raw.outcomeRevPerUnit,
    y4raw.totalRevenue,
  );

  // Strip extra fields for y2–y5
  const stripExtra = (d: ReturnType<typeof nextYear>): YearData => {
    const { seatPrice: _sp, agentRevPerUnit: _a, consumptionRevPerUnit: _c, platformFee: _p, outcomeRevPerUnit: _o, ...rest } = d;
    void _sp; void _a; void _c; void _p; void _o;
    return rest;
  };

  const y2 = stripExtra(y2raw);
  const y3 = stripExtra(y3raw);
  const y4 = stripExtra(y4raw);
  const y5 = stripExtra(y5raw);

  const cagr = Math.pow(y5.totalRevenue / base.totalRevenue, 1 / 5) - 1;

  return { base, y1, y2, y3, y4, y5, cagr };
}
