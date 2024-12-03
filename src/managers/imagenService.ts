import {Injectable} from "@angular/core";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActualizacionImagenUseCase } from "src/app/casos_uso/actualizacion_imagen.use-case";


@Injectable({
  providedIn: 'root',
})

export class ImagenService{

  constructor(private actualizarImgUseCase:ActualizacionImagenUseCase){}

  async obtenerImagenCamara(): Promise<{success:boolean,message:string,imageUrl?:string}>{
    try{
      const imagen = await Camera.getPhoto({
        quality:90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      const imageUrl = imagen.dataUrl
      return this.actualizarImagen(imageUrl)
      
    } catch (error){
      return { success: false, message: 'Error al obtener la imagen de la cámara.' };
    }
  }


  async obtenerImagenGaleria():Promise<{ success: boolean, message: string, imagenUrl?: string }> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      const imageUrl = image.dataUrl;
      return this.actualizarImagen(imageUrl)
    } catch (error) {
      return { success: false, message: 'Error al obtener la imagen de la galería.' };
    }

  }


  private async actualizarImagen(imagenUrl:string):Promise<{ success: boolean, message: string, imageUrl?: string }>{
    const resultadoActualizacion = await this.actualizarImgUseCase.actualizarImgUser(imagenUrl)
    if (resultadoActualizacion.success) {
      return { success: true, message: 'Imagen subida con éxito', imageUrl: imagenUrl };
    } else {
      return { success: false, message: resultadoActualizacion.message };
    }
  }

}