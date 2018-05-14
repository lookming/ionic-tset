//公用ui抽象类
import {Loading, LoadingController, ToastController, Toast } from 'ionic-angular';

export abstract class BaseUI{
    constructor() {
    }
    //定义通用loading
    protected showLoading(loadingCtrl: LoadingController,message:string):Loading {
        let loader = loadingCtrl.create({
          content: message,
        //   duration: 3000,
          // dismissOnPageChange: true //页面变化的时候自动关闭 loading
        });
        loader.present();
        return loader;
      }

   //定义通用Toast
   protected showToast(toastCtrl: ToastController,message:string):Toast{
    let toast = toastCtrl.create({
        message:message,
        duration: 2000,
        position:'bottom'
    })
    toast.present()
    return toast
   }
}