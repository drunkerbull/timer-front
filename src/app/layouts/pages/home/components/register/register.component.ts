import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../home.service';
import {FormControl, FormGroup} from '@angular/forms';
import {IUser} from '../../../../../shared/interfaces/IUser.interface';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {SocketService} from '../../../../../shared/services/socket.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('test@test.com'),
    nickname: new FormControl('testNickname'),
    pass: new FormControl('122333Qwe')
  });

  constructor(public homeService: HomeService, public socketService: SocketService) {
    super();
  }

  ngOnInit() {
  }

  register() {
    const pack = this.form.value;
    const subRegister = this.homeService.register(pack).subscribe((res: IUser) => {
      const {nickname, ...otherAuthPack} = pack;
      this.homeService.registeredUser.emit(otherAuthPack);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subRegister);
  }
}
