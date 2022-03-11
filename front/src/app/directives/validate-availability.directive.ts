import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

export function availabilityValidator(fields: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstInput = control.get(fields[0]);
    const secondInput = control.get(fields[1]);

    if (firstInput && secondInput && (firstInput.value || secondInput.value)) {
      return null;
    }

    return {availability: true};
  }
}

@Directive({
  selector: '[appValidateAvailability]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateAvailabilityDirective,
    multi: true,
  }],
})
export class ValidateAvailabilityDirective {
  @Input('appValidateAvailability') availabilityFields: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    return availabilityValidator(this.availabilityFields)(control);
  }

}
