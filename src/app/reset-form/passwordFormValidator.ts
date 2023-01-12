import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

   export const bothFieldsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
     const password = control.get("password")
     const repeatPassword = control.get("repeatPassword")
     if (password?.value == repeatPassword?.value && password && repeatPassword){
       return null
     } else {
       return {passwordsUnequal: true}
     }
   }

