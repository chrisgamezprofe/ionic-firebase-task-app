import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CollectionServiceService {

  constructor(private firestore:AngularFirestore) { }

  async addDocument(collectionName:string,data:any){
    return this.firestore.collection(collectionName).add(data);
  }

  async addDocumentByuser(collectionName:string,data:any,userId:string){
    const document = {...data,userId};
    return this.firestore.collection(collectionName).add(document);
  }

  async getDocuments(collectionName:string){
    return this.firestore.collection(collectionName).snapshotChanges();
  }

  async getDocumentsByUserId(collectionName:string,userId: string){
    return this.firestore.collection(collectionName,ref=>ref.where('userId','==',userId)).snapshotChanges();
  }

  async getDocumentById(collectionName:string,id:string){
    return this.firestore.collection(collectionName).doc(id).valueChanges();
  }

  async getDocumentByField(collectionName:string,fieldName:string,fieldValue:string){
    const query = this.firestore.collection(collectionName,ref=> ref.where(fieldName,'==',fieldValue))
    .valueChanges();
    return await firstValueFrom(query);
  }

  async updateDocument(collectionName:string,id:string,data:any){
    return this.firestore.collection(collectionName).doc(id).update(data);
  }

  async deleteDocument(collectionName:string,id:string){
    return this.firestore.collection(collectionName).doc(id).delete();
  }
}
