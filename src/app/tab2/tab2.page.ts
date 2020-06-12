import { Component } from '@angular/core';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, Data, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditNoteModalPage } from '../modals/edit-note-modal/edit-note-modal.page';
import { AlertController, NavController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comentario } from '../modelo/Comentario';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public listadoPanel;
  public listadoPanelCopy;
  public todoForm: FormGroup;


  constructor(private todoS: TodoservicioService,
    public loadingController: LoadingController, private router: Router, public modalController: ModalController,
    public alertController: AlertController, private formBuilder: FormBuilder,
     public toastController: ToastController, private loading: LoadingController, public navCtrl: NavController ) {
  }


  ngOnInit() {
    this.refrescar();
    
  }

  async alertBorraNota(id: string) {
    const alert = await this.alertController.create({
      header: 'Borrar Hilo',
      message: '¿Estás seguro que desea borrar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.borraNota(id);
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
  public note = {
    id: '',
    title: '',
    description: ''
  };

  async openEditModal(item: Data) {
    this.note = {
      id: item.id,
      title: item.title,
      description: item.description
    };

    const modal = await this.modalController.create({
      component: EditNoteModalPage,
      componentProps: {
        note: this.note
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      this.note = dataReturned.data;
      console.log('Receive: ', this.note);
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', this.note);
    });
  }
  async openModal(item: Data) {
    this.note = {
      id: item.id,
      title: item.title,
      description: item.description
    };

  }
  public borraNota(id: string) {
    console.log("Borrando...");
    this.todoS.removeTODO(id)
      .then((salida) => {
        this.refrescar();
      }).catch((err) => {
        console.log(err);
      });
  }
  public openHiloPage(item: Data){
    console.log("abriendo hilo page");
    let navigationExtras: NavigationExtras = { state: { hilo: item } };
    this.router.navigate(['/hilo'], navigationExtras);
    //this.nav.push(HiloPage);
  }

  private refrescar() {
    this.presentLoading();
    this.listadoPanel = [];
    console.log("Cargando notas");
    try {
      this.todoS.readTODO2().subscribe((lista) => {
        this.listadoPanel = lista;
        console.log("Imprimiendo lista de hilos");
        console.log(lista);
        this.listadoPanelCopy = lista;
        this.loadingController.dismiss();
      });
      console.log("Solicitada la peticion");
    } catch (error) {
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  public doRefresh(event: any) {
    this.listadoPanel = [];
    console.log("Cargando notas");
    let Myobservable = this.todoS.readTODO();
    Myobservable.subscribe((lista) => {
      this.listadoPanel = [];
      lista.docs.forEach((nota) => {
        this.listadoPanel.push({ id: nota.id, ...nota.data() });
      });
      this.loadingController.dismiss();
    })
    event.target.complete();
  }
  public irNueva(): void {
    this.router.navigateByUrl('/tabs/tab1');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.listadoPanel = this.listadoPanelCopy;

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // this.isItemAvailable = true;
      this.listadoPanel = this.listadoPanel.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  addComentario() {
    let data: Comentario;
    data = {
      contenido: this.todoForm.get('contenido').value,
      hiloId: this.note.id,
      userId: "f"
    }
    this.presentLoading();
    this.todoS.addComentario(data)
      .then((ok) => {
        this.todoForm.reset();
        this.presentToast("Comantando..", 2000, 'success');
      })
      .catch((err) => {
        this.presentToast('Error..', 40000, 'danger');

      })
      .finally(() => {
        this.loading.dismiss();
      })

  }

  async presentToast(msg: string, dur: number = 2000, col: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: dur,
      color: col
    });
    toast.present();
  }
}
