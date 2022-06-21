import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
displayMessage:any;
r_message:any;

  constructor(private httpclient: HttpClient) { }
  getUserdata() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer key3GnfHvdYoWedr5');
    let url = 'https://api.airtable.com/v0/appzoLh5b0y8mV3WF/Angular-Test-Users'
    return this.httpclient.get(url, { headers: headers } );
  }

  // JSON SERVER
  postData(form:any){
    let url='http://localhost:3000/post';
    return this.httpclient.post(url,form)
  }
  getData(){
    let url='http://localhost:3000/post';
    return this.httpclient.get(url);
  }
  putData(id:any, form:any){
    let url='http://localhost:3000/post/'+id;
    return this.httpclient.put(url,form)

  }
  deleteData(id:number){
    let url='http://localhost:3000/post/'+id;
    return this.httpclient.delete(url)
  
}

}