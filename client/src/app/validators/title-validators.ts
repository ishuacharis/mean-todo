import { AbstractControl, ValidationErrors } from "@angular/forms";

export class TitleCustomValidators {
    static titleValidate(c: AbstractControl): null | ValidationErrors {
        let value  = c.value
        const valid  = /[0-9]/.test(c.value)
        const isInvalid = {
            'title': {
                'message': "title can not contain numbers"
            }
        }
        
        return valid ? isInvalid : null
    }
}