import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  template: `
  <app-graph></app-graph>
  <app-list><app-list>
  `,
  styles: []
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
