import { Pipe } from "@angular/core";
import * as i0 from "@angular/core";
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
export function getUserColor(profile) {
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
export { UserNamePipe };
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
export { UserColorPipe };
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
export { UserContrastColorPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UserContrastColorPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'contrastColor',
                    pure: true
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5waXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2Rldi9wcm9qZWN0cy9hbmd1bGFyL3NyYy91c2VyLnBpcGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUdwRCxJQUFLLFlBR0o7QUFIRCxXQUFLLFlBQVk7SUFDZix5Q0FBeUIsQ0FBQTtJQUN6QiwrQkFBZSxDQUFBO0FBQ2pCLENBQUMsRUFISSxZQUFZLEtBQVosWUFBWSxRQUdoQjtBQXVCRCxTQUFTLFVBQVUsQ0FBQyxLQUFhO0lBQy9CLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQzlCLE1BQU0sTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQyxPQUFPO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3hELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDdEUsQ0FBQztLQUNIO0lBRUQsT0FBTyxLQUFLO1NBQ1QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNiLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDYixLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLE9BQWU7SUFDM0MsK0VBQStFO0lBQy9FLCtDQUErQztJQUUvQyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUM7SUFDbEIsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2pELEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUMzQjtJQUNELE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVsQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLEdBQUcsRUFBRTtRQUMzQyxPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLE9BQThCO0lBQ3pELE1BQU0sSUFBSSxHQUFHLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFOUQsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxhQUFhLEVBQUU7UUFDN0MsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDekIsQ0FBQztBQUVELE1BSWEsWUFBWTtJQUNyQixNQUFNLENBQUMsU0FBUyxDQUFDLEtBQWUsRUFBRSxHQUFHLElBQVc7UUFDNUMsT0FBTyxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsSUFBSSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQztJQUM3RCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQWUsRUFBRSxHQUFHLElBQVc7UUFDdkMsT0FBTyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDOytHQVBRLFlBQVk7NkdBQVosWUFBWTs7U0FBWixZQUFZOzRGQUFaLFlBQVk7a0JBSnhCLElBQUk7bUJBQUM7b0JBQ0YsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxJQUFJO2lCQUNiOztBQVdELE1BSWEsYUFBYTtJQUN0QixTQUFTLENBQUMsS0FBYyxFQUFFLEdBQUcsSUFBVztRQUN0QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM1QixDQUFDOytHQUhRLGFBQWE7NkdBQWIsYUFBYTs7U0FBYixhQUFhOzRGQUFiLGFBQWE7a0JBSnpCLElBQUk7bUJBQUM7b0JBQ0YsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLElBQUk7aUJBQ2I7O0FBT0QsTUFJYSxxQkFBcUI7SUFDOUIsU0FBUyxDQUFDLEtBQWMsRUFBRSxHQUFHLElBQVc7UUFDdEMsT0FBTyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUE7SUFDL0QsQ0FBQzsrR0FIUSxxQkFBcUI7NkdBQXJCLHFCQUFxQjs7U0FBckIscUJBQXFCOzRGQUFyQixxQkFBcUI7a0JBSmpDLElBQUk7bUJBQUM7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLElBQUksRUFBRSxJQUFJO2lCQUNiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQcm9maWxlLCBVc2VyIH0gZnJvbSBcIkB0a2QvYXBpc1wiO1xuXG5lbnVtIFVzZXJFeHRyYUtleSB7XG4gIENhbGVuZGFySUQgPSBcImNhbGVuZGFySWRcIixcbiAgQ29sb3IgPSBcImNvbG9yXCIsXG59XG5cbmludGVyZmFjZSBVc2VyUHJvZmlsZSBleHRlbmRzIFByb2ZpbGUge1xuICB1c2VyOiBVc2VyICYge1xuICAgIGV4dHJhOiB7XG4gICAgICBmaWVsZHM6IHtcbiAgICAgICAgW1VzZXJFeHRyYUtleS5DYWxlbmRhcklEXT86IHtcbiAgICAgICAgICBraW5kOiB7XG4gICAgICAgICAgICBjYXNlOiAnc3RyaW5nVmFsdWUnO1xuICAgICAgICAgICAgdmFsdWU6IHN0cmluZyxcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtVc2VyRXh0cmFLZXkuQ29sb3JdPzoge1xuICAgICAgICAgIGtpbmQ6IHtcbiAgICAgICAgICAgIGNhc2U6ICdzdHJpbmdWYWx1ZSc7XG4gICAgICAgICAgICB2YWx1ZTogc3RyaW5nLFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VDb2xvcihpbnB1dDogc3RyaW5nKTogbnVtYmVyW10ge1xuICBpZiAoaW5wdXQuc3Vic3RyKDAsIDEpID09PSAnIycpIHtcbiAgICBjb25zdCBjb2xsZW4gPSAoaW5wdXQubGVuZ3RoIC0gMSkgLyAzO1xuICAgIGNvbnN0IGZhY3QgPSBbMTcsIDEsIDAuMDYyMjcyXVtjb2xsZW4gLSAxXTtcbiAgICByZXR1cm4gW1xuICAgICAgTWF0aC5yb3VuZChwYXJzZUludChpbnB1dC5zdWJzdHIoMSwgY29sbGVuKSwgMTYpICogZmFjdCksXG4gICAgICBNYXRoLnJvdW5kKHBhcnNlSW50KGlucHV0LnN1YnN0cigxICsgY29sbGVuLCBjb2xsZW4pLCAxNikgKiBmYWN0KSxcbiAgICAgIE1hdGgucm91bmQocGFyc2VJbnQoaW5wdXQuc3Vic3RyKDEgKyAyICogY29sbGVuLCBjb2xsZW4pLCAxNikgKiBmYWN0KSxcbiAgICBdO1xuICB9XG5cbiAgcmV0dXJuIGlucHV0XG4gICAgLnNwbGl0KCcoJylbMV1cbiAgICAuc3BsaXQoJyknKVswXVxuICAgIC5zcGxpdCgnLCcpXG4gICAgLm1hcCgoeCkgPT4gK3gpO1xufVxuXG5mdW5jdGlvbiBnZXRDb250cmFzdEZvbnRDb2xvcihiZ0NvbG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBpZiAocmVkKjAuMjk5ICsgZ3JlZW4qMC41ODcgKyBibHVlKjAuMTE0KSA+IDE4NiB1c2UgIzAwMDAwMCBlbHNlIHVzZSAjZmZmZmZmXG4gIC8vIGJhc2VkIG9uIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTQzMDIzXG5cbiAgbGV0IGNvbCA9IGJnQ29sb3I7XG4gIGlmIChiZ0NvbG9yLnN0YXJ0c1dpdGgoJyMnKSAmJiBiZ0NvbG9yLmxlbmd0aCA+IDcpIHtcbiAgICBjb2wgPSBiZ0NvbG9yLnNsaWNlKDAsIDcpO1xuICB9XG4gIGNvbnN0IFtyLCBnLCBiXSA9IHBhcnNlQ29sb3IoY29sKTtcblxuICBpZiAociAqIDAuMjk5ICsgZyAqIDAuNTg3ICsgYiAqIDAuMTE0ID4gMTg2KSB7XG4gICAgcmV0dXJuICcjMDAwMDAwJztcbiAgfVxuXG4gIHJldHVybiAnI2ZmZmZmZic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyQ29sb3IocHJvZmlsZTogVXNlclByb2ZpbGUgfCBQcm9maWxlKTogc3RyaW5nIHwgbnVsbCB7XG4gIGNvbnN0IHByb3AgPSBwcm9maWxlPy51c2VyPy5leHRyYT8uZmllbGRzW1VzZXJFeHRyYUtleS5Db2xvcl07XG5cbiAgaWYgKCFwcm9wIHx8IHByb3Aua2luZC5jYXNlICE9PSAnc3RyaW5nVmFsdWUnKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHJldHVybiBwcm9wLmtpbmQudmFsdWU7XG59XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZGlzcGxheU5hbWUnLFxuICAgIHB1cmU6IHRydWVcbn0pXG5leHBvcnQgY2xhc3MgVXNlck5hbWVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgc3RhdGljIHRyYW5zZm9ybSh2YWx1ZT86IFByb2ZpbGUsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZT8udXNlcj8uZGlzcGxheU5hbWUgfHwgdmFsdWU/LnVzZXI/LnVzZXJuYW1lO1xuICAgIH1cblxuICAgIHRyYW5zZm9ybSh2YWx1ZT86IFByb2ZpbGUsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICByZXR1cm4gVXNlck5hbWVQaXBlLnRyYW5zZm9ybSh2YWx1ZSwgYXJncyk7XG4gICAgfVxufVxuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2NvbG9yJyxcbiAgICBwdXJlOiB0cnVlXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJDb2xvclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IFByb2ZpbGUsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICByZXR1cm4gZ2V0VXNlckNvbG9yKHZhbHVlKVxuICAgIH1cbn1cblxuQFBpcGUoe1xuICAgIG5hbWU6ICdjb250cmFzdENvbG9yJyxcbiAgICBwdXJlOiB0cnVlXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJDb250cmFzdENvbG9yUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogUHJvZmlsZSwgLi4uYXJnczogYW55W10pIHtcbiAgICAgIHJldHVybiBnZXRDb250cmFzdEZvbnRDb2xvcihnZXRVc2VyQ29sb3IodmFsdWUpIHx8ICcjZmZmZmZmJylcbiAgICB9XG59XG4iXX0=