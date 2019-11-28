import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SettingsService} from './settings.service';
import {IUser} from '../../../shared/interfaces/IUser.interface';
import {BaseComponent} from '../../../shared/components/base.component';
import {User} from '../../../shared/models/user.model';

interface IUserStatisticsData {
  projectsOwner: number,
  projectsWorker: number,
  tasksOwner: number,
  tasksWorker: number
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponent implements OnInit {

  formMain: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    nickname: new FormControl(''),
    blockEveryoneWhoWantAddMeToProject: new FormControl(''),
    blockEveryoneWhoWantWriteMe: new FormControl(''),
    disableNotifications: new FormControl(''),
  });
  formPass: FormGroup = new FormGroup({
    currentPass: new FormControl(''),
    newPass: new FormControl(''),
    repeatNewPass: new FormControl('')
  });
  changeAvatar: boolean = false;
  loadedAvatar: boolean = false;
  newBlackListUser: string = '';
  blackList: IUser[] = [];
  statisticsData: IUserStatisticsData = null;

  constructor(private settingsService: SettingsService) {
    super();
  }

  ngOnInit() {
    this.formMain.patchValue(this.storageService.user);
    this.getBlackList();
    this.getStatisticsData();
  }


  getStatisticsData() {
    this.settingsService.getStatisticsData().subscribe((res: IUserStatisticsData) => {
      this.statisticsData = res;
    });
  }

  changeAvatarImg({base64, blob}) {
    const formData = new FormData();
    formData.append('avatar', blob);
    this.loadedAvatar = true;
    const subAvatar = this.settingsService.updateAvatarData(formData).subscribe((res) => {
      if (!this.storageService.user.haveAvatar) this.updateMain({haveAvatar: true});
      this.storageService.user.avatar = blob;
      this.loadedAvatar = false;
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


  getBlackList() {
    const subGetUserBlackList = this.settingsService.getBlackList().subscribe((user: IUser) => {
      this.blackList = user.blackList;
      if (!user.blackList) this.blackList = [];
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subGetUserBlackList);
  }

  addBlackList() {
    if (!this.newBlackListUser.trim().length) {
      this.toastr.error('You cant send empty value');
      return;
    }
    const subAddUserBlackList = this.settingsService.addBlackList(this.newBlackListUser).subscribe((user: IUser) => {
      this.blackList.push(user);
      this.toastr.info('User added to black list', 'Black List');
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subAddUserBlackList);
  }

  deleteBlackList(user, index) {
    const subDeleteUserBlackList = this.settingsService.deleteBlackList(user._id).subscribe((res: { message: string }) => {
      this.toastr.info(res.message, 'Black List');
      this.blackList.splice(index, 1);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subDeleteUserBlackList);
  }
}
