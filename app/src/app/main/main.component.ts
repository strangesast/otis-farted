import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, of, concat } from 'rxjs';
import { delay, exhaust, map, shareReplay, startWith, tap } from 'rxjs/operators';

const IMAGE_COUNT = 11;

@Component({
  selector: 'app-main',
  template: `
    <div class="img" (click)="onFart()">
      <span></span>
      <picture>
        <source srcset="{{imageSrc}}.webp" type="image/webp">
        <source srcset="{{imageSrc}}.jpg" type="image/jpeg">
        <img src="{{imageSrc}}.jpg" alt="Otis!">
      </picture>
    </div>
    <div class="notification" *ngIf="lastFart$ | async as lastFart">
      <span>Recorded that fart.</span>
    </div>
  `,
  styles: [
    `
    :host {
      display: grid;
      grid-template-columns: minmax(4px, auto) min-content minmax(4px, auto);
      grid-template-rows: minmax(4px, auto) min-content 50px minmax(4px, auto);
      height: 100%;
    }
    .img {
      margin: 10px;
      box-sizing: border-box;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      grid-row: 2 / 3;
      grid-column: 2 / 3;
    }
    .img, .img * {
      user-select: none;
    }
    .img > span {
      position: absolute;
      background: grey;
      opacity: 0;
      width: 100%;
      height: 100%;
      transition: opacity 0.1s;
    }
    .img:hover > span {
      opacity: 0.2;
    }
    .img:active > span {
      opacity: 0.4;
    }
    .img > img {
      display: block;
    }
    .notification {
      border-radius: 8px;
      background-color: #eaeaea;
      border: 1px solid #cacaca;
      padding: 8px;
      grid-row: 3 / 4;
      grid-column: 2 / 3;
    }
    `,
  ],
})
export class MainComponent implements OnInit {
  imageNumber = ('0' + Math.ceil(Math.random() * 11)).slice(-2);
  imageSrc = `/images/otis_${this.imageNumber}`;

  farts$ = this.http.get(`/api/list`);

  fart = new Subject();

  fartDebounce = 2000;

  lastFartAudioNumber = 1;

  fartAudio;

  lastFart$ = this.fart.pipe(
    map(fart => concat(of(fart), of(null).pipe(delay(this.fartDebounce)))),
    exhaust(),
    startWith(null),
    tap(fart => {
      if (fart != null) {
        this.soundFart();
      }
    }),
    shareReplay(1),
  );

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  soundFart() {
    if (this.fartAudio == null) {
      this.fartAudio = new Audio();
    }
    this.lastFartAudioNumber = this.lastFartAudioNumber === 3 ? 1 : this.lastFartAudioNumber + 1;
    this.fartAudio.src = `/audio/fart_${this.lastFartAudioNumber}.mp3`;
    this.fartAudio.play();
  }

  onFart() {
    const date = new Date();
    this.fart.next({date});
  }
}
