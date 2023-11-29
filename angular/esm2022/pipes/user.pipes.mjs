import { Pipe } from "@angular/core";
import * as i0 from "@angular/core";
export var UserExtraKey;
(function (UserExtraKey) {
    UserExtraKey["CalendarID"] = "calendarId";
    UserExtraKey["Color"] = "color";
})(UserExtraKey || (UserExtraKey = {}));
export function getCalendarId(user) {
    const prop = user.user?.extra?.fields[UserExtraKey.CalendarID];
    if (!prop || prop.kind.case !== 'stringValue') {
        return null;
    }
    return prop.kind.value;
}
export function getUserColor(user) {
    const prop = user.user?.extra?.fields[UserExtraKey.Color];
    if (!prop || prop.kind.case !== 'stringValue') {
        return null;
    }
    return prop.kind.value;
}
export function parseColor(input) {
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
export function getContrastFontColor(bgColor) {
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
export { UserColorPipe };
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
export { UserContrastColorPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserContrastColorPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'contrastColor',
                    pure: true,
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5waXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rldi9jb21wb25lbnRzL3BpcGVzL3VzZXIucGlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBR3BELE1BQU0sQ0FBTixJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDdEIseUNBQXlCLENBQUE7SUFDekIsK0JBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSFcsWUFBWSxLQUFaLFlBQVksUUFHdkI7QUF1QkQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxJQUEyQjtJQUN2RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9ELElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO1FBQzdDLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3pCLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLElBQTJCO0lBQ3RELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFMUQsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxhQUFhLEVBQUU7UUFDN0MsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDekIsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBYTtJQUN0QyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQUM5QixNQUFNLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0MsT0FBTztZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN4RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ3RFLENBQUM7S0FDSDtJQUVELE9BQU8sS0FBSztTQUNULEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDYixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2IsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLE9BQXNCO0lBQ3pELCtFQUErRTtJQUMvRSwrQ0FBK0M7SUFFL0MsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1FBQ3BCLE9BQU8sU0FBUyxDQUFBO0tBQ2pCO0lBRUQsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDO0lBQ2xCLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNqRCxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDM0I7SUFDRCxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbEMsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxHQUFHLEVBQUU7UUFDM0MsT0FBTyxTQUFTLENBQUM7S0FDbEI7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBRUQsTUFLYSxhQUFhO0lBQ3RCLFNBQVMsQ0FBQyxLQUFjLEVBQUUsR0FBRyxJQUFXO1FBQ3RDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzVCLENBQUM7K0dBSFEsYUFBYTs2R0FBYixhQUFhOztTQUFiLGFBQWE7NEZBQWIsYUFBYTtrQkFMekIsSUFBSTttQkFBQztvQkFDRixJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsSUFBSTtvQkFDVixVQUFVLEVBQUUsSUFBSTtpQkFDbkI7O0FBT0QsTUFLYSxxQkFBcUI7SUFDOUIsU0FBUyxDQUFDLEtBQWMsRUFBRSxHQUFHLElBQVc7UUFDdEMsT0FBTyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUNsRCxDQUFDOytHQUhRLHFCQUFxQjs2R0FBckIscUJBQXFCOztTQUFyQixxQkFBcUI7NEZBQXJCLHFCQUFxQjtrQkFMakMsSUFBSTttQkFBQztvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsSUFBSSxFQUFFLElBQUk7b0JBQ1YsVUFBVSxFQUFFLElBQUk7aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQcm9maWxlLCBVc2VyIH0gZnJvbSBcIkB0a2QvYXBpc1wiO1xuXG5leHBvcnQgZW51bSBVc2VyRXh0cmFLZXkge1xuICBDYWxlbmRhcklEID0gXCJjYWxlbmRhcklkXCIsXG4gIENvbG9yID0gXCJjb2xvclwiLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJQcm9maWxlIGV4dGVuZHMgUHJvZmlsZSB7XG4gIHVzZXI6IFVzZXIgJiB7XG4gICAgZXh0cmE6IHtcbiAgICAgIGZpZWxkczoge1xuICAgICAgICBbVXNlckV4dHJhS2V5LkNhbGVuZGFySURdPzoge1xuICAgICAgICAgIGtpbmQ6IHtcbiAgICAgICAgICAgIGNhc2U6ICdzdHJpbmdWYWx1ZSc7XG4gICAgICAgICAgICB2YWx1ZTogc3RyaW5nLFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1VzZXJFeHRyYUtleS5Db2xvcl0/OiB7XG4gICAgICAgICAga2luZDoge1xuICAgICAgICAgICAgY2FzZTogJ3N0cmluZ1ZhbHVlJztcbiAgICAgICAgICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FsZW5kYXJJZCh1c2VyOiBVc2VyUHJvZmlsZSB8IFByb2ZpbGUpOiBzdHJpbmcgfCBudWxsIHtcbiAgY29uc3QgcHJvcCA9IHVzZXIudXNlcj8uZXh0cmE/LmZpZWxkc1tVc2VyRXh0cmFLZXkuQ2FsZW5kYXJJRF07XG5cbiAgaWYgKCFwcm9wIHx8IHByb3Aua2luZC5jYXNlICE9PSAnc3RyaW5nVmFsdWUnKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHJldHVybiBwcm9wLmtpbmQudmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyQ29sb3IodXNlcjogVXNlclByb2ZpbGUgfCBQcm9maWxlKTogc3RyaW5nIHwgbnVsbCB7XG4gIGNvbnN0IHByb3AgPSB1c2VyLnVzZXI/LmV4dHJhPy5maWVsZHNbVXNlckV4dHJhS2V5LkNvbG9yXTtcblxuICBpZiAoIXByb3AgfHwgcHJvcC5raW5kLmNhc2UgIT09ICdzdHJpbmdWYWx1ZScpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIHByb3Aua2luZC52YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29sb3IoaW5wdXQ6IHN0cmluZyk6IG51bWJlcltdIHtcbiAgaWYgKGlucHV0LnN1YnN0cigwLCAxKSA9PT0gJyMnKSB7XG4gICAgY29uc3QgY29sbGVuID0gKGlucHV0Lmxlbmd0aCAtIDEpIC8gMztcbiAgICBjb25zdCBmYWN0ID0gWzE3LCAxLCAwLjA2MjI3Ml1bY29sbGVuIC0gMV07XG4gICAgcmV0dXJuIFtcbiAgICAgIE1hdGgucm91bmQocGFyc2VJbnQoaW5wdXQuc3Vic3RyKDEsIGNvbGxlbiksIDE2KSAqIGZhY3QpLFxuICAgICAgTWF0aC5yb3VuZChwYXJzZUludChpbnB1dC5zdWJzdHIoMSArIGNvbGxlbiwgY29sbGVuKSwgMTYpICogZmFjdCksXG4gICAgICBNYXRoLnJvdW5kKHBhcnNlSW50KGlucHV0LnN1YnN0cigxICsgMiAqIGNvbGxlbiwgY29sbGVuKSwgMTYpICogZmFjdCksXG4gICAgXTtcbiAgfVxuXG4gIHJldHVybiBpbnB1dFxuICAgIC5zcGxpdCgnKCcpWzFdXG4gICAgLnNwbGl0KCcpJylbMF1cbiAgICAuc3BsaXQoJywnKVxuICAgIC5tYXAoKHgpID0+ICt4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRyYXN0Rm9udENvbG9yKGJnQ29sb3I6IHN0cmluZyB8IG51bGwpOiBzdHJpbmcge1xuICAvLyBpZiAocmVkKjAuMjk5ICsgZ3JlZW4qMC41ODcgKyBibHVlKjAuMTE0KSA+IDE4NiB1c2UgIzAwMDAwMCBlbHNlIHVzZSAjZmZmZmZmXG4gIC8vIGJhc2VkIG9uIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTQzMDIzXG5cbiAgaWYgKGJnQ29sb3IgPT09IG51bGwpIHtcbiAgICByZXR1cm4gJyMwMDAwMDAnXG4gIH1cblxuICBsZXQgY29sID0gYmdDb2xvcjtcbiAgaWYgKGJnQ29sb3Iuc3RhcnRzV2l0aCgnIycpICYmIGJnQ29sb3IubGVuZ3RoID4gNykge1xuICAgIGNvbCA9IGJnQ29sb3Iuc2xpY2UoMCwgNyk7XG4gIH1cbiAgY29uc3QgW3IsIGcsIGJdID0gcGFyc2VDb2xvcihjb2wpO1xuXG4gIGlmIChyICogMC4yOTkgKyBnICogMC41ODcgKyBiICogMC4xMTQgPiAxODYpIHtcbiAgICByZXR1cm4gJyMwMDAwMDAnO1xuICB9XG5cbiAgcmV0dXJuICcjZmZmZmZmJztcbn1cblxuQFBpcGUoe1xuICAgIG5hbWU6ICdjb2xvcicsXG4gICAgcHVyZTogdHJ1ZSxcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyQ29sb3JQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHZhbHVlOiBQcm9maWxlLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgcmV0dXJuIGdldFVzZXJDb2xvcih2YWx1ZSlcbiAgICB9XG59XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnY29udHJhc3RDb2xvcicsXG4gICAgcHVyZTogdHJ1ZSxcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyQ29udHJhc3RDb2xvclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IFByb2ZpbGUsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICByZXR1cm4gZ2V0Q29udHJhc3RGb250Q29sb3IoZ2V0VXNlckNvbG9yKHZhbHVlKSlcbiAgICB9XG59XG4iXX0=