import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Price } from '../app.component';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceComponent {
  @Input() price: Price;
}
