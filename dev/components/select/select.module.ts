import { NgModule } from "@angular/core";
import { TkdSelect } from "./select";
import { TkdSelectOption } from "./option";

@NgModule({
    imports: [
        TkdSelect,
        TkdSelectOption
    ],
    exports: [
        TkdSelect,
        TkdSelectOption,
    ]
})
export class TkdSelectModule {}