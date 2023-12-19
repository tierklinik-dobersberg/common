import { NgClass, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, InjectionToken, Input, OnDestroy, OnInit, QueryList, booleanAttribute, inject } from "@angular/core";
import { NgIconsModule, provideIcons } from "@ng-icons/core";
import { heroChevronRightMini } from '@ng-icons/heroicons/mini';
import { fadeInAnimation, fadeOutAnimation } from "@tierklinik-dobersberg/angular/animations";
import { TkdDropdown } from "@tierklinik-dobersberg/angular/dropdown";

const TKD_MENU_ITEM = new InjectionToken<TkdMenuItem | TkdSubMenu>('TKD_MENU_ITEM');

@Component({
    selector: 'tkd-menu-item',
    standalone: true,
    imports: [
        NgIf,
        NgIconsModule,
    ],
    hostDirectives: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div (click)="handleClick($event)" class="flex flex-row gap-3 tkd-menu-item-content items-center cursor-pointer hover:bg-subtle px-5 py-2 lg:px-3 lg:py-1 text-sm lg:text-[0.8rem] font-light">
        <ng-icon size="1rem" *ngIf="icon !== null && icon !== ''" [name]="icon"></ng-icon>
        <span class="inline-block w-4 h-4" *ngIf="icon === ''"></span>
        <span class="flex-grow">{{ title }}</span>
    </div> 
    `,
    providers: [
        {provide: TKD_MENU_ITEM, useExisting: TkdMenuItem, multi: true},
    ],
    styles: [
        `
        :host {
            display: block;
        }
        `
    ]
})
export class TkdMenuItem  {
    private readonly dropdown = inject(TkdDropdown, {
        optional: true,
    })

    @Input()
    title: string = '';

    @Input()
    icon: string | null = null;

    @Input({transform: booleanAttribute})
    closeOnClick = true;

    handleClick(event: MouseEvent) {
        if (this.closeOnClick) {
            this.dropdown?.close();
        }
    }
}

@Component({
    selector: 'tkd-sub-menu',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        NgIconsModule,
        NgClass,
        TkdMenuItem,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        fadeInAnimation,
        fadeOutAnimation,
    ],
    template: `
    <div (click)="handleClick($event)" class="flex flex-row gap-3 tkd-menu-item-content items-center cursor-pointer hover:bg-subtle px-5 py-2 lg:px-3 lg:py-1 text-sm lg:text-[0.8rem] font-light">
        <ng-icon size="1rem" *ngIf="icon !== null && icon !== ''" [name]="icon"></ng-icon>
        <span class="inline-block w-4 h-4" *ngIf="icon === ''"></span>
        <span class="flex-grow">{{ title }}</span>
        <ng-icon size="1rem" strokeWidth="1px" name="heroChevronRightMini" class="transition-all duration-200 ease-in-out" [ngClass]="{'transform rotate-90': showMenu}"></ng-icon>
    </div>
    <div *ngIf="showMenu" [@fadeIn] [@fadeOut] [ngClass]="{'ml-3': icon === null, 'ml-9': icon !== null}">
        <ng-content></ng-content>
    </div>
    `,
    providers: [
        {provide: TKD_MENU_ITEM, useExisting: TkdSubMenu, multi: true},
        provideIcons({heroChevronRightMini})
    ],
    styles: [
        `
        :host {
            display: block;
        }
        `
    ]
})
export class TkdSubMenu implements OnDestroy, OnInit {
    @ContentChildren(TKD_MENU_ITEM)
    items!: QueryList<TkdMenuItem | TkdSubMenu>;

    private readonly cdr = inject(ChangeDetectorRef);

    private readonly dropdown = inject(TkdDropdown, {
        optional: true,
    })

    showMenu = false;

    @Input()
    title: string = '';

    @Input()
    icon: string | null = null;

    handleClick(event: MouseEvent) {
        this.showMenu = !this.showMenu;

        this.items
            .forEach(item => {
                if (item instanceof TkdSubMenu) {
                    item.showMenu = false;
                    item.cdr.markForCheck();
                }
            })
    }

    ngOnInit(): void {
        this.dropdown?.closed
            .subscribe(() => {
                this.showMenu = false;
                this.cdr.markForCheck();
            })
    }

    ngOnDestroy(): void {
        this.showMenu = false;
        this.cdr.markForCheck();
    }
}