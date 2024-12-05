import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ImagenService } from 'src/managers/imagenService';
import { UserService } from 'src/managers/UserService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  photoURL: string = 'assets/foto_perfil.jpg';
  userProfile: any;

  constructor(
    private actionSheetController: ActionSheetController,
    private imageService: ImagenService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.userProfile$.subscribe(profile => {
      if (profile) {
        this.photoURL = profile.imageUrl || this.photoURL;
        this.userProfile = profile;
      }
    });
  }

  async onPressCambiarImg() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Cámara',
          icon: 'camera',
          handler: async () => {
            const resultado = await this.imageService.obtenerImagenCamara();
            this.resultadoActualizacionImg(resultado);
          }
        },
        {
          text: 'Imágenes',
          icon: 'image',
          handler: async () => {
            const resultado = await this.imageService.obtenerImagenGaleria();
            this.resultadoActualizacionImg(resultado);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    await actionSheet.present();
  }

  resultadoActualizacionImg(resultado: { success: boolean, message: string, imageUrl?: string }) {
    if (resultado.success && resultado.imageUrl) {
      this.photoURL = resultado.imageUrl;
      this.userService.updateUserProfileImage(this.photoURL); // Actualizar el perfil del usuario en el servicio
    } else {
      console.error('Error al actualizar la imagen:', resultado.message);
    }
  }

  onPressVolverHome() {
    this.router.navigate(['/home-cliente']);
  }
}