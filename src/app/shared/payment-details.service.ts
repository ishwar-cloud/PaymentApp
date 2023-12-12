import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { PaymentDetails } from './payment-details.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {

  url:string= environment.apiBaseURL + '/PaymentDetails'
  list:PaymentDetails[] = [];
  formData:PaymentDetails = new PaymentDetails();
  formsubmitted:boolean=false;
  constructor(private http:HttpClient) { }

  refreshList() {
    return this.http.get(this.url);
  }
  
  postpaymentdetail(){
   return this.http.post(this.url,this.formData);
  }

  putpaymentdetail(){
    return this.http.put(this.url + '/' + this.formData.paymentDetailsId ,this.formData);
   }

   deletepaymentdetail(id :number){
    return this.http.delete(this.url + '/'+ id);
   }

  resetForm(from:NgForm){
    from.form.reset();
    this.formData = new PaymentDetails();
    this.formsubmitted = false;
  }
}