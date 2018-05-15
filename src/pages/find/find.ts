import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui'

/**
 * Generated class for the FindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-find',
  templateUrl: 'find.html',
})
export class FindPage extends BaseUI{
  questions:string[];
  pageNum:number=1;
  number:number=10;
  enabled:Boolean=true;
  loadingText:string='上拉加载更多';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
  public loadingCtrl:LoadingController) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPage');
    this.getQuestions();
  }

  //下拉刷新
  doRefresh(refresher){
    this.pageNum = 1;
    this.getQuestions();
    refresher.complete();
  }

  //上拉加载更多
  doInfinite(infiniteScroll){
    this.pageNum++; 
    this.getQuestions(() => {
      infiniteScroll.complete();
    });
   
  }

 

  getQuestions(callback: any = () => { }) {
    var loading = super.showLoading(this.loadingCtrl,'加载中....');
    this.rest.getQuestions(this.pageNum,this.number).subscribe(resp=>{
      callback();
      if(this.pageNum == 1){
        this.questions = resp;
      } else {
        let cache = this.questions.concat(resp);
        this.questions = cache;
        console.log(this.questions)      
      }
      loading.dismiss();
    })
  }
}
