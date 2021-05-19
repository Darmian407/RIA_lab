import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { createFieldConfig } from './dynamic-dialog.service';
let DynamicDialogComponent = class DynamicDialogComponent {
    constructor(ref, config, formBuilder) {
        this.ref = ref;
        this.config = config;
        this.formBuilder = formBuilder;
        this.visibke = true;
        console.log("constructor");
        this.params = this.config.data;
        this.params.submitButtonText = this.params.submitButtonText || "Ok";
        this.params.cancelButtonText = this.params.cancelButtonText || "Cancel";
        this.params.showCancelButton = this.params.showCancelButton || true;
        this.params.errors = {};
        this.groupedFields = {};
        this.fields = [];
        Object.keys(this.params.fields).forEach(key => {
            if (!this.params.fieldsConfig)
                this.params.fieldsConfig = {};
            if (!this.params.fieldsConfig[key]) {
                this.params.fieldsConfig[key] = createFieldConfig(this.params.fields[key]);
            }
            const fieldConfig = this.params.fieldsConfig[key];
            const value = this.params.fields[key];
            if (value !== undefined && value !== null) {
                fieldConfig.value = value;
            }
            if (fieldConfig.group) {
                if (!this.groupedFields[fieldConfig.group])
                    this.groupedFields[fieldConfig.group] = [];
                this.groupedFields[fieldConfig.group].push(fieldConfig);
            }
            else
                this.fields.push(fieldConfig);
            // fieldConfig.errors = {}
            fieldConfig.labelClass = fieldConfig.labelClass || "label-top";
            fieldConfig.labelName = fieldConfig.labelName || key.charAt(0).toUpperCase() + key.slice(1);
        });
        // this.fields = Object.keys(this.params.fieldsConfig).map(key => this.params.fieldsConfig[key])
        // Logger.info(this.fields)
        // Object.keys(this.params.fields).forEach(key => {
        //     this.params.errors[key] = {}
        // })
        console.log("config", this.config, this.ref);
    }
    onValueChange(field) {
        console.log("onValueChange", field, this);
        if (field.onValidateChange) {
            let result = field.onValidateChange(field.value);
            if (result !== true) {
                field.addError(result);
            }
        }
        this.validateForm();
    }
    validateForm() {
        let hasErrors = false;
        this.fields.forEach(field => {
            console.log("validate field", field, hasErrors);
            hasErrors = hasErrors || !field.validate();
        });
        this.submitButton.disabled = hasErrors;
    }
    onSubmit() {
        // Logger.info(this.fields)
        this.validateForm();
        if (this.params.onAccept)
            this.params.onAccept(this.params);
        this.ref.close();
    }
    onCancel() {
        if (this.params.onCancel)
            this.params.onCancel();
        this.ref.close();
    }
    ngOnInit() {
        this.validateForm();
    }
};
__decorate([
    ViewChild("submitButton", { static: true })
], DynamicDialogComponent.prototype, "submitButton", void 0);
DynamicDialogComponent = __decorate([
    Component({
        selector: 'dynamic-dialog',
        templateUrl: './dynamic-dialog.component.html',
        styleUrls: ['./dynamic-dialog.component.scss']
    })
], DynamicDialogComponent);
export { DynamicDialogComponent };
//# sourceMappingURL=dynamic-dialog.component.spec.js.map