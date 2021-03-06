import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsConfig } from 'src/app/config/forms-config';
import { BrandModel } from 'src/app/models/parameters/brand.models';
import { BrandService } from 'src/app/services/parameters/brand.service';

declare const showMessage: any;

@Component({
  selector: 'app-brand-creation',
  templateUrl: './brand-creation.component.html',
  styleUrls: ['./brand-creation.component.css']
})
export class BrandCreationComponent implements OnInit {

  fgValidator!: FormGroup;
  nameMinLength = FormsConfig.PARAM_NAME_MIN_LENGTH;
  codeMinLength = FormsConfig.PARAM_CODE_MIN_LENGTH;


  constructor(
    private fb: FormBuilder,
    private service: BrandService,
    private router: Router) { }

  ngOnInit(): void {
    this.FormsBuilding();
  }

  FormsBuilding() {
    this.fgValidator = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(this.codeMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
    });
  }

  saveNewRecordFn() {
    if (this.fgValidator.invalid) {
      showMessage('Invalid form..!');
    } else {
      let model = this.getCustomerData();
      this.service.saveNewRecord(model).subscribe(
        data => {
          showMessage('Record saved succesfully.');
          //redireccionando luego de logear
          this.router.navigate(['/parameters/brand-list']);
        },
        error => {
          showMessage('Error saving..');
        }
      );
    }
  }

  getCustomerData(): BrandModel {
    let model = new BrandModel();
    model.code = this.fgv.code.value;
    model.name = this.fgv.name.value;
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }

}
