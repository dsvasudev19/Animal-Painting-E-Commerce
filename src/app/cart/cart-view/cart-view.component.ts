import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../cart.service';

declare var Razorpay: any;

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css',
})
export class CartViewComponent implements OnInit {
  items: Product[] = [];

  totalSum: number = 0;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((data) => {
      this.items = data;
      this.totalSum = this.getTotalPrice();
    });
  }

  getTotalPrice(): number {
    let total = 0;
    // this.items.map((item)=>total+=item.price)
    total = this.items.reduce((acc, item) => acc + item.price, 0);
    return total;
  }

  clearCart(): void {
    this.items = [];
    this.totalSum = 0;
  }

  checkout(): void {
    let orderId: string = '';
    this.cartService.checkOut(this.items).subscribe({
      next: (data) => {
        orderId = data.orderId;
        let status = this.createPaymentOrder(data.amount, orderId);

        if (status) {
          this.router.navigate(['/', 'products']);
        }
      },
    });
    // createPaymentOrder()
  }

  removeProduct(id: number): void {
    this.cartService.removeItemFromCart(id).subscribe({
      next: () => {
        this.snackBar.open('Product Removed Successfully', 'Ok', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        this.cartService.getCartItems().subscribe((data) => {
          this.items = data;
          this.totalSum = this.getTotalPrice();
        });
      },
    });
  }

  createPaymentOrder(sum: number, orderId: string): any {
    var options = {
      key: 'rzp_test_alc9PznICVvKQb',
      amount: sum,
      currency: 'INR',
      name: 'OnTheGo Rentals',
      description: 'Payment Transaction',
      image: 'https://example.com/your_logo',
      order_id: orderId,
      handler: function (response: any) {
        // These lines needs to be uncommented and need to send an
        // fetch request to verify the status of the payment
        // then redirect the user accordingly
        // alert('Payment Success'+response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        return true;
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      notes: {
        address: '',
      },
      theme: {
        color: '#3399cc',
      },
    };
    const rzp1 = new Razorpay(options);

    rzp1.open();
    rzp1.on('payment.failed', (response: any) => {
      alert('Payment failed: ' + response.error.description);
    });
  }
}
