import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ImagenService } from 'src/managers/imagenService';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  photoURL: string = 'assets/foto_perfil.jpg'

  constructor(  private actionSheetController: ActionSheetController, private imageService:ImagenService) { }

  ngOnInit() {
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
            this.resultadoActualizacionImg(resultado)
          }
        },
        {
          text: 'Imágenes',
          icon: 'image',
          handler: async () => {
            const resultado = await this.imageService.obtenerImagenGaleria();
            this.resultadoActualizacionImg(resultado)
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

  private resultadoActualizacionImg(uploadResult: { success: boolean, message: string, imageUrl?: string }){
    if (uploadResult.success) {
      alert("Imagen actualizada")
      this.photoURL = uploadResult.imageUrl || 'assets/default-avatar.png';
      // this.alert.showAlert(
      //   'Imagen Actualizada',
      //   'Tu imagen de perfil ha sido actualizada con éxito.',
      //   () => {
      //     this.photoURL = uploadResult.imageUrl || 'assets/default-avatar.png';
      //   }
      // );
    } else {
      alert("Error al actualizar imagen")
      // this.alert.showAlert(
      //   'Error',
      //   uploadResult.message,
      //   () => { }
      // );
    }
  }

}
