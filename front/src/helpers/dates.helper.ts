import { format } from 'date-fns';

export function renderCalendarDate(date: Date | string) {
    return format(new Date(date), 'dd.MM.yyyy');
}

export function renderDate(date: Date | string) {
    return format(new Date(date), 'dd MMM y');
}

export function renderTime(date: Date | string) {
    return format(new Date(date), 'HH:mm');
}

export function renderDateWithTime(date: Date | string) {
    return format(new Date(date), 'dd MMM y, HH:mm');
}
