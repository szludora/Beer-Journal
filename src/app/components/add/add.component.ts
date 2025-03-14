import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import beerOptions from './beerOptions.json';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  constructor(private localstorage: LocalStorageService) {}

  ngOnInit() {
    this.beerTypes = beerOptions.beerTypes;
    this.ratings = beerOptions.ratings;
  }

  beerTypes: any = [];
  ratings: { attribute: string; value: number; hover: number }[] = [];
  beerName = '';
  description = '';
  imageData: string | null = null;

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imageData = reader.result as string;
        localStorage.setItem('uploadedImage', this.imageData);
      };

      reader.readAsDataURL(file);
    }
  }

  deleteImage() {
    localStorage.removeItem('uploadedImage');
    this.imageData = null;
  }

  starRating = { value: 0, hover: 0 };

  isFavorite = false;

  selectedBeer: string = '';

  selectBeer(index: number) {
    this.selectedBeer = this.beerTypes[index].name;
  }

  setRating(attribute: string, index: number, event: MouseEvent) {
    const rating = this.ratings.find((r) => r.attribute === attribute);
    if (rating) {
      const starElement = event.target as HTMLElement;
      const starWidth = starElement.offsetWidth;
      const clickPosition = event.offsetX;

      if (clickPosition < starWidth / 2) {
        rating.value = index + 0.5;
      } else {
        rating.value = index + 1;
      }

      rating.hover = rating.value;
    }
  }

  previewRating(event: MouseEvent, index: number, attribute: string) {
    const rating = this.ratings.find((r) => r.attribute === attribute);
    if (rating) {
      const starElement = event.target as HTMLElement;
      const starWidth = starElement.offsetWidth;
      const clickPosition = event.offsetX;

      if (clickPosition < starWidth / 2) {
        rating.hover = index + 0.5;
      } else {
        rating.hover = index + 1;
      }
    }
  }

  resetHover(attribute: string) {
    const rating = this.ratings.find((r) => r.attribute === attribute);
    if (rating) {
      rating.hover = rating.value;
    }
  }

  getImagePath(attribute: string, type: string): string {
    return `/assets/ratings/${attribute}-${type}.png`;
  }

  submit() {
    const formData = {
      isFavorite: this.isFavorite,
      beerName: this.beerName,
      description: this.description,
      selectedBeer: this.selectedBeer,
      ratings: this.ratings,
      imageData: this.imageData,
    };

    let list = localStorage.getItem('beers');

    if (list) {
      let beers = JSON.parse(list);
      beers.push(formData);
      localStorage.setItem('beers', JSON.stringify(beers));
    } else {
      localStorage.setItem('beers', JSON.stringify([formData]));
    }

  }
}
