import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest'

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI {

  title: string;
  content: string;
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submitQuestion() {
    this.storage.get("UserId").then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl, "发表中...");
        this.rest.questionSave(val, this.title, this.content)
          .subscribe(f => {
            if(f["Status"] == "OK"){
              console.log("发表成功")
              super.showToast(this.toastCtrl, "提问成功")
              loading.dismissAll();
              this.dismiss();
            } else {
              
              loading.dismissAll();
              super.showToast(this.toastCtrl, f["StatusContent"])
            }
          })
      } else {
        super.showToast(this.toastCtrl, '请登录后发表问题')
      }
    })
  }
}
