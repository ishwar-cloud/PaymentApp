import { Component, OnInit } from '@angular/core';
import { PaymentDetailsService } from '../shared/payment-details.service';
import { PaymentDetails } from '../shared/payment-details.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css',
})
export class PaymentDetailsComponent implements OnInit {
  constructor(
    public service: PaymentDetailsService,
    private tostar: ToastrService
  ) {}
  ngOnInit(): void {
    this.service.refreshList().subscribe({
      next: (res) => {
        this.service.list = res as PaymentDetails[];
      },
    });
  }
  populateForm(selectedRecord: PaymentDetails) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    this.service.deletepaymentdetail(id).subscribe({
      next: (res) => {
        this.service.list = res as PaymentDetails[];

        this.tostar.error('delete Successfully payment details');
      },
      error: (err) => console.log(err),
    });
  }
}
