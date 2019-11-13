import {Component, OnInit} from '@angular/core';
import {IUserLogged} from '../../../../../shared/interfaces/IUserLogged.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {HomeService} from '../../home.service';
import {SocketService} from '../../../../../shared/services/socket.service';
import {User} from '../../../../../shared/models/user.model';

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

  constructor(public homeService: HomeService, public socketService: SocketService) {
    super();
    const subRegisteredUser = this.homeService.registeredUser
      .subscribe((data)=>this.login(data))
    this.someSubscriptions.add(subRegisteredUser);
  }

  ngOnInit() {
  }

  login(data?) {
    const pack = data || this.form.value;
    const subLogin = this.homeService.login(pack).subscribe((res: IUserLogged) => {
      const user = new User(res.user, res.token);
      this.storageService.saveUser(user, res.token);
      this.socketService.initSocket();
      this.router.navigate(['/projects']);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subLogin);
  }
}
