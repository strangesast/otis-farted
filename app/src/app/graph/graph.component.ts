import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  template: `
  <svg #svg></svg>
  `,
  styles: [
    `
    :host {
      display: block;
    }
    `
  ],
})
export class GraphComponent implements AfterViewInit, OnInit {
  @ViewChild('svg')
  svg: ElementRef;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {}

}
