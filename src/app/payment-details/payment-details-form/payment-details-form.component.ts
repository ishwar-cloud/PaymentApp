import { Component } from '@angular/core';
import { PaymentDetailsService } from '../../shared/payment-details.service';
import { NgForm } from '@angular/forms';
import { PaymentDetails } from '../../shared/payment-details.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styleUrl: './payment-details-form.component.css'
})
export class PaymentDetailsFormComponent {
  constructor(public service: PaymentDetailsService,private tostar: ToastrService){
  }

  onSubmit(form:NgForm){
    this.service.formsubmitted=true;
     if(form.valid){
     
      if(this.service.formData.paymentDetailsId == 0){
        this.insertRecord(form);
       }
       else{
        this.updateRecord(form);
       }
     }
 
  }
  insertRecord(from:NgForm){
    this.service.postpaymentdetail()
    .subscribe({
      next:res =>{
        this.service.list= res as PaymentDetails[];
        this.service.resetForm(from);
        this.tostar.success('Instered Sucsessfully payment details')
      },
      error:err =>console.log(err)
    })
  }
  updateRecord(from:NgForm){
    this.service.putpaymentdetail()
    .subscribe({
      next:res =>{
        this.service.list= res as PaymentDetails[];
        this.service.resetForm(from);
        this.tostar.info('Updated Sucsessfully payment details')
      },
      error:err =>console.log(err)
    })
  }
  
 
}