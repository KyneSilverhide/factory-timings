import {Component, OnInit} from '@angular/core';
import {SectionConfig} from '../../models/sectiontiming';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  public configs: SectionConfig[];

  constructor(public dialogRef: MatDialogRef<ImportComponent>) {
    this.configs = [];
  }

  ngOnInit() {
  }

  parseInput(importarea: HTMLTextAreaElement) {
    this.configs.push({
      expectedDurationMin: 10,
      sectionName: 'Pouet'
    });
    this.dialogRef.close(this.configs);
  }
}
