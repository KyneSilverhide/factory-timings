import {Component, Input, OnInit} from '@angular/core';
import {SectionTiming} from '../../models/sectiontiming';
import {interval} from 'rxjs';
import {Stopwatch, StopwatchDisplay} from '../../models/stopwatch';

@Component({
  selector: 'app-timings',
  templateUrl: './timings.component.html',
  styleUrls: ['./timings.component.scss']
})
export class TimingsComponent implements OnInit {

  @Input()
  public sectionTimings: SectionTiming[];
  public globalStartTime: number;
  public globalEndTime: number;
  public totalDurationMS: number;

  public running = false;
  public stopwatchDisplay: StopwatchDisplay;

  public currentSectionIndex: number;
  public stopwatchSubscription: any;

  constructor() {
    this.currentSectionIndex = -1;
    this.totalDurationMS = 0;
    this.stopwatchDisplay = {
      global: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        ms: 0
      },
      current: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        ms: 0
      }
    };
  }

  ngOnInit() {
    this.sectionTimings.forEach(timing => this.totalDurationMS += timing.expectedDurationMS);
  }

  public startTimings() {
    this.running = true;
    this.globalStartTime = Date.now();

    this.resetSections();

    this.currentSectionIndex = 0;
    this.sectionTimings[this.currentSectionIndex].startTime = this.globalStartTime;

    const intervalT = interval(100);
    this.stopwatchSubscription = intervalT.subscribe(() => {
      this.updateStopwatches();
    });
  }

  public stopTimings() {
    this.running = false;
    this.globalEndTime = Date.now();
    this.stopwatchSubscription.unsubscribe();
  }

  public nextSection() {
    const now = Date.now();

    const currentSection = this.sectionTimings[this.currentSectionIndex];
    currentSection.endTime = now;
    currentSection.actualDurationMS = now - currentSection.startTime;
    this.currentSectionIndex++;

    if (this.currentSectionIndex > this.sectionTimings.length - 1) {
      this.stopTimings();
    } else {
      const nextSection = this.sectionTimings[this.currentSectionIndex];
      nextSection.startTime = now;
    }
  }

  private updateStopwatches() {
    const referenceStartTime = this.globalStartTime;
    this.updateStopwatch(this.stopwatchDisplay.global, referenceStartTime);

    const sectionStartTime = this.sectionTimings[this.currentSectionIndex].startTime;
    this.updateStopwatch(this.stopwatchDisplay.current, sectionStartTime);
  }

  private updateStopwatch(stopWatch: Stopwatch, referenceStartTime: number) {
    const now = Date.now();
    const globalElapsedTime = now - referenceStartTime;
    stopWatch.ms = Math.floor((globalElapsedTime % 1000) / 100);
    stopWatch.seconds = Math.floor((globalElapsedTime / 1000) % 60);
    stopWatch.minutes = Math.floor((globalElapsedTime / (1000 * 60)) % 60);
    stopWatch.hours = Math.floor((globalElapsedTime / (1000 * 60 * 60)) % 24);
  }

  private resetSections() {
    this.sectionTimings.forEach(section => this.resetSection(section));
  }

  private resetSection(section: SectionTiming) {
    section.startTime = null;
    section.endTime = null;
    section.actualDurationMS = null;
  }
}
