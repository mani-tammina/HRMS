import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-decline-resons',
  templateUrl: './decline-resons.component.html',
  styleUrls: ['./decline-resons.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ],
})
export class DeclineResonsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
