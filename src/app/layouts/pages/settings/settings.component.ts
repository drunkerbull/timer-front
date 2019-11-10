import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SettingsService} from './settings.service';
import {IUser} from '../../../shared/interfaces/IUser.interface';
import {StorageService} from '../../../shared/services/storage.service';
import {BaseComponent} from '../../../shared/components/base.component';
import {ToastrService} from 'ngx-toastr';

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

  constructor(private settingsService: SettingsService, private toastr: ToastrService) {
    super();
  }

  ngOnInit() {
    this.formMain.patchValue(this.storageService.user);
  }


  updateMain() {
    const subUpdateMainData = this.settingsService.updateMainData(this.formMain.value)
      .subscribe((res: IUser) => {
        this.storageService.put(StorageService.USER_INFO, JSON.stringify(res));
        this.toastr.success('Data changed')
      }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subUpdateMainData);
  }

  updatePass() {
    const subUpdatePassData = this.settingsService.updatePassData(this.formPass.value)
      .subscribe((res: IUser) => {
        this.toastr.success('Password changed')
      }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subUpdatePassData);
  }

  deleteMain() {
    const subDelete = this.settingsService.deleteMainData()
      .subscribe((res: { message: string }) => {
        this.toastr.success('User deleted')
      }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subDelete);
  }
}
