import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { FindPage } from '../pages/find/find';
import { MessagePage } from '../pages/message/message';
import { MorePage } from '../pages/more/more';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { ChatDetailsPage } from '../pages/chat-details/chat-details';
import { HeadfacePage } from '../pages/headface/headface';
import { QuestionPage } from '../pages/question/question';
import { QuestionDetailsPage } from '../pages/question-details/question-details'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from '@ionic/storage';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    ChatPage,
    FindPage,
    HomePage,
    MessagePage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    ChatDetailsPage,
    HeadfacePage,
    QuestionPage,
    QuestionDetailsPage

  ],
  imports: [
    BrowserModule,
    HttpModule, //全局需要导入 HTTP
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
    }),
    IonicStorageModule.forRoot() //定义全局storage模块
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    FindPage,
    HomePage,
    MessagePage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    ChatDetailsPage,
    HeadfacePage,
    QuestionPage,
    QuestionDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    File,
    Transfer,
    FilePath,
    Camera,
  ]
})
export class AppModule { }
