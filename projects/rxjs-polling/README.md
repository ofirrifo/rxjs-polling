# RxjsPolling


## Prerequisites
project have dependencies that require rxjs 6.4.0 or higher.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Stackblitz Example](#stackblitz example)

## Installation
```sh
npm i @rifo/rxjs-polling 
```

## Usage
```js
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pollingOnResolved } from '@rifo/rxjs-polling';

@Component({
  selector: 'app-root',
  templateUrl: `<div>{{response$ | async}}</div>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  response$: Observable<string>;
  constructor(private http: HttpClient) {
     const httpRequest$ = this.http.get(`https://blockchain.info/ticker`);
     this.response$ = pollingOnResolved(httpRequest$, 2_000);
  }
}
```

## [Demo](https://ofirrifo.github.io/rxjs-polling)

## [Stackblitz Example](https://stackblitz.com/edit/rxjs-polling-example-1?file=src/app/app.component.ts)
