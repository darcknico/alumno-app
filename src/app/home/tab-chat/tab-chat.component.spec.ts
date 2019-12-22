import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabChatComponent } from './tab-chat.component';

describe('TabChatComponent', () => {
  let component: TabChatComponent;
  let fixture: ComponentFixture<TabChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabChatComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
