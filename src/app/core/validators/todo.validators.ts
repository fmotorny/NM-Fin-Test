import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
export const checkTitleMaxLengthSync: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  if (control.value.length > 100) {
    return { lengthError: true };
  }
  return null;
};

export const checkDateSync: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const controlDate = moment(control.value).format('DD/MM/YYYY');
  const current = moment().format('DD/MM/YYYY');

  const controlMoment = moment(controlDate);
  const currentMoment = moment(current);

  const res = controlMoment.diff(currentMoment, 'days');

  if (res < 0) {
    return { dateError: true };
  }

  return null;
};

export const checkTimeSync: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }
  const currentDate = moment().format('DD/MM/YYYY');

  const now = moment().format('DD/MM/YYYY HH:mm:ss');
  const fromControl = moment(
    currentDate + ' ' + control.value,
    'DD/MM/YYYY HH:mm',
  ).format('DD/MM/YYYY HH:mm:ss');

  const ms = moment.duration(
    moment(fromControl, 'DD/MM/YYYY HH:mm:ss').diff(
      moment(now, 'DD/MM/YYYY HH:mm:ss'),
    ),
  );

  if (ms.minutes() <= 0 && Math.ceil(ms.asHours()) <= 0 && ms.minutes() !== 0) {
    return { timeError: true };
  }

  return null;
};
