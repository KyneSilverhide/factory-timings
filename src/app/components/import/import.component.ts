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
  private sectionRegex = /.*\(.*[min].*-.*\)/g;

  constructor(public dialogRef: MatDialogRef<ImportComponent>) {
    this.configs = [];
  }

  ngOnInit() {
  }

  parseInput(importarea: HTMLTextAreaElement) {
    const sectionTitles = importarea.value.match(this.sectionRegex);
    for (const sectionTitle of sectionTitles) {
      // Ex: UX/UI (15 min - Grégory)
      const rowParts = sectionTitle.split('(');
      const section = rowParts[0].trim();
      const parenthesisParts = rowParts[1].split('min -');
      const duration = parenthesisParts[0].trim();

      this.configs.push({
        expectedDurationMin: Number(duration),
        sectionName: section
      });
    }
    console.log(this.configs);
    this.dialogRef.close(this.configs);
  }
}
