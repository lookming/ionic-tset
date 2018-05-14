import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController,
  ToastController
} from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui'
/**
 * Generated class for the QuestionDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-details',
  templateUrl: 'question-details.html',
})
export class QuestionDetailsPage extends BaseUI {
  userId: string;
  questionId: string;
  question: string[];
  answer: string[];
  errorMessage: string;
  isFavourite: Boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionDetailsPage');
    this.questionId = this.navParams.get('id');
    console.log(this.questionId);
    this.getquestionDetails()
    
  }
  
  getquestionDetails() {
    console.log(this.isFavourite)
    this.storage.get("UserId").then((val) => {
      if (val != null) {
        this.userId = val;
        var loading = super.showLoading(this.loadCtrl, '加载中。。。')
        this.rest.questionDetails(val, this.questionId).subscribe(f => {
          console.log(f)
          // this.questionDetaills = f;
          this.question = f;
          this.answer = f["Answers"];
          loading.dismissAll();
          console.log(f["Answers"])
          console.log(this.answer)
        }, error => this.errorMessage = <any>error)
      }
    })
  }

  //关注
  saveFavourite() {
    var loading = super.showLoading(this.loadCtrl, '请求中。。。');
    this.rest.saveFavourite(this.userId, this.questionId).subscribe(res => {
      console.log(res);
      if (res['Status'] == 'OK') {
        super.showToast(this.toastCtrl, this.isFavourite?'取消关注成功':'关注成功')
        loading.dismiss();
        this.isFavourite = !this.isFavourite;
        console.log(this.isFavourite)
      }
    })
  }

}
