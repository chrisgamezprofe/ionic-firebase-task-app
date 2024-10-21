import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage implements OnInit {

  tasksList = [
    {
      id: 1,
      title: 'Diseñar App Móvil',
      dueDate:'2026-01-15',
      status: 'pending',
      priority:'high',
      category:'Trabajo'
    },
    {
      id: 2,
      title: 'Cita Médica',
      dueDate:'2027-12-01',
      status: 'pending',
      priority:'low',
      category:'Personal'
    },
    {
      id: 3,
      title: 'Probar App Móvil',
      dueDate:'2029-06-01',
      status: 'completed',
      priority:'middle',
      category:'Trabajo'
    },
    {
      id: 4,
      title: 'Publicar Curso de Ionic',
      dueDate:'2027-11-20',
      status: 'pending',
      priority:'high',
      category:'Otro'
    },
    {
      id: 5,
      title: 'Grabar Curso de Ionic',
      dueDate:'2027-10-20',
      status: 'pending',
      priority:'high',
      category:'Otro'
    },
    {
      id: 6,
      title: 'Ver Curso de Ionic',
      dueDate:'2027-10-24',
      status: 'pending',
      priority:'high',
      category:'Trabajo'
    }
  ];

  today :number = Date.now();


  constructor() { }

  ngOnInit() {
  }

}
