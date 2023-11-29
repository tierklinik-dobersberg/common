import * as i0 from '@angular/core';
import { Pipe, isDevMode } from '@angular/core';
import { Daytime, Profile } from '@tkd/apis';
import { Duration as Duration$1 } from '@bufbuild/protobuf';

function toDateString(d) {
    return `${d.getFullYear()}-${padLeft('' + (d.getMonth() + 1), 2, '0')}-${padLeft('' + d.getDate(), 2, '0')}`;
}
function padLeft(str, length, pad = ' ') {
    while (str.length < length) {
        str = pad + str;
    }
    return str;
}
function padRight(str, length, pad = ' ') {
    while (str.length < length) {
        str += pad;
    }
    return str;
}

class DaytimePipe {
    transform(value, duration) {
        if (!value) {
            return '';
        }
        if (typeof value === 'string') {
            const parts = value.split(":");
            if (parts.length != 2) {
                return '';
            }
            const hour = BigInt(+parts[0]);
            const minute = BigInt(+parts[1]);
            value = new Daytime({
                hour,
                minute,
            });
        }
        if (duration !== undefined) {
            const seconds = Number(value.hour) * 60 * 60 + Number(value.minute) * 60 + Number(duration.seconds);
            const hour = Math.floor(seconds / 60 / 60);
            const minutes = Math.floor((seconds - (hour * 60 * 60)) / 60);
            value = new Daytime({
                hour: BigInt(hour),
                minute: BigInt(minutes),
            });
        }
        return padLeft(`${value.hour}`, 2, '0') + ':' + padLeft(`${value.minute}`, 2, '0');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DaytimePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DaytimePipe, isStandalone: true, name: "daytime" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DaytimePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'daytime',
                    pure: true,
                    standalone: true,
                }]
        }] });

class RoleListPipe {
    transform(value, roles) {
        if (!value) {
            return '';
        }
        return value
            .map(id => roles.find(role => role.id === id))
            .filter(role => !!role)
            .map(role => role.name)
            .join(', ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RoleListPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: RoleListPipe, isStandalone: true, name: "roleList" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RoleListPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'roleList',
                    pure: true,
                    standalone: true,
                }]
        }] });

var Workday;
(function (Workday) {
    Workday[Workday["So"] = 0] = "So";
    Workday[Workday["Mo"] = 1] = "Mo";
    Workday[Workday["Di"] = 2] = "Di";
    Workday[Workday["Mi"] = 3] = "Mi";
    Workday[Workday["Do"] = 4] = "Do";
    Workday[Workday["Fr"] = 5] = "Fr";
    Workday[Workday["Sa"] = 6] = "Sa";
})(Workday || (Workday = {}));
class WorkDayPipe {
    transform(value, ...args) {
        if (!value) {
            return '';
        }
        return value
            .map(day => Workday[day])
            .join(', ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: WorkDayPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: WorkDayPipe, isStandalone: true, name: "workday" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: WorkDayPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'workday',
                    pure: true,
                    standalone: true,
                }]
        }] });

const nanosecond = 1;
const microsecond = 1000 * nanosecond;
const millisecond = 1000 * microsecond;
const second = 1000 * millisecond;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
class Duration {
    constructor(ns) {
        this._nanoseconds = ns;
    }
    toProto() {
        return new Duration$1({
            seconds: BigInt(this.seconds),
        });
    }
    get nanoseconds() {
        return this._nanoseconds;
    }
    get microseconds() {
        return Math.floor(this._nanoseconds / microsecond);
    }
    get milliseconds() {
        return Math.floor(this._nanoseconds / millisecond);
    }
    get seconds() {
        return Math.floor(this._nanoseconds / second);
    }
    get minutes() {
        return Math.floor(this._nanoseconds / minute);
    }
    get hours() {
        return Math.floor(this._nanoseconds / hour);
    }
    static { this.nanosecond = new Duration(nanosecond); }
    static { this.microsecond = new Duration(microsecond); }
    static { this.millisecond = new Duration(millisecond); }
    static { this.second = new Duration(second); }
    static { this.minute = new Duration(minute); }
    static { this.hour = new Duration(hour); }
    static nanoseconds(s) {
        return new Duration(s * nanosecond);
    }
    static microseconds(s) {
        return new Duration(s * microsecond);
    }
    static milliseconds(s) {
        return new Duration(s * millisecond);
    }
    static seconds(s) {
        return new Duration(s * second);
    }
    static minutes(s) {
        return new Duration(s * minute);
    }
    static hours(s) {
        return new Duration(s * hour);
    }
    addTo(d) {
        return new Date(d.getTime() + this.milliseconds);
    }
    format(layout = 'default') {
        if (layout === 'default' || layout === 'default-hours') {
            return this.toString(layout === 'default-hours');
        }
        const sign = this._nanoseconds < 0 ? '-' : '';
        let ns = Math.abs(this._nanoseconds);
        const hours = Math.floor(ns / hour);
        ns -= hours * hour;
        const minutes = Math.floor(ns / minute);
        ns -= minutes * minute;
        const seconds = Math.floor(ns / second);
        ns -= seconds * second;
        let str = padLeft(hours.toString(), 2, '0') + ':' + padLeft(minutes.toString(), 2, '0');
        if (layout === 'hh:mm:ss') {
            str += ':' + padLeft(seconds.toString(), 2, '0');
        }
        return sign + str;
    }
    toString(skipDays = false) {
        const sign = this._nanoseconds < 0 ? '-' : '';
        let ns = Math.abs(this._nanoseconds);
        let str = '';
        if (this._nanoseconds === 0) {
            return '0h';
        }
        if (!skipDays) {
            const days = Math.floor(ns / day);
            if (days > 0) {
                str += days.toString() + 'd ';
                ns -= days * day;
            }
        }
        const hours = Math.floor(ns / hour);
        if (hours > 0) {
            str += hours.toString() + 'h ';
            ns -= hours * hour;
        }
        const minutes = Math.floor(ns / minute);
        if (minutes > 0) {
            str += minutes.toString() + 'm ';
            ns -= minutes * minute;
        }
        const seconds = Math.floor(ns / second);
        if (seconds > 0) {
            str += seconds.toString() + 's ';
            ns -= seconds * second;
        }
        const milliseconds = Math.floor(ns / millisecond);
        if (milliseconds > 0) {
            str += milliseconds.toString() + 'ms ';
            ns -= milliseconds * millisecond;
        }
        const microseconds = Math.floor(ns / microsecond);
        if (microseconds > 0) {
            str += microseconds.toString() + 'µs ';
            ns -= microseconds * microsecond;
        }
        if (ns > 0) {
            str += ns.toString() + 'ns';
            ns -= ns * nanosecond;
        }
        if (str.endsWith("")) {
            str = str.substring(0, str.length - 1);
        }
        return sign + str;
    }
    static parseString(v) {
        let time = 0;
        let numberValue = '';
        let suffix = '';
        let state = 'number';
        let parseFactor = 1;
        const parse = () => {
            let factor = 0;
            switch (suffix) {
                case 'd':
                    factor = day;
                    break;
                case 'h':
                    factor = hour;
                    break;
                case 'm':
                    factor = minute;
                    break;
                case 's':
                    factor = second;
                    break;
                case 'ms':
                    factor = millisecond;
                    break;
                case 'µs':
                    factor = microsecond;
                    break;
                case 'ns':
                    factor = nanosecond;
                    break;
                default:
                    throw new Error(`invalid time factor: ${suffix}`);
            }
            time += ((+numberValue) * factor);
        };
        try {
            for (let i = 0; i < v.length; i++) {
                const c = v.charAt(i);
                if (c === ' ') {
                    continue;
                }
                if (c === '-' && numberValue === '') {
                    parseFactor = -1;
                    continue;
                }
                if (state === 'number') {
                    if (!isNaN(+c)) {
                        numberValue += c;
                        continue;
                    }
                    state = 'suffix';
                    suffix += c;
                    continue;
                }
                if (state === 'suffix') {
                    if (isNaN(+c)) {
                        suffix += c;
                        continue;
                    }
                    parse();
                    numberValue = c;
                    suffix = '';
                    state = 'number';
                }
            }
            if (numberValue !== '') {
                parse();
            }
            return new Duration(parseFactor * time);
        }
        catch (err) {
            return new Duration(0);
        }
    }
    isLessThan(d) {
        return this.nanoseconds < d.nanoseconds;
    }
    isGreatherThan(d) {
        return this.nanoseconds > d.nanoseconds;
    }
    isEqual(d) {
        return this.nanoseconds === d.nanoseconds;
    }
    valueOf() {
        return this._nanoseconds;
    }
}
function formatDate(d, sep = '-') {
    if (d === null) {
        return '';
    }
    d = new Date(d);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join(sep);
}

class DurationPipe {
    transform(value, layout = 'default', input = 's') {
        if (value === undefined || value === null) {
            return '';
        }
        if (value instanceof Duration$1 || (typeof value === 'object' && value.hasOwnProperty('seconds'))) {
            value = value.seconds;
            if (input !== 's') {
                throw new Error('invalid input type when Duration from @bufbuild/protobuf is passed');
            }
        }
        value = Number(value);
        let d;
        switch (input) {
            case 'h':
                d = Duration.hours(+value);
                break;
            case 'm':
                d = Duration.minutes(+value);
                break;
            case 's':
                d = Duration.seconds(+value);
                break;
            case 'ms':
                d = Duration.milliseconds(+value);
                break;
            case 'µs':
                d = Duration.microseconds(+value);
                break;
            case 'ns':
                d = Duration.nanoseconds(+value);
                break;
            default:
                if (isDevMode()) {
                    return 'WRONG_LAYOUT';
                }
                return '';
        }
        return d.format(layout);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DurationPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DurationPipe, isStandalone: true, name: "duration" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DurationPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'duration',
                    pure: true,
                    standalone: true,
                }]
        }] });

class TkdInListPipe {
    transform(value, list) {
        if (value === undefined || value === null) {
            return false;
        }
        if (list === null || list === undefined) {
            return false;
        }
        if (list instanceof Set) {
            return list.has(value);
        }
        return Array.from(list).some(t => t === value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TkdInListPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TkdInListPipe, isStandalone: true, name: "inList" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TkdInListPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'inList',
                    pure: true,
                    standalone: true,
                }]
        }] });

class ToUserPipe {
    transform(idOrProfile, profiles) {
        if (idOrProfile instanceof Profile) {
            return idOrProfile;
        }
        return profiles.find(p => p.user?.id === idOrProfile) || null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToUserPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ToUserPipe, isStandalone: true, name: "toUser" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToUserPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'toUser',
                    pure: true,
                    standalone: true,
                }]
        }] });
class DisplayNamePipe {
    transform(value, ...args) {
        if (!value) {
            return '';
        }
        if (value.user?.displayName) {
            return value.user.displayName;
        }
        if (value.user?.username) {
            return value.user.username;
        }
        return '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DisplayNamePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DisplayNamePipe, isStandalone: true, name: "displayName" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DisplayNamePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: "displayName",
                    pure: true,
                    standalone: true,
                }]
        }] });

var UserExtraKey;
(function (UserExtraKey) {
    UserExtraKey["CalendarID"] = "calendarId";
    UserExtraKey["Color"] = "color";
})(UserExtraKey || (UserExtraKey = {}));
function getCalendarId(user) {
    const prop = user.user?.extra?.fields[UserExtraKey.CalendarID];
    if (!prop || prop.kind.case !== 'stringValue') {
        return null;
    }
    return prop.kind.value;
}
function getUserColor(user) {
    const prop = user.user?.extra?.fields[UserExtraKey.Color];
    if (!prop || prop.kind.case !== 'stringValue') {
        return null;
    }
    return prop.kind.value;
}
function parseColor(input) {
    if (input.substr(0, 1) === '#') {
        const collen = (input.length - 1) / 3;
        const fact = [17, 1, 0.062272][collen - 1];
        return [
            Math.round(parseInt(input.substr(1, collen), 16) * fact),
            Math.round(parseInt(input.substr(1 + collen, collen), 16) * fact),
            Math.round(parseInt(input.substr(1 + 2 * collen, collen), 16) * fact),
        ];
    }
    return input
        .split('(')[1]
        .split(')')[0]
        .split(',')
        .map((x) => +x);
}
function getContrastFontColor(bgColor) {
    // if (red*0.299 + green*0.587 + blue*0.114) > 186 use #000000 else use #ffffff
    // based on https://stackoverflow.com/a/3943023
    if (bgColor === null) {
        return '#000000';
    }
    let col = bgColor;
    if (bgColor.startsWith('#') && bgColor.length > 7) {
        col = bgColor.slice(0, 7);
    }
    const [r, g, b] = parseColor(col);
    if (r * 0.299 + g * 0.587 + b * 0.114 > 186) {
        return '#000000';
    }
    return '#ffffff';
}
class UserColorPipe {
    transform(value, ...args) {
        return getUserColor(value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserColorPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: UserColorPipe, isStandalone: true, name: "color" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserColorPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'color',
                    pure: true,
                    standalone: true,
                }]
        }] });
class UserContrastColorPipe {
    transform(value, ...args) {
        return getContrastFontColor(getUserColor(value));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserContrastColorPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: UserContrastColorPipe, isStandalone: true, name: "contrastColor" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserContrastColorPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'contrastColor',
                    pure: true,
                    standalone: true,
                }]
        }] });

/*
 * Public API Surface of connect
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DaytimePipe, DisplayNamePipe, Duration, DurationPipe, RoleListPipe, TkdInListPipe, ToUserPipe, UserColorPipe, UserContrastColorPipe, UserExtraKey, WorkDayPipe, Workday, formatDate, getCalendarId, getContrastFontColor, getUserColor, parseColor };
//# sourceMappingURL=tkd-angular-pipes.mjs.map
