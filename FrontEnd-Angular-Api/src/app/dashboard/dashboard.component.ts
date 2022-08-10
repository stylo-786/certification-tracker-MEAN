import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { ValueFromArray } from 'rxjs';
import { AppService } from '../app.service';
// import studentData from '../student.json';
import { Student, studentCertificate } from '../modal/student';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private appService: AppService) {}

  students: Student[] = [];

  ngOnInit(): void {
    this.getStudent();
  }

  id: any;

  getId(id: any) {
    this.id = id;
    console.log(this.id);
  }

  cid: any;

  getCid(id: any) {
    this.cid = id;
    console.log(this.cid);
  }

  cName:any;
  getCname(){
    let filterData=this.students.filter(data=>data._id==this.id)
    let filterData1=filterData[0].cname.filter(data=>data._id==this.cid)
    this.cName= filterData1[0].certification;
  }

  getStudent() {
    this.appService.getStudentApi().subscribe((res) => {
      this.students = res;
    });
  }

  setCertificate(val: any) {
    console.log(val);

    this.appService.addCertificateApi(this.id, val).subscribe((result) => {
      result = this.getStudent();
    });

    let ref = document.getElementById('closeAdd');
    ref?.click();
  }

  deleteCertificate() {
      this.appService.delCertificateApi(this.id, this.cid).subscribe((result) => {
        result = this.getStudent();
      });

      setTimeout(() => {
        let filterData = this.students.filter((data) => data._id === this.id);
        if (filterData[0].cname.length == 0) {
          this.appService.deleteUser(this.id).subscribe((result) => {
            result = this.getStudent();
          });
        }
      }, 100);
      
      
  }

  addNewUser(value: any) {
    let data = {
      name: value.name,
      cname: {
        certification: value.certification,
        status: value.status,
      },
    };

    this.appService.addUserApi(data).subscribe((result) => {
      result = this.getStudent();
    });

    let ref = document.getElementById('closeAddUser');
    ref?.click();
  }

  updateStatus(stat: string) {
    let filterData = this.students.filter((data) => data._id === this.id);
    let filterData1 = filterData[0].cname.filter(
      (data) => data._id === this.cid
    );
    filterData1[0].status = stat;
    this.appService
      .editCertificateApi(this.id, this.cid, filterData1[0])
      .subscribe((result) => {
        result = this.getStudent();
      });
  }
}
