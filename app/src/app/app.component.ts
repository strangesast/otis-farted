import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <span>Fart-Tracker 9000</span>
    </header>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
    :host {
      display: grid;
      grid-template-rows: 80px auto;
      height: 100%;
    }
    header {
      display: flex;
      // justify-content: space-between;
      justify-content: center;
      align-items: center;
    }
    .container {
      position: relative;
    }
    `,
  ],
})
export class AppComponent {}
