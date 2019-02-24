export interface SectionTiming {
  sectionName: string;
  expectedDurationMS: number;
  startTime?: number;
  endTime?: number;
  actualDurationMS?: number;
}

export interface SectionConfig {
  sectionName: string;
  expectedDurationMin: number;
}
