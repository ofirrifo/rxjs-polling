import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { pollingOnResolved } from '../../../rxjs-polling/src/lib/rxjs-polling';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  polling$: Observable<any>;

  constructor(private http: HttpClient) {
    this.startPolling();
  }

  startPolling(): void {
    const httpRequest$ = this.http.get(`https://blockchain.info/ticker`);
    this.polling$ = pollingOnResolved(httpRequest$, 2000).pipe(map((response: { EUR: { last: number } }) => response.EUR.last));
  }
}
