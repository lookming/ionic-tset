import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui'

import { QuestionPage } from '../question/question';
import { QuestionDetailsPage } from '../question-details/question-details'

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends BaseUI {

  feeds: string[];
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public loadingCtrl: LoadingController,
    public modalCrtl: ModalController
  ) {
    super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.getFeeds();
    
  }

  getFeeds() {
    var loading = super.showLoading(this.loadingCtrl, "加载中...");
    this.rest.getFeeds()
      .subscribe(
      re => {
        this.feeds = re;
        loading.dismiss();
        console.log(this.feeds)
      },
      error => this.errorMessage = <any>error);
  }

  //下拉刷新
  doRefresh(refresher) {
    setTimeout(() => {
      this.getFeeds();
      refresher.complete();
    }, 200)
  }

  gotoQuestion() {
    var modal = this.modalCrtl.create(QuestionPage);
    modal.present();
  }

  gotoDetails(IdentityId) {
    this.navCtrl.push(QuestionDetailsPage,{id:IdentityId});
  }
}
