import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { TkdDropdown, TkdDropdownDirective } from '@tierklinik-dobersberg/angular/dropdown';
import { TkdMenuItem, TkdSubMenu } from '@tierklinik-dobersberg/angular/menu';
import { TkdSelectModule } from '@tierklinik-dobersberg/angular/select';
import { TkdDialogService } from '@tierklinik-dobersberg/angular/dialog'
import { TemplatePortal } from '@angular/cdk/portal';
import { TkdSwitchDirective } from '@tierklinik-dobersberg/angular/switch';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TkdDropdown,
    TkdDropdownDirective,
    TkdMenuItem,
    TkdSubMenu,
    TkdSelectModule,
    TkdSwitchDirective,
    CdkMenuModule,
    OverlayModule,
    NgIconsModule,
    FormsModule,
  ],
  providers: [
    TkdDialogService,
  ],
  templateUrl: './app.component.html',
  styles: [
    `
    :host {
      @apply block w-screen h-screen p-8;
    }
    `
  ],
})
export class AppComponent implements OnInit {
  title = 'showcase';
  select: string = '';

  private readonly dialog = inject(TkdDialogService);
  private readonly viewRef = inject(ViewContainerRef);

  @ViewChild('customTemplate', { static: true, read: TemplateRef })
  dialogTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    const portal = new TemplatePortal(this.dialogTemplate, this.viewRef, undefined);

  }
}
