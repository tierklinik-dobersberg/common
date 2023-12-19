import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TkdDropdown, TkdDropdownDirective } from '@tierklinik-dobersberg/angular/dropdown';
import { OverlayModule } from '@angular/cdk/overlay';
import { TkdMenuItem, TkdSubMenu } from '@tierklinik-dobersberg/angular/menu';
import { NgIconsModule } from '@ng-icons/core';
import { CdkMenu, CdkMenuModule } from '@angular/cdk/menu';
import { TkdSelectModule } from '@tierklinik-dobersberg/angular/select';
import { FormsModule } from '@angular/forms';

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
    CdkMenuModule,
    OverlayModule,
    NgIconsModule,
    FormsModule,
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
  title = 'showcase';
  select: string = '';
}
