import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { pollingOnResolved } from '../../../rxjs-polling/src/lib/rxjs-polling';
import { map } from 'rxjs/operators';

export interface Price {
  last: string;
  symbol: string;
  currency: string;
  change: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  prices$: Observable<Price[]>;
  oldPrices: Price[];

  constructor(private http: HttpClient) {
    this.startPolling();
  }

  /**
   * example using the pollingOnResolved method.
   */
  startPolling(): void {
    const httpRequest$ = this.http.get(`https://blockchain.info/ticker`);
    this.prices$ = pollingOnResolved(httpRequest$, 2_000).pipe(
      map(response => {
        const prices = Object.keys(response).map((key: string) => {
          let change = '';
          if (this.oldPrices && this.oldPrices[key].last !== response[key].last) {
            change = this.oldPrices[key].last < response[key].last ? 'up' : 'down';
          }
          return {
            currency: key,
            last: response[key].last,
            symbol: response[key].symbol,
            change
          };
        });
        this.oldPrices = response;
        return prices;
      })
    );
  }

  trackByFn(index): void {
    return index;
  }
}
