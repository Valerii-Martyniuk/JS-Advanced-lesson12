import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constant';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.scss'],
})
export class AuthUserComponent implements OnInit {
  public authForm!: FormGroup;
  public loginForm!: FormGroup;
  public isAccount: boolean = true;
  public dd = 'HHH';

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private afs: Firestore,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AuthUserComponent>,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.initAuthForm();
    this.initLoginForm();
  }

  /////////////////// LOGIN DATA //////////////

  initAuthForm(): void {
    this.authForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      phoneNumber: [null, [Validators.required, Validators.minLength(10)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, this.passwordValidator]],
      passwordCheck: [null, [Validators.required, this.passwordValidator]],
    });
  }
  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, this.passwordValidator]],
    });
  }
//////////////////VALIDATOR////////////
  passwordValidator(formControl: FormControl) {
    const regExp = /\d/;
    const regExp2 = /[a-zA-Z]+/;
    const regExp3 = /[a-zA-Z0-9]{5}/;
    if (
      regExp2.test(formControl.value) &&
      regExp.test(formControl.value) &&
      regExp3.test(formControl.value)
    ) {
      return null;
    }

    return { mes: { mes: 'sd' } };
  }

  ////////LOGIN////////

  login(): void {
    const { email, password } = this.loginForm.value;
    this.loginUser(email, password)
      .then(() => {
        this.toastr.success('User successfully login');
        this.loginForm.reset();
        this.dialogRef.close();
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  async loginUser(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe((user) => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) {
        this.router.navigate(['/user']);
      }
    });
  }
  ////////////////////////CREATE ACCOUNT////////////////
  create(): void {
    const { firstName, lastName, phoneNumber, email, password, passwordCheck } =
      this.authForm.value;
    if (password === passwordCheck) {
      this.emailSignUp(firstName, lastName, phoneNumber, email, password)
        .then(() => {
          this.toastr.success('User successfully created');
          this.authForm.reset();
          this.dialogRef.close();
        })
        .catch((e) => {
          this.toastr.error(e.message);
        });
    } else {
      this.toastr.error('passwords do not match');
    }
  }
  async emailSignUp(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string
  ): Promise<any> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = {
      email: credential.user.email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      addres: '',
      orders: [],
      role: 'USER',
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
    this.authForm.reset();
  }
  /////////////CLOSE COMPONENT//////////////
  closeComponent(): void {
    this.dialog.closeAll();
  }
}
