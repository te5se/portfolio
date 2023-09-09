import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  hasError(formGroup: FormGroup , InputName: string, error?: 'maxlength' | 'minlength' | 'required' | 'email' | 'confirmed' | 'max' | 'min' | 'pattern'): boolean {
    if (error) 
    {
        return formGroup?.get(InputName)?.hasError(error) ? true : false
    } 
    else 
    {
        return formGroup?.get(InputName)?.invalid  ? true : false
    }
}
}
