import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../home.service';
import {FormControl, FormGroup} from '@angular/forms';
import {IUser} from '../../../../../shared/interfaces/IUser.interface';
import {IUserLogged} from '../../../../../shared/interfaces/IUserLogged.interface';
import {StorageService} from '../../../../../shared/services/storage.service';
import {BaseComponent} from '../../../../../shared/components/base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    nickname: new FormControl(''),
    pass: new FormControl('')
  });

  constructor(public homeService: HomeService) {
    super();
  }

  ngOnInit() {
  }

  register() {
    const pack = this.form.value;
    const subRegister = this.homeService.register(pack).subscribe((res: IUser) => {
      const {nickname, ...otherAuthPack} = pack;
      this.homeService.login(otherAuthPack).subscribe((res: IUserLogged) => {
        this.storageService.put(StorageService.USER_TOKEN, res.token);
        this.router.navigate(['/projects']);
      });
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subRegister);
  }
}
