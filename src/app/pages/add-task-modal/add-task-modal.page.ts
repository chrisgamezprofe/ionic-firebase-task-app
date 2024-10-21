import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskModel } from 'src/app/models/task';
import { AuthService } from 'src/app/services/auth.service';
import { CollectionServiceService } from 'src/app/services/collection-service.service';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.page.html',
  styleUrls: ['./add-task-modal.page.scss'],
})
export class AddTaskModalPage implements OnInit {
  title: string = '';
  category: any = 'Trabajo';
  priority: any = 'high'; 
  dueDate: string = new Date().toISOString(); 
  completed: boolean = false;

  constructor(private modalCtrl:ModalController, private collectionService: CollectionServiceService,private authService:AuthService) { }

  ngOnInit() {
    
  }

  async addTask(){
    const newTask = {
      title: this.title,
      category: this.category,
      dueDate: this.dueDate,
      completed: this.completed,
      priority:this.priority,
      userId: (await this.authService.userData()).uid
    }

    await this.collectionService.addDocument('tasks',newTask);

    this.dismiss();

  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

}
