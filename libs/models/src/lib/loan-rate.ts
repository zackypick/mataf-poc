export type Risk = 'low' | 'medium' | 'high';

export interface RiskResult {
  risk: Risk;
  rate: number;
}
