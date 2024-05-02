import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent implements OnInit {
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // });



  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })

  constructor(
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.myForm.reset({
      name: '',
      price: 10,
      inStorage: 0
    });
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {

    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'Este campo es obligatorio';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return 'This field must have a value greater than 0';
      }
    }

    return null;
  }

  onSave(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset({
      name: 'New Product',
      price: 10,
      inStorage: 0
    });
  }
}
