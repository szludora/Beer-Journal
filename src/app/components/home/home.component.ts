import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
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
        console.log(this.beers); 
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
