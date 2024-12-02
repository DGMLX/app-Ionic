import { Injectable } from '@angular/core';
import { StorageService } from 'src/managers/StorageService';
import { firstValueFrom } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class UploadUserImageUseCase {

  constructor(
    private storageService: StorageService,
    private db: AngularFireDatabase, // Acceso a Realtime Database
    private storage: AngularFireStorage
  ) {}

  async uploadFile(filePath: string, storagePath: string, fileName: string): Promise<string> {
    try {
      const storageRef = this.storage.ref(storagePath);

      // Subimos el archivo
      const uploadTask = await storageRef.putString(filePath, 'data_url'); // Usando 'data_url' para base64

      // Una vez que la carga finalice, obtenemos la URL de descarga usando firstValueFrom
      const downloadURL = await firstValueFrom(storageRef.getDownloadURL());

      return downloadURL;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw error;
    }
  }


  async UploadUserImage(imageUrl: string): Promise<{ success: boolean, message: string }> {
    try {
      // Obtiene el usuario almacenado localmente desde StorageService
      const user = await this.storageService.get('user');

      if (user && user.uid) {
        const uid = user.uid;

        // Define la ruta de almacenamiento en Firebase Storage
        const path = `Users/${uid}/profile-image.jpg`;

        // Sube la imagen a Firebase Storage y obtén la URL de la imagen subida
        const downloadURL = await this.uploadFile(imageUrl, path, 'profile-image.jpg');

        // Actualiza el nodo del usuario en Realtime Database con la nueva URL de la imagen
        await this.db.object(`users/${uid}`).update({ photoURL: downloadURL });

        // Actualiza el campo photoURL del usuario en StorageService
        user.photoURL = downloadURL;
        await this.storageService.set('user', user);

        // Guarda la URL de la imagen también en el StorageService bajo la clave "UserPhotoURL"
        await this.storageService.set('UserPhotoURL', downloadURL);

        return { success: true, message: 'Imagen de usuario actualizada con éxito.' };

      } else {
        return { success: false, message: 'No se encontró el UID del usuario.' };
      }

    } catch (error) {
      return { success: false, message: `Error al subir la imagen: ${error.message}` };
    }
  }
}