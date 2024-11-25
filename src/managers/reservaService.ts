
import {Injectable} from "@angular/core";
import { SessionManager } from "./sessionManager";
import {addDoc, collection, Firestore,query,where,collectionData, doc, docData, updateDoc, deleteDoc} from "@angular/fire/firestore"
import { Observable } from "rxjs";

export class Reserva{
    id?:string;
    userId:string;
    fecha: string;
    servicio: string;
    hora: string;

    constructor(userId:string,fecha:string,servicio:string,hora:string){
        this.userId = userId;
        this.fecha = fecha;
        this.hora = hora;
        this.servicio = servicio;
    }
}

@Injectable({
    providedIn:"root"
})

export class ReservasService{

    userId:string;
  

    constructor(private authService:SessionManager,private firestore:Firestore){
        this.authService.getProfile().then(user=>{
            this.userId=user!.uid
            console.log(this.userId)
        })
    }


    agregarReserva(reserva:Reserva){
        reserva.userId = this.userId
        const reservaRef = collection(this.firestore,"reservas")
        return addDoc(reservaRef,reserva)
    }

    obtenerReserva(userId:any):Observable<Reserva[]>{
        const reservaRef = collection(this.firestore,"reservas")
        const refquery = query(reservaRef,where("userId","==",userId))
        return collectionData(refquery,{idField:"id"}) as Observable<Reserva[]>
    }

    obtenerReservaId(id:any) : Observable<Reserva>{
        const reservaRef = doc(this.firestore,`reservas/${id}`)
        return docData(reservaRef,{idField:'id'}) as Observable<Reserva>
    }

    actualizarReserva(reserva:Reserva){
        const reservaRef = doc(this.firestore, `reservas/${reserva.id}`)
        return updateDoc(reservaRef,{fecha:reserva.fecha,hora:reserva.hora})
    }

    eliminarReserva(id:any){
        const reservaRef = doc(this.firestore, `reservas/${id}`)
        return deleteDoc(reservaRef)
    }

}