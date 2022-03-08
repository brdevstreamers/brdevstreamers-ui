export interface StatsSummary {
  streams: number;
  vods: number;
  previews: number;
}

export const StatsSummaryDefault: StatsSummary = {
  streams: 0,
  vods: 0,
  previews: 0,
};
