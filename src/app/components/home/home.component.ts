import {Component, OnInit} from '@angular/core';
import {SectionConfig, SectionTiming} from '../../models/sectiontiming';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public configuring = true;
  public sectionTimings: SectionTiming[];

  constructor() {
  }

  ngOnInit() {
    this.sectionTimings = [];
  }

  updateConfiguration(eventData: SectionConfig[]) {
    this.sectionTimings = [];
    eventData.forEach(sectionConfig => {
      this.sectionTimings.push({
        sectionName: sectionConfig.sectionName,
        expectedDurationMS: sectionConfig.expectedDurationMin * 60 * 1000
      });
    });
    this.configuring = false;
  }
}
