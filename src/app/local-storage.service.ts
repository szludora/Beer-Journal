import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  removeOneItem(key: string, index: number) {
    let list = localStorage.getItem('beers');

    if (list) {
      let beers = JSON.parse(list);
      beers.splice(beers[index], 1);
      localStorage.setItem(key, JSON.stringify(beers));
    }
  }

  changeFavorite(index: number) {
    let list = this.getItem('beers');
    if (list) {
      let beers = JSON.parse(list);
      beers[index].isFavorite = !beers[index].isFavorite;
      this.setItem('beers', beers);
    }
  }

  updateBeerInLocalStorage(index: number, attr: string, value: string) {
    let list = localStorage.getItem('beers');

    if (list) {
      let beers = JSON.parse(list);
      beers[index].attr = value;
      localStorage.setItem('beers', JSON.stringify(beers));
    }
  }
}
