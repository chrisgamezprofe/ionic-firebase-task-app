import { Component, OnInit } from '@angular/core';
import { isPlatform, ModalController } from '@ionic/angular';
import { TaskModel } from 'src/app/models/task';
import { AuthService } from 'src/app/services/auth.service';
import { CollectionServiceService } from 'src/app/services/collection-service.service';
import { AddTaskModalPage } from '../add-task-modal/add-task-modal.page';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  today :number = Date.now();
  fullName:string =""

  tasks: TaskModel[] = [];

  constructor(private authService:AuthService, private collectionService: CollectionServiceService, private modalCtrl:ModalController) { }

  ngOnInit() {
    this.initName()
  }

  ionViewWillEnter(){
    this.loadTasksByUserId()
  }

  async loadTasks(){
    (await this.collectionService.getDocuments('tasks'))
    .subscribe((taskSnapshot:any)=>{
      this.tasks = taskSnapshot.map((item:any)=>{
        const data = item.payload.doc.data();
        const id = item.payload.doc.id;
        return {id,...data}
      });
    });
    
  }

  async loadTasksByUserId(){
    const userId :any= await (await this.authService.userData()).uid;
    (await this.collectionService.getDocumentsByUserId('tasks',userId))
    .subscribe((taskSnapshot:any)=>{
      this.tasks = taskSnapshot.map((item:any)=>{
        const data = item.payload.doc.data();
        const id = item.payload.doc.id;
        return {id,...data}
      });
    });
    
  }

  async completeTask(id:string){
    
    const task = this.tasks.find(t=>t.id === id);
    if(task){
      task.completed = !task.completed;
      await this.collectionService.updateDocument('tasks', task.id, task);
      this.loadTasksByUserId();
    }
  }

  async deleteTask(id:string){
      await this.collectionService.deleteDocument('tasks', id);
      this.loadTasksByUserId();
  }


  async logOut(){
    await this.authService.logOut();
  }

  async openAddTaskModal(){
    const modal = await this.modalCtrl.create({
      component: AddTaskModalPage
    });

    modal.onDidDismiss().then(()=>{
      this.loadTasksByUserId();
    });

    return await modal.present();
  }
  
  async shareTask(task:TaskModel){
    if(isPlatform('capacitor')){
      const share = await Share.share({
        title: task.title,
        text: `Tarea: ${task.title} - prioridad: ${task.priority} y vence: ${task.dueDate}`,
        dialogTitle:"Compartir tarea"
      });
    }else{
      alert('Esta funcionalidad es solo para dispositivos')
    }
  }

  async initName() {
    this.fullName = await (await this.authService.userData()).name
  }

}


