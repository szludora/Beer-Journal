import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../local-storage.service';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private localstorage: LocalStorageService) {}

  ngOnInit(): void {
    let list = this.localstorage.getItem('beers');

    if (list) {
      try {
        this.beers = JSON.parse(list);
      } catch (error) {
        this.beers = [];
      }
    } else {
      this.beers = [];
    }
  }

  beers: {
    beerName: string;
    description: string;
    imageData: string;
    isFavorite: boolean;
    selectedBeer: string;
    ratings: { attribute: string; value: number; hover: number };
  }[] = [];
}
