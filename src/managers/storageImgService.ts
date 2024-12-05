import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

// Definir la interfaz UserDocument
interface UserDocument {
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class StorageImgService {

  constructor(private firestore: AngularFirestore) {}

  async cargarFile(filePath: string, userId: string): Promise<string> {
    try {
      // Almacenar la imagen en Firestore en formato base64
      await this.firestore.collection('users').doc(userId).set({ imageUrl: filePath }, { merge: true });
      return filePath;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw error;
    }
  }

  async getFile(userId: string): Promise<string> {
    try {
      const doc = await this.firestore.collection('users').doc(userId).get().toPromise();
      if (doc.exists) {
        const data = doc.data() as UserDocument;
        if (data && data.imageUrl) {
          return data.imageUrl;
        } else {
          throw new Error('El campo imageUrl no existe en el documento.');
        }
      } else {
        throw new Error('No se encontró el documento del usuario.');
      }
    } catch (error) {
      console.error('Error al obtener el archivo:', error);
      throw error;
    }
  }

  async deleteFile(userId: string): Promise<void> {
    try {
      await this.firestore.collection('users').doc(userId).update({ imageUrl: null });
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
      throw error;
    }
  }
}