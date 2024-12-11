import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ImagenService } from 'src/managers/imagenService';

import { Router } from '@angular/router';
import { AuthenticationService } from '../firebase/authentication.service';
import { ActualizacionImagenUseCase } from '../casos_uso/actualizacion_imagen.use-case';


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
    private authService: AuthenticationService,
    private router: Router,
    private actualizacionImagenUseCase: ActualizacionImagenUseCase
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(profile => {
      if (profile) {
        this.photoURL = profile.photoURL || this.photoURL;
        this.userProfile = profile;
      }
    });

    this.authService.userProfile$.subscribe(profile => {
      if (profile) {
        this.photoURL = profile.imageUrl || this.photoURL;
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

  async resultadoActualizacionImg(resultado: { success: boolean, message: string, imageUrl?: string }) {
    if (resultado.success && resultado.imageUrl) {
      const updateResult = await this.actualizacionImagenUseCase.actualizarImgUser(resultado.imageUrl);
      if (updateResult.success) {
        this.photoURL = resultado.imageUrl;
      } else {
        console.error('Error al actualizar la imagen:', updateResult.message);
      }
    } else {
      console.error('Error al actualizar la imagen:', resultado.message);
    }
  }

  onPressVolverHome() {
    this.router.navigate(['/home-cliente']);
  }
}