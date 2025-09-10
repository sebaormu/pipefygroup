import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidateService {
 
  constructor() { }

  fieldIsInvalid(formGroup: FormGroup, nameField: string): boolean {
    const field = formGroup.get(nameField);
    return !!(field && field.errors && field.touched);
  }

  errorField(formGroup: FormGroup, nameField: string, errorsObject: Record<string, Record<string, string>>): string {

    const errors = formGroup?.get(nameField)?.errors;
    if (!errors) return '';

    const [errorKey] = Object.keys(errors);
    const message = errorsObject[nameField]?.[errorKey];
    if (!message) return '';

    return message;

  }
}
