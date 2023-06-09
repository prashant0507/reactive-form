import { AbstractControl } from '@angular/forms';

export function nameValidation(controls: AbstractControl) {
    console.log('constrols', controls.value);
    let getName = controls.value;
    if(!getName.startsWith('pra')){
        return {isValidName: true}
    }
    return null;
}