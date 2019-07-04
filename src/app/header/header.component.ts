import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private service: UserService, private router: Router, private authGuard: AuthGuard) { }

  ngOnInit() {

  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
