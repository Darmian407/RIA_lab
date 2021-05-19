import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule as PDynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/api';
import { SpinnerModule, CheckboxModule } from 'primeng/primeng';
import { DynamicDialogComponent } from './dynamic-dialog.component';
import { DynamicDialogService } from './dynamic-dialog.service';
let DynamicDialogModule = class DynamicDialogModule {
};
DynamicDialogModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            PDynamicDialogModule,
            DialogModule,
            SpinnerModule, CheckboxModule
        ],
        declarations: [
            DynamicDialogComponent
        ],
        entryComponents: [
            DynamicDialogComponent
        ],
        exports: [
            DynamicDialogComponent,
            CheckboxModule
        ],
        providers: [
            DialogService,
            DynamicDialogService
        ]
    })
], DynamicDialogModule);
export { DynamicDialogModule };
//# sourceMappingURL=dynamic-dialog.component.js.map