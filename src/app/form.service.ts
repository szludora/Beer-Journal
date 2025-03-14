import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  beer: {
    beerName: string;
    description: string;
    imageData: string;
    isFavorite: boolean;
    selectedBeer: string;
    ratings: { attribute: string; value: number; hover: number }[];
  } = {
    beerName: '',
    description: '',
    imageData: '',
    isFavorite: false,
    selectedBeer: '',
    ratings: [
      { attribute: 'strength', value: 0, hover: 0 },
      { attribute: 'fruitiness', value: 0, hover: 0 },
      { attribute: 'price', value: 0, hover: 0 },
      { attribute: 'aftertaste', value: 0, hover: 0 },
      { attribute: 'star', value: 0, hover: 0 },
    ],
  };

  setRating(attribute: string, index: number, event: MouseEvent) {
    const rating = this.beer.ratings.find((r) => r.attribute === attribute);
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
    const rating = this.beer.ratings.find((r) => r.attribute === attribute);
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
    const rating = this.beer.ratings.find((r) => r.attribute === attribute);
    if (rating) {
      rating.hover = rating.value;
    }
  }

  getImagePath(attribute: string, type: string): string {
    return `/assets/ratings/${attribute}-${type}.png`;
  }

  saveToLocalStorage(current: number, beer: any) {
    let list = localStorage.getItem('beers');
    if (list) {
      let beers = JSON.parse(list);
      if (current >= 0) {
        beers[current] = beer;
      } else {
        beers.push(beer);
      }
      localStorage.setItem('beers', JSON.stringify(beers));
    } else {
      localStorage.setItem('beers', JSON.stringify([beer]));
    }
  }

  handleFileSelected(event: Event, current: number, beer: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        beer.imageData = reader.result as string;
        this.saveToLocalStorage(current, beer);
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImage(current: number, beer: any) {
    beer.imageData = '';
    this.saveToLocalStorage(current, beer);
  }

  toggleFavorite(current: number, beer: any) {
    beer.isFavorite = !beer.isFavorite;
    this.saveToLocalStorage(current, beer);
  }

  deleteBeer(current: number) {
    let list = localStorage.getItem('beers');
    if (list) {
      let beers = JSON.parse(list);
      beers.splice(current, 1);
      localStorage.setItem('beers', JSON.stringify(beers));
    }
  }
}
