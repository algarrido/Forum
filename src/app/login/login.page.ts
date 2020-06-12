import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { UiComponent } from '../common/ui/ui.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth:AuthService,
    private ui:UiComponent,
    private router:Router) { }

  ngOnInit() {
  }

  public async loginGoogle(){
    this.ui.presentLoading();
    const r:boolean= await this.auth.loginGoogle();
    this.ui.hideLoading();
    if(r){
      this.router.navigate(['/tabs']);
    }
    //OCULTAR
  }
}
