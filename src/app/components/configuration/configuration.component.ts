import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SectionConfig} from '../../models/sectiontiming';
import {CdkDragDrop} from '@angular/cdk/typings/esm5/drag-drop';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {DefaultConfigService} from '../../providers/default-config.service';
import {MatDialog} from '@angular/material';
import {ImportComponent} from '../import/import.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  public sectionConfigs: SectionConfig[];
  public newSectionName: string;

  @Output()
  private saveConfigurationEvent = new EventEmitter<SectionConfig[]>();

  constructor(private configService: DefaultConfigService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.sectionConfigs = this.configService.getDefaultConfig();
  }

  addSection() {
    this.sectionConfigs.push({
      sectionName: this.newSectionName,
      expectedDurationMin: 5
    });
    this.newSectionName = '';
  }

  deleteSection(section: SectionConfig) {
    const index = this.sectionConfigs.indexOf(section);
    this.sectionConfigs.splice(index, 1);
  }

  drop(event: CdkDragDrop<SectionConfig[]>) {
    console.log(event.previousIndex, event.currentIndex);
    moveItemInArray(this.sectionConfigs, event.previousIndex, event.currentIndex);
  }

  saveConfiguration() {
    this.saveConfigurationEvent.emit(this.sectionConfigs);
  }

  importConfiguration() {
    const dialogRef = this.dialog.open(ImportComponent, {
      height: '400px',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe((configs: SectionConfig[]) => {
      if (configs && configs.length > 0) {
        this.sectionConfigs = configs;
      }
    });
  }
}
