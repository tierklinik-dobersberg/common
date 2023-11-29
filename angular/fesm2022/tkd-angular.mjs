import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';
import { Timestamp } from '@bufbuild/protobuf';

var UserExtraKey;
(function (UserExtraKey) {
    UserExtraKey["CalendarID"] = "calendarId";
    UserExtraKey["Color"] = "color";
})(UserExtraKey || (UserExtraKey = {}));
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
function getUserColor(profile) {
    const prop = profile?.user?.extra?.fields[UserExtraKey.Color];
    if (!prop || prop.kind.case !== 'stringValue') {
        return null;
    }
    return prop.kind.value;
}
class UserNamePipe {
    static transform(value, ...args) {
        return value?.user?.displayName || value?.user?.username;
    }
    transform(value, ...args) {
        return UserNamePipe.transform(value, args);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserNamePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: UserNamePipe, name: "displayName" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserNamePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'displayName',
                    pure: true
                }]
        }] });
class UserColorPipe {
    transform(value, ...args) {
        return getUserColor(value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserColorPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: UserColorPipe, name: "color" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserColorPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'color',
                    pure: true
                }]
        }] });
class UserContrastColorPipe {
    transform(value, ...args) {
        return getContrastFontColor(getUserColor(value) || '#ffffff');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserContrastColorPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: UserContrastColorPipe, name: "contrastColor" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserContrastColorPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'contrastColor',
                    pure: true
                }]
        }] });

class ToDatePipe {
    transform(value, ...args) {
        if (value instanceof Timestamp) {
            value = value.toDate();
        }
        if (typeof value === 'string') {
            value = new Date(value);
        }
        if (typeof value === 'number') {
            value = new Date(value * 1000);
        }
        return value;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToDatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ToDatePipe, name: "toDate" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToDatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'toDate',
                    pure: true
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ToDatePipe, UserColorPipe, UserContrastColorPipe, UserNamePipe, getUserColor };
//# sourceMappingURL=tkd-angular.mjs.map
