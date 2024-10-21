import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-demo',
  templateUrl: './header-demo.component.html',
  styleUrls: ['./header-demo.component.scss'],
})
export class HeaderDemoComponent  implements OnInit {

  @Input() title!:string
  @Input() text_date!:string
  @Input() name!:string
  constructor() { }

  ngOnInit() {}

}
