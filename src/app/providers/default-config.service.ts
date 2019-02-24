import {Injectable} from '@angular/core';
import {SectionConfig} from '../models/sectiontiming';

@Injectable({
  providedIn: 'root'
})
export class DefaultConfigService {

  constructor() {
  }

  public getDefaultConfig(): SectionConfig[] {
    return [
      {
        sectionName: 'Tech Board',
        expectedDurationMin: 5
      },
      {
        sectionName: 'CARE',
        expectedDurationMin: 5
      },
      {
        sectionName: 'EPR',
        expectedDurationMin: 5
      },
      {
        sectionName: 'Analyse',
        expectedDurationMin: 5
      },
      {
        sectionName: 'QA',
        expectedDurationMin: 5
      },
      {
        sectionName: 'Architecture',
        expectedDurationMin: 5
      },
      {
        sectionName: 'HR',
        expectedDurationMin: 5
      },
      {
        sectionName: 'Divers',
        expectedDurationMin: 5
      },
    ];
  }
}
