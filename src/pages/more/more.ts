import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController , LoadingController  } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserPage } from '../user/user'

import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { BaseUI} from '../../common/baseui'

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {
  public notLogined: boolean = true;
  public logined: boolean = false;
  public userInfo: string[];
  public headface: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public rest: RestProvider,
    public loadCtrl: LoadingController ) {
    super();
  }

  

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(() => {
      console.log("111")
      this.loadUserPage();
    });
    modal.present()
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }


  // //判断显示用户界面
  loadUserPage() {
    this.storage.get("UserId").then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        //说明是登录状态，加载数据
        this.rest.getUserInfo(val)
          .subscribe(
          userInfo => {
            this.userInfo = userInfo;
            this.headface = userInfo['UserHeadface']+ "?" + (new Date()).valueOf();;
            this.notLogined = false;
            this.logined = true;
            loading.dismiss();
          }
          )
      } else {
        this.notLogined = true;
        this.logined = false;
      }
    })
  }

  goUserpage() {
    this.navCtrl.push( UserPage )
  }
}
