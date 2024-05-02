import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ["", Validators.required, Validators.minLength(3)],
    favoriteGames: this.fb.array([]),
  })

  public newFavorite: FormControl = new FormControl('', Validators.required);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
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

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  constructor(
    private fb: FormBuilder
  ) { }

  onDeleteFavoriteGame(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onAddToFavoriteGames(): void {
    if (this.newFavorite.invalid) return
    const newGame = this.newFavorite.value;
    console.log(newGame)
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    this.newFavorite.reset();
  }

  onSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value)
    this.myForm.controls['favoriteGames'] = this.fb.array([])
    this.myForm.reset();
  }
}
