import { format, isEqual } from 'date-fns';

export function isSameDates(first: Date | string, second: Date | string) {
    return isEqual(new Date(first), new Date(second));
}

export function renderCalendarDate(date: Date | string) {
    return format(new Date(date), 'dd.MM.yyyy');
}

export function renderDate(date: Date | string) {
    return format(new Date(date), 'dd MMM y');
}

export function renderTime(date: Date | string) {
    return format(new Date(date), 'HH:mm');
}

export function renderDateWithTime(date?: Date | string) {
    if (!date) return;

    return format(new Date(date), 'dd MMM y, HH:mm');
}
