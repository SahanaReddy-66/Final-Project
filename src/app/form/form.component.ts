import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../shared/apiservice.service';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  updateform: any;
  button: any = "Save";
  constructor(private router: Router,
    private api: ApiserviceService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<FormComponent>) {
  }
  ngOnInit(): void {
    this.updateform = new FormGroup({
      'first_name': new FormControl(" ", [Validators.required]),
      'last_name': new FormControl(" ", [Validators.required]),
      'data_of_birth': new FormControl(" ", [Validators.required]),
      'gender': new FormControl(" ", [Validators.required]),
      'status': new FormControl(" ", [Validators.required]),

    })
    if (this.editData) {
      this.button = "Update"
      // this.updateform.controls['first_name'].setValue(this.editData.fields['First Name'])
      // this.updateform.controls['last_name'].setValue(this.editData.fields['Last Name'])
      // this.updateform.controls['data_of_birth'].setValue(this.editData.fields['Date of Birth'])
      // this.updateform.controls['gender'].setValue(this.editData.fields['Gender'])
      // this.updateform.controls['status'].setValue(this.editData.fields['Status'])

      this.updateform.controls['first_name'].setValue(this.editData.first_name)
      this.updateform.controls['last_name'].setValue(this.editData.last_name)
      this.updateform.controls['data_of_birth'].setValue(this.editData.data_of_birth)
      this.updateform.controls['gender'].setValue(this.editData.gender)
      this.updateform.controls['status'].setValue(this.editData.status)
    }

  }
  addData() {
    if (!this.editData) {
      if (this.updateform.valid) {
        this.api.postData(this.updateform.value).subscribe({
          next: (res) => {
            alert("Details added successfully");
            this.updateform.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Error while adding data")
          }
        })
      }
    }
    else {
      this.updateData();
    }
  }
  updateData() {
    // debugger;
    this.api.putData(this.editData.id, this.updateform.value).subscribe({
      next: (res) => {
        alert("Daata is Updated")
        this.updateform.reset();
        this.dialogRef.close('update');
      }
    })
  }
}
