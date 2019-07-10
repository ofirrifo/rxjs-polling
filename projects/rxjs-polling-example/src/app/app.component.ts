import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { pollingOnResolved } from '../../../rxjs-polling/src/lib/rxjs-polling';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  ngUnSubscribe: Subject<void> = new Subject<void>();
  polling$: Observable<any>;

  constructor(private http: HttpClient) {
    this.startPolling();
  }

  startPolling(): void {
    const httpRequest$ = this.http.get(`https://blockchain.info/ticker`);
    this.polling$ = pollingOnResolved(httpRequest$, 2000).pipe(
      map(response => {
        return Object.keys(response).map((key: string) => {
          return {
            last: response[key].last,
            symbol: response[key].symbol
          };
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
