import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-page2',
  imports: [CommonModule, LocalStorageService],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss',
})
export class Page2Component {}
