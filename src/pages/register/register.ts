import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {

  mobile: number;
  userName: any;
  password: any;
  confirmPassword: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public storage: Storage,
    public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }




  doRegister() {
    if (this.mobile == null) {
      super.showToast(this.toastCtrl, '手机号不能为空');
      return;
    } else if (this.userName == null) {
      super.showToast(this.toastCtrl, '用户名字不能为空');
      return;
    } else if (this.password == null) {
      super.showToast(this.toastCtrl, '密码不能为空');
      return;
    } else if (this.confirmPassword == null) {
      super.showToast(this.toastCtrl, '确认密码不能为空');
      return;
    } else {
      if (this.password != this.confirmPassword) {
        super.showToast(this.toastCtrl, "两次输入的密码不匹配。");
      } else {
        var loading = super.showLoading(this.loadingCtrl, '注册中...');
        this.rest.register(this.mobile, this.userName, this.password).subscribe(f => {
          console.log(f);
          if (f['Status'] == 'OK') {
            loading.dismiss()
            super.showToast(this.toastCtrl, '注册成功，请登录！');
            this.dismiss();
          } else {
            loading.dismiss()
            super.showToast(this.toastCtrl, '注册失败');
          }
         

        })
      }
    }
  }

  gotoLogin() {
    this.navCtrl.push(LoginPage);
  }

  dismiss() {
    console.log('111')
    this.viewCtrl.dismiss();
  }
}
