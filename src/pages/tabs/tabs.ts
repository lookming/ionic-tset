import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { ChatPage } from '../chat/chat';
import { FindPage } from '../find/find';
import { MessagePage } from '../message/message';
import { MorePage } from '../more/more';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabHome = HomePage
  tabFind = FindPage
  tabChat = ChatPage
  tabMessage = MessagePage
  tabMore = MorePage

  constructor() {

  }
}
