import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private localstorage: LocalStorageService) {}

  beers = Array(50);
}
