import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AddressService} from '../services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  checkout: boolean;

  constructor(private route: ActivatedRoute, private addressService: AddressService, private router: Router) {}

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(
      (params: Params) => {
        this.checkout = !!params['checkout'];
      }
    )
  }

  private initForm() {
    this.addressForm = new FormGroup({
      'billing': new FormGroup({
        'id': new FormControl(-1),
        'userId': new FormControl(-1),
        'zipcode': new FormControl(null, [Validators.required]),
        'country': new FormControl(null, [Validators.required]),
        'city': new FormControl(null, [Validators.required]),
        'street': new FormControl(null, [Validators.required])
      }),
      'shipping': new FormGroup({
        'id': new FormControl(-1),
        'userId': new FormControl(-1),
        'zipcode': new FormControl(null, [Validators.required]),
        'country': new FormControl(null, [Validators.required]),
        'city': new FormControl(null, [Validators.required]),
        'street': new FormControl(null, [Validators.required])
      })
    });

    this.addressService.get().subscribe(address => {
      if (address != null) {
        this.addressForm.get('billing').setValue(address);
      }
    });

  }

  onSubmit(){
    if (!this.addressForm.valid) {
      return;
    }
    if (this.addressForm.get('billing').value.id == -1) {
      this.addressService.add(this.addressForm.get('billing').value)
    }else{
      this.addressService.modify(this.addressForm.get('billing').value)
    }
    const nextRoute = this.checkout ? '/payment' : '/';
    this.router.navigate([nextRoute]);
  }

  fillWithSameAddress() {
    this.addressForm.get('shipping').setValue(this.addressForm.get('billing').value)
  }
}
