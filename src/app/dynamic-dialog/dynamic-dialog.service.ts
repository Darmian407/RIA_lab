import { Injectable } from '@angular/core';
import {DialogService} from 'primeng/api';
import { DynamicDialogComponent } from './dynamic-dialog.component'
// import { types } from '../../shared/hklib/types'
import { FormBuilder } from '@angular/forms';
// import { Logger } from '../../shared/hklib';

type FieldType = "number" | "string" | "boolean" | "radio" | "dropdown" | "multiselect" | "textarea"

type InitializerList<T> = {
    [P in keyof T]?: T[P];
};

interface Error {
    message: string
}
export abstract class DynamicDlgField<T = any> {
    value?: T
    name?: string
    labelName?: string
    labelClass?: string
    required?: boolean
    group?: string
    
    protected type?: FieldType

    protected errors_?: Error[] = []


    public onValidateChange? (value: T): Error | true

    public errors? = () => this.errors_

    public validate? = (): boolean => true

    public hasErrors? = () => this.errors_.length > 0

    public addError?(error: Error) {
        if(this.errors_.find(e => e.message === error.message))
            return
        this.errors_.push(error)        
    } 
    protected constructor(typeParam?: FieldType) {
        this.type = typeParam
    }

    protected pushErrorWhen?(condition: boolean, message: string) {
        if(!condition) {
            const index = this.errors_.findIndex(e => e.message === message)
            if(index >= 0)
                this.errors_.splice(index, 1)
            return true
        }
        this.addError({ message })
        return false
    }
}

export class DynamicNumberField extends DynamicDlgField<number> {
    min?: number
    max?: number

    public constructor(init: InitializerList<DynamicNumberField>) {
        super("number")
        Object.assign(this, init);    
    }

    public validate? = (): boolean => {        
        this.pushErrorWhen(this.min && this.value < this.min, `value cannot be below ${this.min}`)
        this.pushErrorWhen(this.max && this.value > this.max, `value cannot be above ${this.max}`)
        return this.hasErrors()
    }       
}

export class DynamicStringField extends DynamicDlgField<string> {
    minLength?: number
    maxLength?: number
    re?: string
    multiLine?: boolean
    public constructor(init: InitializerList<DynamicStringField>) {
        super("string")
        Object.assign(this, init);
    }  
    validate? = (): boolean => {
        console.log("validate string field")
        // super.validate()
        this.pushErrorWhen(!this.value || this.value.length === 0, `field is required`)
        this.pushErrorWhen(this.minLength ? this.value.length >= this.minLength : false
            , `field length must be at least ${this.minLength} characters`)
        this.pushErrorWhen(this.maxLength ? this.value.length <= this.maxLength : false
            , `field length may not exeed ${this.maxLength} characters`)
        this.pushErrorWhen(this.re && !new RegExp(this.re).test(this.value)
            , `field does not meet constraints ${this.re}`)
        return this.hasErrors()
    }      
}

export class DynamicBooleanField extends DynamicDlgField {

    public constructor(init: InitializerList<DynamicBooleanField>) {
        super("boolean")
        Object.assign(this, init);    
    }     
}

export class DynamicRadioField extends DynamicDlgField {

    public constructor(init: InitializerList<DynamicBooleanField>) {
        super("radio")
        Object.assign(this, init);    
    }     
}

export class DynamicMultiselectField extends DynamicDlgField {
    options: {id: number, value: string}[]
    public constructor(init: InitializerList<DynamicBooleanField>) {
        super("multiselect")
        Object.assign(this, init);    
    }     
}

interface DynamicDlgFieldConfigMap {
    [key: string]: DynamicDlgField
}

interface DynamicDlgFieldMap {
    [key: string]: any
}

interface DynamicDlgFieldErrorMap {
    [key: string]: {
        message?: string
    }
}
export interface DynamicDlgParams {
    header: string
    width?: string
    height?: string
    
    submitButtonText?: string
    cancelButtonText?: string
    showCancelButton?: boolean
    fields: DynamicDlgFieldMap
    fieldsConfig?: DynamicDlgFieldConfigMap
    errors?: DynamicDlgFieldErrorMap

    onAccept?: (params: DynamicDlgParams) => void
    onCancel?: () => void
}

export function createFieldConfig<T>(fieldValue: T) {
    // Logger.info(property.name, typeof value, value instanceof Number)
    if(typeof fieldValue === "boolean")
        return new DynamicBooleanField({})
    if(typeof fieldValue === "number")
        return new DynamicNumberField({})
    if(typeof fieldValue === "string")
        return new DynamicStringField({})
    return new DynamicStringField({
        multiLine: true
    })
}

@Injectable()
export class DynamicDialogService {

  constructor(
    private dialogService: DialogService) { 

  }

  accept(cb: () => void) {

  }

  open(params: DynamicDlgParams) {
    // console.log(params)

    const ref = this.dialogService.open(DynamicDialogComponent, {
        header: params.header,
        width: params.width || "30%",
        height: params.height || "200px",
        data: params,
        // footer: "footer"
    });
    }
}