import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
/**
 * 
 * 
 * @export
 * @class RestProvider
 */
@Injectable()
export class RestProvider {

  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";


  /**
   * 用户登录
   * 
   * @param {any} mobile 
   * @param {any} password 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  login(mobile, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlLogin + "?mobile=" + mobile + "&password=" + password);
  }

  /**
   * 获取用户信息 
   * 
   * @param {any} UserId 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getUserInfo(UserId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUserInfo + "?UserId=" + UserId)
  }

  /**
   * 修改用户名称
   * 
   * @param {any} UserId 
   * @param {any} nickname 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  updateNickName(UserId, nickname): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUpdateNickName + "?UserId=" + UserId + "&nickname=" + nickname)
  }

  /**
  * 获取问题列表页
  * 
  * @private
  * @returns {Observable<string[]>} 
  * @memberof RestProvider
  */
  getFeeds(): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlFeeds)
  }
  /**
   * 提问
   * 
   * @param {any} userId 
   * @param {any} title 
   * @param {any} content 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  questionSave(userId, title, content): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionSave + '?userId=' + userId + '&title=' + title + '&content=' + content)
  }
  /**
   * 问题详情页
   * 
   * @param {any} userId 
   * @param {any} questionId 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  questionDetails(userId, questionId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestionWithUser + "?id=" + questionId + "&userid=" + userId);
  }
/**
 * 关注
 * 
 * @param {any} userId 
 * @param {any} questionId 
 * @returns {Observable<string[]>} 
 * @memberof RestProvider
 */
saveFavourite(userId,questionId):Observable<string[]>{
    return this.getUrlReturn(this.apiUrlSaveFavourite + "?questionid=" + questionId + "&userid=" + userId)
  }
  /**
   * 定义全局http请求
   * 
   * @private
   * @param {string} url 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /**
   * 处理返回的数据格式
   * 
   * @private
   * @param {Response} res 
   * @returns 
   * @memberof RestProvider
   */
  private extractData(res: Response) {
    let body = res.json();
    return JSON.parse(body)

  }
  /**
   * 处理各种错误情况
   * 
   * @private
   * @param {(Response | any)} error 
   * @returns 
   * @memberof RestProvider
   */
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
