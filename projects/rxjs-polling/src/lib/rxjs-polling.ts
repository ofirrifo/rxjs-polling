import { BehaviorSubject, concat, Observable, of } from 'rxjs';
import { delay, skip, switchMap, tap } from 'rxjs/operators';

/**
 * Polling when data is resolved
 * @param httpRequest$ any http request.
 * @param delayMs delay in ms
 *
 * Inspire by https://blog.strongbrew.io/rxjs-polling/
 */
export function pollingOnResolved(httpRequest$: Observable<any>, delayMs = 0): Observable<any> {
  const polling$ = new BehaviorSubject({});
  const rePolling$ = of('').pipe(
    delay(delayMs),
    tap(() => polling$.next({})),
    skip(1)
  );
  const httpPolling$ = concat(httpRequest$, rePolling$);
  return polling$.pipe(switchMap(() => httpPolling$));
}
