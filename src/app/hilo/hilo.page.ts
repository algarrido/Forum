import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

import { ModalController, NavParams, NavController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { hilo } from '../modelo/hilo';
import { Comentario } from '../modelo/Comentario';

import { Title } from '@angular/platform-browser';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router, Data } from '@angular/router';

@Component({
  selector: 'app-hilo',
  templateUrl: './hilo.page.html',
  styleUrls: ['./hilo.page.scss'],
})
export class HiloPage implements OnInit {
  hilo: Data;
  public listadoPanel;
  public listadoPanelCopy;
  public todoForm: FormGroup;

  constructor(private todoS: TodoservicioService,private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private loading: LoadingController, public toastController: ToastController, private route: ActivatedRoute, private router: Router, public auth:AuthService) { }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      contenido: ['']
    });

     this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.hilo= this.router.getCurrentNavigation().extras.state.hilo;
      }
    });

    console.log("hilo:", this.hilo);

    this.mostrarComentarios();
  }

  publicar() {
    let comentario: Comentario;
    comentario = {
      contenido: this.todoForm.get('contenido').value,
      hiloId: this.hilo.id,
      userId: this.auth.user.email
    }
    this.todoS.addComentario(comentario)
      .then((ok) => {
        this.todoForm.reset();
      })
      .catch((err) => {

      })
      .finally(() => {
        this.loading.dismiss();
      })
      this.mostrarComentarios();
  }

  mostrarComentarios(){
    this.listadoPanel = [];
    try {
      this.todoS.readComentarios(this.hilo.id).subscribe((lista) => {
        this.listadoPanel = lista;
        console.log("Imprimiendo lista de comentarios");
        console.log(lista);
        this.listadoPanelCopy = lista;
        //this.loadingController.dismiss();
      });
      console.log("Solicitada la peticion");
    } catch (error) {
    }    
  }

}
