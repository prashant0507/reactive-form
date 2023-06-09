import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { nameValidation } from './shared/name.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reactive';
  user!: FormGroup;
  address!: FormArray;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user = this.fb.group({
      fname: ['', [Validators.required, nameValidation]],
      city: [''],
      gender: ['male'],
      state: ['mp'],
      address: this.fb.array([this.createAddress()])
    })

    // Two Way Binding with Reactive Form
    this.user.valueChanges.subscribe((data: any) => {
      console.log("data", data);
    })
  }

  /**
   * Start add field dynamically
   */
  createAddress() {
    return this.fb.group({
      addressName: ['']
    })
  }

  addAddress(){
    this.address = this.user.get('address') as FormArray;
    this.address.push(this.createAddress());
  }

  get addressGroup(){
    return this.user.get('address') as FormArray;
  }
  /**
   * End add field dynamically
   */

  /**
   * Validation Purpose 
   */
  get fname() {
    return this.user.get('fname');
  }

  /**
   * validation purpose
   */
  get city() {
    return this.user.get('city');
  }

  /**
   * After submit Form
   */
  onSubmit() {
    console.log(this.user.value);
  }

  /**Add validation on fly */
  addCityValidation() {
    this.city ?.setValidators([Validators.required]);
    this.city ?.updateValueAndValidity();
  }

  /**Remove validation on fly */
  removeCityValidation() {
    this.city ?.clearValidators();
    this.city ?.updateValueAndValidity();
  }

  updateValueOfCity() {
    this.user.patchValue({
      city: 'Gwalior'
    })
  }

}
