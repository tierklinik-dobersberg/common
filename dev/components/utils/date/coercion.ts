import { PartialMessage, Timestamp, Duration as ProtoDuration } from "@bufbuild/protobuf";
import { Duration } from './duration';

export type DateInput = string | number | Timestamp | PartialMessage<Timestamp> | Date;
export type DurationInput = DateInput | ProtoDuration | Duration;

function hasOwn(v: object, p: PropertyKey): boolean {
    if ('hasOwn' in Object) {
        return (Object as any).hasOwn(v, p)
    }

    return (Object as any).prototype.hasOwnProperty.call(v, p)
}

function isPartitialTimestamp(v: any): v is PartialMessage<Timestamp> {
    return typeof v === 'object' && hasOwn(v, 'seconds') && (typeof v['seconds'] === 'bigint' || typeof v['seconds'] === 'number');
}

export function coerceDate(v: DateInput): Date {
    if (v instanceof Date) {
        return v
    }

    if (v instanceof Timestamp) {
        return v.toDate();
    }

    if (isPartitialTimestamp(v)) {
        return new Timestamp(v).toDate();
    }

    if (typeof v === 'number') {
        return new Date(v * 1000);
    }

    return new Date(v);
}


/**
 * 
 * @param b The duration or date
 * @returns The number of seconds. If b is a DateInput, it returns the number of seconds on the specified date.
 */
export function getDaySeconds(b: DurationInput): number {
    if (b instanceof Duration) {
        return b.seconds;
    }

    if (b instanceof ProtoDuration) {
        return Number(b.seconds);
    }

    const date = coerceDate(b);
    return date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
}