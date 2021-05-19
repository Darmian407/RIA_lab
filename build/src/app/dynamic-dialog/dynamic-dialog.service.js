import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DynamicDialogComponent } from './dynamic-dialog.component';
export class DynamicDlgField {
    constructor(typeParam) {
        this.errors_ = [];
        this.errors = () => this.errors_;
        this.validate = () => true;
        this.hasErrors = () => this.errors_.length > 0;
        this.type = typeParam;
    }
    addError(error) {
        if (this.errors_.find(e => e.message === error.message))
            return;
        this.errors_.push(error);
    }
    pushErrorWhen(condition, message) {
        if (!condition) {
            const index = this.errors_.findIndex(e => e.message === message);
            if (index >= 0)
                this.errors_.splice(index, 1);
            return true;
        }
        this.addError({ message });
        return false;
    }
}
export class DynamicNumberField extends DynamicDlgField {
    constructor(init) {
        super("number");
        this.validate = () => {
            this.pushErrorWhen(this.min && this.value < this.min, `value cannot be below ${this.min}`);
            this.pushErrorWhen(this.max && this.value > this.max, `value cannot be above ${this.max}`);
            return this.hasErrors();
        };
        Object.assign(this, init);
    }
}
export class DynamicStringField extends DynamicDlgField {
    constructor(init) {
        super("string");
        this.validate = () => {
            console.log("validate string field");
            // super.validate()
            this.pushErrorWhen(!this.value || this.value.length === 0, `field is required`);
            this.pushErrorWhen(this.minLength ? this.value.length >= this.minLength : false, `field length must be at least ${this.minLength} characters`);
            this.pushErrorWhen(this.maxLength ? this.value.length <= this.maxLength : false, `field length may not exeed ${this.maxLength} characters`);
            this.pushErrorWhen(this.re && !new RegExp(this.re).test(this.value), `field does not meet constraints ${this.re}`);
            return this.hasErrors();
        };
        Object.assign(this, init);
    }
}
export class DynamicBooleanField extends DynamicDlgField {
    constructor(init) {
        super("boolean");
        Object.assign(this, init);
    }
}
export class DynamicRadioField extends DynamicDlgField {
    constructor(init) {
        super("radio");
        Object.assign(this, init);
    }
}
export class DynamicMultiselectField extends DynamicDlgField {
    constructor(init) {
        super("multiselect");
        Object.assign(this, init);
    }
}
export function createFieldConfig(fieldValue) {
    // Logger.info(property.name, typeof value, value instanceof Number)
    if (typeof fieldValue === "boolean")
        return new DynamicBooleanField({});
    if (typeof fieldValue === "number")
        return new DynamicNumberField({});
    if (typeof fieldValue === "string")
        return new DynamicStringField({});
    return new DynamicStringField({
        multiLine: true
    });
}
let DynamicDialogService = class DynamicDialogService {
    constructor(dialogService) {
        this.dialogService = dialogService;
    }
    accept(cb) {
    }
    open(params) {
        // console.log(params)
        const ref = this.dialogService.open(DynamicDialogComponent, {
            header: params.header,
            width: params.width || "30%",
            height: params.height || "200px",
            data: params,
        });
    }
};
DynamicDialogService = __decorate([
    Injectable()
], DynamicDialogService);
export { DynamicDialogService };
//# sourceMappingURL=dynamic-dialog.service.js.map