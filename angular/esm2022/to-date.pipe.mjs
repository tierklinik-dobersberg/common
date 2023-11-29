import { Timestamp } from '@bufbuild/protobuf';
import { Pipe } from "@angular/core";
import * as i0 from "@angular/core";
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
export { ToDatePipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToDatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'toDate',
                    pure: true
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tZGF0ZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vZGV2L3Byb2plY3RzL2FuZ3VsYXIvc3JjL3RvLWRhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBRXBELE1BSWEsVUFBVTtJQUNyQixTQUFTLENBQUMsS0FBeUMsRUFBRSxHQUFHLElBQVc7UUFDakUsSUFBSSxLQUFLLFlBQVksU0FBUyxFQUFFO1lBQzlCLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDeEI7UUFFRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDeEI7UUFFRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFBO1NBQy9CO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOytHQWZVLFVBQVU7NkdBQVYsVUFBVTs7U0FBVixVQUFVOzRGQUFWLFVBQVU7a0JBSnRCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLElBQUk7aUJBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaW1lc3RhbXAgfSBmcm9tICdAYnVmYnVpbGQvcHJvdG9idWYnO1xuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3RvRGF0ZScsXG4gIHB1cmU6IHRydWVcbn0pXG5leHBvcnQgY2xhc3MgVG9EYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IFRpbWVzdGFtcCB8IERhdGUgfCBzdHJpbmcgfCBudW1iZXIsIC4uLmFyZ3M6IGFueVtdKTogRGF0ZSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGltZXN0YW1wKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnRvRGF0ZSgpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlICogMTAwMClcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbiJdfQ==