import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';

import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

import { HeadfacePage } from '../headface/headface'

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {
  public notLogined: boolean = true;
  public logined: boolean = false;
  public userInfo: string[];
  public headface: string;
  public nickname: string;
  public errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController) {
    super()
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }


  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        //加载用户数据
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserInfo(val)
          .subscribe(
          userinfo => {
            console.log(userinfo)
            this.nickname = userinfo["UserNickName"];
            this.headface = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
            loading.dismiss();
          },
          error => this.errorMessage = <any>error);
      }
    });
  }

  //修改名称
  updateNickName() {
    this.storage.get('UserId').then((val: any) => {
      if (val != null) {
        var loading = super.showLoading(this.loadCtrl, "修改中...");
        this.rest.updateNickName(val, this.nickname)
          .subscribe(
          res => {
            if (res['Status'] == "ok") {
              loading.dismiss()
              super.showToast(this.toastCtrl, "修改成功")
            }
          }
          )
      }
    })
  }

  //修改头像
  gotoHeadface() {
    console.log("跳转头像修改页面")
    this.navCtrl.push(HeadfacePage);
  }

  logout() {
    this.storage.remove('UserId');
    this.viewCtrl.dismiss();
  }



}
