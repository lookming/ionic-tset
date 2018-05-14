import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';

import { RestProvider } from '../../providers/rest/rest';
import { RegisterPage } from '../register/register'


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})
export class LoginPage extends BaseUI {

  mobile: string;
  password: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public rest: RestProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    var loading = super.showLoading(this.loadingCtrl, "登录中...");
    this.rest.login(this.mobile, this.password)
      .subscribe(
      res => {
        if (res['Status'] = 'ok') {
          this.storage.set('UserId', res["UserId"]);
          loading.dismiss();
          this.dismiss();
        } else {
          loading.dismiss();
          super.showToast(this.toastCtrl, res["StatusContent"]);
        }
      }
      )
  }



  /**
   * 关闭当前页面
   * 
   * @memberof LoginPage
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }


  pushRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }
}
