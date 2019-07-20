# RxjsPolling
This library come to aid when we need to do polling requests
The library take care to do the polling when data is resolved.
This strategy help us to prevent send requests before the previous request return.


## Prerequisites
project have dependencies that require rxjs 6.4.0 or higher.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Demo](https://ofirrifo.github.io/rxjs-polling)
- [Example](https://stackblitz.com/edit/rxjs-polling-example-1?file=src/app/app.component.ts)

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
