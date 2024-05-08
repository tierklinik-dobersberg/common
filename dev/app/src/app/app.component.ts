import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { HlmButtonDirective } from '@tierklinik-dobersberg/angular/ui-button-helm/src';
import { HlmIconComponent, provideIcons } from '@tierklinik-dobersberg/angular/ui-icon-helm/src';
import { lucideMail } from '@ng-icons/lucide';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CdkMenuModule,
    OverlayModule,
    NgIconsModule,
    FormsModule,
    HlmButtonDirective,
    HlmIconComponent
  ],
  providers: [
    ...provideIcons({
      "lucideMail": lucideMail
    }),
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
export class AppComponent {
}
