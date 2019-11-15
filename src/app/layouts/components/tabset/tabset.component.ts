import {AfterContentInit, Component, ContentChildren, QueryList} from '@angular/core';
import {TabComponent} from './components/tab/tab.component';

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.scss']
})
export class TabsetComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    setTimeout(() => {
      const activeTabs = this.tabs.filter((tab) => tab.active);
      // if there is no active tab set, activate the first
      if (activeTabs.length === 0) {
        this.selectTab(this.tabs.first);
      }
    });
  }

  selectTab(tab) {
    // deactivate all tabs
    this.tabs.map((onetab: TabComponent) => {
      onetab.active = false;
    });
    // activate the tab the user has clicked on.
    tab.changeTab.emit();
    tab.active = true;
  }

  changeTabName(name) {
    this.tabs.map(onetab => {
      if (onetab.name === name) {
        this.selectTab(onetab);
      }
    });
  }
}
