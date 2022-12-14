import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
  let fakepassword:String= "123";
  expect(component.password).toBeTruthy();
  });

  it('should create', () => {
    let fakepassword:String= "123";
    expect(component.confirmPassword).toBeTruthy();
  });

  it('should create', () => {
    let passwordInput = document.getElementById("password")
    component.signUpForm.controls['password'].setValue("123")
    component.signUpForm.controls['confirmPassword'].setValue("321")
    expect(component.signUpForm.valid).toBeFalsy()
    // @ts-ignore
 //   passwordInput.innerHTML = "123"
  //  let  confirmInput = document.getElementById("confirmPassword")
    // @ts-ignore
 //   confirmInput.innerHTML = "321"
 //component.confirmPassword
  //  expect(component.confirmPassword).toBeFalsy();
  });
});
