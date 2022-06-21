import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormComponent } from '../form/form.component';
import { ApiserviceService } from '../shared/apiservice.service';

@Component({
  selector: 'app-mainbody',
  templateUrl: './mainbody.component.html',
  styleUrls: ['./mainbody.component.scss']
})
export class MainbodyComponent implements OnInit {
  getArray: any = [];
  jArray: any[] = [];
  constructor(public dialog: MatDialog,
    private api: ApiserviceService) { }

  ngOnInit(): void {
    this.getJdata();
    this.userDetails();
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '45%'
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getJdata();
      }
    })
  }
  userDetails() {
    this.api.getUserdata().subscribe((response: any) => {
      this.getArray = response.records
      console.log(this.getArray)


    })
  }
  getJdata() {
    this.api.getData().subscribe((res: any) => {
      this.jArray = res;
      console.log(this.jArray)
    })
  }
  editData(item: any) {
    this.dialog.open(FormComponent, {
      width: '50%',
      data: item

    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getJdata();
      }
    })
  }
  delete(index: number) {

    this.getArray.splice(index, 1)
  }

  jDelete(id: number) {

    this.api.deleteData(id).subscribe({
      next: (res) => {
        alert("deleted")
        this.getJdata();
      }

    })
  }
  //  jDelete(index:number){
  //   this.jArray.splice(index,1)

  //  }

}


