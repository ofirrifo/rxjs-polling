import { interval, of } from 'rxjs';
import { pollingOnResolved } from './rxjs-polling';
import { take } from 'rxjs/operators';

describe('RxjsPollingOService', () => {
  it('should polling 10 times', done => {
    let index = 0;
    const request$ = interval(100);
    const takeCount = 10;
    pollingOnResolved(request$)
      .pipe(take(takeCount))
      .subscribe(response => {
        expect(response).toBe(index++);
        if (index === takeCount - 1) {
          done();
        }
      });
  });

  it('should polling delay be between (400 - 409)ms after each response', done => {
    const request$ = of(0);
    const takeCount = 4;
    let start;
    let end;
    let index = 0;

    pollingOnResolved(request$, 400)
      .pipe(take(takeCount))
      .subscribe(() => {
        // The first request
        if (index === 0) {
          start = performance.now();
        }

        // The second request
        if (index === 1) {
          end = performance.now();
          const elapsedTime = end - start;
          expect(elapsedTime).toBeLessThan(410);
          expect(elapsedTime).toBeGreaterThan(399);
          start = performance.now(); // reset start for the second test
        }

        // The last request
        if (index === 2) {
          end = performance.now();
          const elapsedTime = end - start;
          expect(elapsedTime).toBeLessThan(410);
          expect(elapsedTime).toBeGreaterThan(399);
          done();
        }
        index++;
      });
  });
});
