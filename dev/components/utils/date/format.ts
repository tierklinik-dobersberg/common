import { padLeft } from '@tierklinik-dobersberg/angular/utils/strings';
import { DateInput, DurationInput, coerceDate, getDaySeconds } from './coercion';

/**
 * 
 * @deprecated - Use toDateString instead.
 */
export function formatDate(d: DateInput): string {
    return toDateString(d);
}

export function toDateString(d: DateInput): string {
    const coerced = coerceDate(d);
    return `${coerced.getFullYear()}-${padLeft('' + (coerced.getMonth() + 1), 2, '0')}-${padLeft('' + coerced.getDate(), 2, '0')}`
}

export function formatTime(input: DurationInput): string {
    const seconds = getDaySeconds(input);
    const hours = Math.floor(seconds / 60 / 60);
    const minutes = Math.floor((seconds - hours * 60 * 60) / 60);

    return `${padLeft(hours + '', 2, '0')}:${padLeft(minutes + '', 2, '0')}`;
}