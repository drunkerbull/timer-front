import {Component, OnInit} from '@angular/core';
import {IUserLogged} from '../../../../../shared/interfaces/IUserLogged.interface';
import {StorageService} from '../../../../../shared/services/storage.service';
import {FormControl, FormGroup} from '@angular/forms';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {HomeService} from '../../home.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('test@test.com'),
    pass: new FormControl('122333Qwe')
  });

  constructor(public homeService: HomeService) {
    super();
  }

  ngOnInit() {
  }

  login() {
    const pack = this.form.value;
    const subLogin = this.homeService.login(pack).subscribe((res: IUserLogged) => {
      this.storageService.put(StorageService.USER_TOKEN, res.token);
      this.storageService.put(StorageService.USER_INFO, JSON.stringify(res.user));
      this.router.navigate(['/projects']);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subLogin);
  }
}
