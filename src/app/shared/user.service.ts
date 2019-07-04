import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User, Pacienti } from '../user.model';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'http://localhost:49428/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Nume: ['', Validators.required],
    Prenume: ['', Validators.required],
    ZiuaNastere: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

  comparePasswords(fb: FormGroup) {
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
      if (fb.get('Password').value != confirmPasswordCtrl.value)
        confirmPasswordCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPasswordCtrl.setErrors(null);
    }
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  register() {
    var formDate = formatDate(this.formModel.value.ZiuaNastere, 'MM-dd-yyyy', 'ro')
    var body = {
      UserName: this.formModel.value.UserName,
      Nume: this.formModel.value.Nume,
      Prenume: this.formModel.value.Prenume,
      ZiuaNastere: formDate,
      Password: this.formModel.value.Passwords.Password
    };
    console.log(body)
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);

  }

  getUserProfile(): Observable<User[]> {
    return this.http.get<User[]>(this.BaseURI + '/UserProfile');
  }

  putUserProfile(body) {
    return this.http.put(this.BaseURI + '/UserProfile', body);

  }

  getPacienti(): Observable<Pacienti[]> {
    return this.http.get<Pacienti[]>(this.BaseURI + '/Pacientis')
      .pipe(
        map((data: any[]) => data.map((item: any) => new Pacienti(
          item.id,
          item.nume,
          item.prenume,
          formatDate(item.ziuaNastere, "dd-MM-yyyy", "ro"),
          formatDate(item.dataInregistrare, "dd-MM-yyyy", "ro"),
          item.notes,
        ))),
      );
  }

  deletePacienti(id) {
    return this.http.delete<Pacienti[]>(this.BaseURI + '/Pacientis/' + id)
  }

  putPacienti(body, id) {
    return this.http.put<Pacienti[]>(this.BaseURI + '/Pacientis/' + id, body)
  }

  postPacienti(body) {
    return this.http.post<Pacienti[]>(this.BaseURI + '/Pacientis/', body)
  }

}
