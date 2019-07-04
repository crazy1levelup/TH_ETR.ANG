import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service: UserService, private router: Router) { }

  ngOnInit() {

    this.service.formModel.reset()
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset()
          alert("New user created")
          this.router.navigateByUrl('/login')
        } else {
          res.error.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                alert("Username is already taken")
                break;
              default:
                alert("Registration failed")
                break;
            }
          });
        }
      },
      err => { console.log(err) }
    )
  }
}
