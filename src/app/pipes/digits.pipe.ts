import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'digits'
})
export class DigitsPipe implements PipeTransform {

  transform(digit: number): string {
    return digit < 10 ? ('0' + digit) : ('' + digit);
  }
}

@Pipe({
  name: 'prettyduration'
})
export class PrettyDurationPipe implements PipeTransform {
  private digitPipe = new DigitsPipe();

  transform(durationInMS: number): string {

    const seconds = Math.floor((durationInMS / 1000) % 60);
    const minutes = Math.floor((durationInMS / (1000 * 60)) % 60);
    const hours = Math.floor((durationInMS / (1000 * 60 * 60)) % 24);
    const ms = Math.floor((durationInMS % 1000) / 100);

    return this.digitPipe.transform(hours) + ':'
      + this.digitPipe.transform(minutes) + ':'
      + this.digitPipe.transform(seconds) + ':'
      + this.digitPipe.transform(ms);
  }
}


@Pipe({
  name: 'prettydiff'
})
export class PrettyDiffPipe implements PipeTransform {
  private digitPipe = new DigitsPipe();

  transform(durationInMS: number): string {

    const seconds = Math.floor((durationInMS / 1000) % 60);
    const minutes = Math.floor((durationInMS / (1000 * 60)) % 60);

    return this.digitPipe.transform(minutes) + 'min '
      + this.digitPipe.transform(seconds) + 'sec';
  }
}

