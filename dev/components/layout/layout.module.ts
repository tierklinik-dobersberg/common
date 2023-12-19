import { NgModule } from "@angular/core";
import { LayoutService } from "./layout.service";

@NgModule({
    providers: [
        {
            provide: LayoutService,
            useClass: LayoutService,
        }
    ]
})
export class TkdLayoutModule {}
