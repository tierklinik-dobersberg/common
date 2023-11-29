import { Pipe } from "@angular/core";
import * as i0 from "@angular/core";
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
export { TkdInListPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TkdInListPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'inList',
                    pure: true,
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW4tbGlzdC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGV2L2NvbXBvbmVudHMvcGlwZXMvaW4tbGlzdC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUVwRCxNQUthLGFBQWE7SUFDeEIsU0FBUyxDQUFJLEtBQW9CLEVBQUUsSUFBcUQ7UUFDdEYsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDekMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3ZDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLElBQUksWUFBWSxHQUFHLEVBQUU7WUFDdkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3ZCO1FBRUQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDOytHQWZVLGFBQWE7NkdBQWIsYUFBYTs7U0FBYixhQUFhOzRGQUFiLGFBQWE7a0JBTHpCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLElBQUk7b0JBQ1YsVUFBVSxFQUFFLElBQUk7aUJBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2luTGlzdCcsXG4gIHB1cmU6IHRydWUsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIFRrZEluTGlzdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtPFQ+KHZhbHVlOiBUIHwgdW5kZWZpbmVkLCBsaXN0OiBJdGVyYWJsZTxUPiB8IEFycmF5TGlrZTxUPiB8IFNldDxUPiB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGxpc3QgPT09IG51bGwgfHwgbGlzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGxpc3QgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgIHJldHVybiBsaXN0Lmhhcyh2YWx1ZSlcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbShsaXN0KS5zb21lKHQgPT4gdCA9PT0gdmFsdWUpO1xuICB9XG59XG4iXX0=