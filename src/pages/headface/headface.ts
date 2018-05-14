import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ActionSheetController,
  ToastController, ViewController, Platform, normalizeURL,
  LoadingController

} from 'ionic-angular';


import { Storage } from '@ionic/storage';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
// import { ImagePicker } from '@ionic-native/image-picker';

import { BaseUI } from '../../common/baseui'

declare var cordova: any;

/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {


  lastImage: string = null;
  userId: string;
  errorMessage: string;
  maxImageNum: number = 5;
  imgList = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public Storage: Storage,
    public camera: Camera,
    public transfer: Transfer,
    public file: File,
    public filePath: FilePath,
    public platform: Platform,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController, ) {
    super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeadfacePage');
  }

  ionViewDidEnter() {
    this.Storage.get('UserId').then((val) => {
      if (val != null) {
        console.log(val)
        this.userId = val;
      }
    })
  }




  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '选择相机',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: '选择图库',
          handler: () => {
            console.log('Archive clicked');
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    actionSheet.present();

  }

  takePicture(sourceType) {
    let options = {
      quality: 100, //图片的质量
      sourceType: sourceType, //图片源 PHOTOLIBRARY(表示从图库)  CAMERA(从相机)
      saveToPhotoAlbum: false, //是否保存拍摄的照片到相册中去
      correctOrientation: true, //是否纠正拍摄的照片的方向
      maxImageNum: this.maxImageNum,
      targetWidth: 414 * 2,
      targetHeight: 736 * 2,
      title: "选择一个相册"
    }
    //获取图片的方法
    this.camera.getPicture(options).then((imagePath) => {
      //特别处理 android 平台的文件路径问题
      if (this.platform.is("android") && sourceType == this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath) //获取android下的真实路径
          .then((filePath) => {
            //获取正确的路径
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            //获取正确的文件名
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          })
      } else {
        //获取正确的路径
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //获取正确的文件名
        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      super.showToast(this.toastCtrl, "选择图片出现错误，请在 App 中操作或检查相关权限。");
    })
  }


  //将获取到的图片或者相机拍摄到的图片进行一下另存为，用于后期的图片上传使用
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(success => {
        this.lastImage = newFileName;
      }, (err) => {
        super.showToast(this.toastCtrl, "存储图片到本地图库出现错误。")
      })
  }

  //为文件生成一个新的文件名
  createFileName() {
    let d = new Date();
    let n = d.getTime();
    let newFileName = n + '.jpg'   //新的图片名
    return newFileName
  }

  //处理图片的路径为可以上传的路径
  pathForImage(img) {
    if (img == null) {
      return ''
    } else {
      return normalizeURL(cordova.file.dataDirectory + img)
    }
  }

  //图片上传
  uploadImage() {
    let url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
    let targetPath = this.pathForImage(this.lastImage);
    let filename = this.userId + ".jpg"; //定义上传后的文件名

    let options = {
      fileKey: "key",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename, 'userid': this.userId }
    }

    let fileTransfer: TransferObject = this.transfer.create();
    let loading = super.showLoading(this.loadingCtrl, '上传中.....')

    //开始上传
    fileTransfer.upload(url,targetPath,options).then((data)=>{
      loading.dismiss();
      super.showToast(this.toastCtrl,'上传成功！')
      setTimeout(()=>{
        this.viewCtrl.dismiss();
      },200)
    },(err)=>{
      loading.dismiss();
      super.showToast(this.toastCtrl,'图片上传错误，请重试！')
    })
  }





  // takePicture(sourceType) {
  //   //调用相机
  //   if (sourceType == this.camera.PictureSourceType.CAMERA) {
  //     let options = {
  //       quality: 100, //图片质量
  //       sourceType: sourceType,  //图片源 PHOTOLIBRARY(表示从图库)  CAMERA(从相机)
  //       saveToPhotoAlbum: false, //是否保存拍摄的照片到相册中去
  //       correctOrientation: true //是否纠正拍摄的照片的方向
  //     }

  //     // 获取图片
  //     this.camera.getPicture(options).then((imageData) => {
  //       // 获取成功
  //       let base64Image = 'data:image/jpeg;base64,' + imageData;

  //     }, (err) => {
  //       console.log('获取图片失败');
  //     });
  //   }

  //   if (sourceType == this.camera.PictureSourceType.PHOTOLIBRARY) {
  //     let options = {
  //       maxImageNum: this.maxImageNum,
  //       quality: 90,
  //       targetWidth: 414 * 2,
  //       targetHeight: 736 * 2,
  //       title: "选择一个相册"
  //     }
  //     this.imagePicker.getPictures(options).then((results) => {
  //       this.imgList = results;
  //       let i = 0;
  //       this.upLoadImg(i);
  //       // for (var i = 0; i < results.length; i++) {
  //       //   console.log('Image URI: ' + results[i]);
  //       // }
  //     }, (err) => {
  //       console.log('获取图片失败');
  //     });
  //   }


  // }


  // upLoadImg(i) {
  //   let imgData = {
  //     content: {
  //       content: this.imgList[i],
  //       imageUrl: this.imgList[i]
  //     },
  //     contentType: 'img',
  //   }
  // }






}
