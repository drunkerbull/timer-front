import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SettingsService} from './settings.service';
import {IUser} from '../../../shared/interfaces/IUser.interface';
import {BaseComponent} from '../../../shared/components/base.component';
import {User} from '../../../shared/models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponent implements OnInit {

  formMain: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    nickname: new FormControl('')
  });
  formPass: FormGroup = new FormGroup({
    currentPass: new FormControl(''),
    newPass: new FormControl(''),
    repeatNewPass: new FormControl('')
  });
  changeAvatar: boolean = false;

  constructor(private settingsService: SettingsService) {
    super();
  }

  ngOnInit() {
    this.formMain.patchValue(this.storageService.user);

  }

  changeAvatarImg({base64, blob}) {
    const formData = new FormData();
    formData.append('avatar', blob);

    const subAvatar = this.settingsService.updateAvatarData(formData).subscribe((res) => {
      if (!this.storageService.user.haveAvatar) {
        this.updateMain({haveAvatar: true});
      }
      this.changeAvatar = false;
      this.toastr.success('Image saved');
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subAvatar);
  }

  updateMain(pack = this.formMain.value) {
    const subUpdateMainData = this.settingsService.updateMainData(pack)
      .subscribe((user: IUser) => {
        const newUser = new User(user);
        this.storageService.saveUser(newUser);
        this.toastr.success('Data changed');
      }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subUpdateMainData);
  }

  updatePass() {
    const subUpdatePassData = this.settingsService.updatePassData(this.formPass.value)
      .subscribe((res: IUser) => {
        this.toastr.success('Password changed');
      }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subUpdatePassData);
  }

  deleteMain() {
    const subDelete = this.settingsService.deleteMainData()
      .subscribe((res: { message: string }) => {
        this.toastr.success('User deleted');
      }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subDelete);
  }
}
