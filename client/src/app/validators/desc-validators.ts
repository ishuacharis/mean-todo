import { AbstractControl, ValidationErrors } from "@angular/forms";

export class DescCustomValidators {
    static descValidate(c: AbstractControl): null | ValidationErrors {
        let value = c.value
        const valid = /[0-9]/.test(c.value)
        const isInvalid = {
            'desc': {
                'message': "desc can not contain numbers"
            }
        }

        return valid ? isInvalid : null
    }
}