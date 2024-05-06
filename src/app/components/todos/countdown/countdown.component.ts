import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownComponent {
  private _time!: string;
  timeBox: string = '0h 0m 0s';
  hours!: number;
  @Input() set time(val: string) {
    this._time = val;
    const hours = this._time?.slice(0, 2);
    const minutes = this._time?.slice(-2);

    this.setTime(Number(hours), Number(minutes));
  }

  constructor(private cdr: ChangeDetectorRef) {}

  private setTime(hours: number, minutes: number) {
    const date = new Date();

    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + minutes);
    const countDownDate = new Date(date).getTime();

    const x = setInterval(() => {
      const now = new Date().getTime();

      // Find the distance between now and the countdown date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);


      this.hours = hours;
      this.timeBox = `${hours}h ${minutes}m ${seconds}s`;

      if (distance < 0) {
        clearInterval(x);
      }

      this.cdr.detectChanges();
    }, 1000);
  }
}
