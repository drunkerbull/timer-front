import {Component, OnInit} from '@angular/core';
import {GuestService} from '../../guest.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    nickname: new FormControl(''),
    pass: new FormControl('')
  });

  constructor(public guestService: GuestService) {
  }

  ngOnInit() {
  }

  register() {
    const pack = this.form.value;
    console.log(pack);
    this.guestService.register(pack).subscribe(res => {
      console.log(res);
    });
  }
}
