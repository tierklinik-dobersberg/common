import { Duration, Timestamp } from "@bufbuild/protobuf";
import { DisplayNamePipe } from "@tierklinik-dobersberg/angular/pipes";
import { coerceDate, getDaySeconds } from "@tierklinik-dobersberg/angular/utils/date";
import { DayTime } from "@tierklinik-dobersberg/apis/common/v1";
import { Profile } from "@tierklinik-dobersberg/apis/idm/v1";
import { Daytime } from "@tierklinik-dobersberg/apis/roster/v1";

export type Optional<T> = T | null | undefined;

export function sortUserProfile(a: Optional<Profile>, b: Optional<Profile>): number {
  const an = a ? (new DisplayNamePipe).transform(a) : '';
  const bn = b ? (new DisplayNamePipe).transform(b) : '';

  return an.localeCompare(bn);
}

export function sortProtoTimestamps(a: Optional<Timestamp>, b: Optional<Timestamp>): number {
  return (a ? coerceDate(a).getTime() : 0) - (b ? coerceDate(b).getTime() : 0);
}

export function sortProtoDuration(a: Optional<Duration>, b: Optional<Duration>): number {
  return (b ? getDaySeconds(b) : 0) - (a ? getDaySeconds(a) : 0);
}

export function sortProtoDaytime(a: Optional<Daytime | DayTime>, b: Optional<Daytime | DayTime>): number {
  const minutesA = Number(a?.hour || 0) * 60 + Number(a?.minute || 0);
  const minutesB = Number(b?.hour || 0) * 60 + Number(b?.minute || 0);

  return minutesB - minutesA
}
