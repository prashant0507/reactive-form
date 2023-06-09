import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControlName, FormControl } from '@angular/forms';
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
  hobby = [
    {
      isSelected: true,
      value:'dance',
      label:'Dance'
    },
    {
      isSelected: false,
      value:'swim',
      label:'Swiming'
    },
    {
      isSelected: true,
      value:'cricket',
      label:'Cricket'
    }
  ]
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user = this.fb.group({
      fname: ['', [Validators.required, nameValidation]],
      city: [''],
      gender: ['male'],
      state: ['mp'],
      address: this.fb.array([this.createAddress()]),
      hobby:this.fb.array([])
    })

    // Two Way Binding with Reactive Form
    this.user.valueChanges.subscribe((data: any) => {
      console.log("Two Way Binding", data);
    })

    // Getting value of checkbox in Form
    let hobby: FormArray = this.user.get('hobby') as FormArray;
    this.hobby.forEach((elem: any) => {
      if(elem.isSelected){
        hobby.push(new FormControl(elem.value))
      }
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

  /**Update value using patchValue */
  updateValueOfCity() {
    this.user.patchValue({
      city: 'Gwalior'
    })
  }

  onChange(e: any){
    console.log('e', e);
    let hobby: FormArray = this.user.get('hobby') as FormArray; // Getting Ref
    if(e.target.checked){
      hobby.push(new FormControl(e.target.value)); // Add value in array
    }else{ //Remove Value from Array
      let index = hobby.controls.findIndex((elem: any) => {
        if(elem.value === e.target.value){
          return elem.value
        }
      });
      hobby.removeAt(index);
    }
  }

}
