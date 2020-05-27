import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UsernameCustomValidators {
    static loginUsername (c: AbstractControl) : null | ValidationErrors {
        
        const isInvalid  = {
            'username' : {
                'message' : "Invalid username"
            }
        }
        return isInvalid
    }
}