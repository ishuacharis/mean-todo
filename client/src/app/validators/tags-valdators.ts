import { AbstractControl, ValidationErrors } from "@angular/forms";

export class TagCustomValidators {
    static tagValidate(c: AbstractControl): null | ValidationErrors {
        let value = c.value
        const valid = /[0-9]/.test(c.value)
        const isInvalid = {
            'tags': {
                'message': "tags can not contain numbers"
            }
        }

        return valid ? isInvalid : null
    }
}