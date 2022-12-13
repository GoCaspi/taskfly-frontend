import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import {AuthenticationService} from "./serives/authentication.service";
import { MatMenuModule } from '@angular/material/menu';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_SCROLL_STRATEGY, MatDialog} from "@angular/material/dialog";
import {ResetDialogComponent} from "./reset-dialog/reset-dialog.component";
import {Dialog} from "@angular/cdk/dialog";
import {By} from "@angular/platform-browser";
import {EMPTY} from "rxjs";
import {BrowserStorageService, StorageService} from "./storage.service";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";

describe('AppComponent', () => {
  let storagespy: Spy<BrowserStorageService>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,ResetDialogComponent
      ],
      imports: [
        MatMenuModule,
      ],
      providers: [
        AuthenticationService,{
        provide:HttpClient,
        useValue:HttpClient
        },
        {
          provide:BrowserStorageService, useValue:createSpyFromClass(BrowserStorageService)
        },
        HttpClient,ResetDialogComponent,{provide:MatDialog, useValue:MatDialog},{
          provide : MAT_DIALOG_SCROLL_STRATEGY,
          useValue : {}
        },{provide: Dialog, useValue: {}},{provide:HttpClient,useValue: HttpClient}
      ],

    }).compileComponents();
    storagespy = TestBed.inject<any>(BrowserStorageService)
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TaskFly-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.title).toEqual('TaskFly-frontend');
  });

  it('should have a button to reset the password. The inner text of the button element is : "Passwort vergessen?"', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.componentInstance.loginStatus = false
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.css('#openResetButton'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#openResetButton')).nativeElement.innerHTML).toEqual("Passwort vergessen?");
  });

  it('Test ngOnInit', function (){
    storagespy.get.and.returnValue("false")
  });

  it('should have a button-method openResetDialog, that opens the ResetDialog if clicked', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const openDialogSpy = spyOn(app.dialog, 'open').and.returnValue({afterClosed: () => EMPTY} as any)

    app.openReset();
    fixture.componentInstance.loginStatus = true

    expect(openDialogSpy).toHaveBeenCalled();
    expect(openDialogSpy).toHaveBeenCalledWith(ResetDialogComponent);
  });

  it('logout test', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    storagespy.get.and.returnValue("true")
    storagespy.set.and.returnValue("false")
    //storagespy.storage.setItem("loginStatus", "true");
    app.logout();
    expect(storagespy.get("loginStatus")).toEqual("true");
  });
});
