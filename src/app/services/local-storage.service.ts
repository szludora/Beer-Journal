import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
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

  removeOneItem(key: string, index: number): void {
    let list = this.getItem(key);
    if (list) {
      let beers = JSON.parse(list);
      beers.splice(index, 1);
      this.setItem(key, beers);
    }
  }

  changeFavorite(index: number): void {
    let list = this.getItem('beers');
    if (list) {
      let beers = JSON.parse(list);
      beers[index].isFavorite = !beers[index].isFavorite;
      this.setItem('beers', beers);
    }
  }

  updateBeerInLocalStorage(index: number, attr: string, value: string): void {
    let list = this.getItem('beers');
    if (list) {
      let beers = JSON.parse(list);
      beers[index][attr] = value;
      this.setItem('beers', beers);
    }
  }
}
