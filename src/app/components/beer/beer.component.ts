import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class BeerComponent implements OnInit {
  current: number = 0;
  isModifyDesc: boolean = false;
  isModifyImg: boolean = false;

  constructor(
    public formService: FormService,
    private router: Router,
    private localstorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    const urlParts = window.location.pathname.split('/');
    this.current = Number(urlParts[urlParts.length - 1]); // A legutolsó részből szerezzük meg az indexet

    let list = this.localstorage.getItem('beers');
    if (list) {
      try {
        let parsedList = JSON.parse(list);
        if (Array.isArray(parsedList) && this.current < parsedList.length) {
          this.formService.beer = parsedList[this.current];
        }
      } catch (error) {
        console.error('Error loading beers from localStorage:', error);
      }
    }
  }

  changeFavorite() {
    // A formService-ben található toggleFavorite metódus hívása
    this.formService.toggleFavorite(this.current, this.formService.beer);
  }

  setRating(attribute: string, index: number, event: MouseEvent) {
    // A formService-ben található setRating metódus hívása
    this.formService.setRating(attribute, index, event);
  }

  previewRating(event: MouseEvent, index: number, attribute: string) {
    // A formService-ben található previewRating metódus hívása
    this.formService.previewRating(event, index, attribute);
  }

  resetHover(attribute: string) {
    // A formService-ben található resetHover metódus hívása
    this.formService.resetHover(attribute);
  }

  getImagePath(attribute: string, type: string): string {
    // A formService-ben található getImagePath metódus hívása
    return this.formService.getImagePath(attribute, type);
  }

  submit() {
    const formData = {
      isFavorite: this.formService.beer.isFavorite,
      beerName: this.formService.beer.beerName,
      description: this.formService.beer.description,
      selectedBeer: this.formService.beer.selectedBeer,
      ratings: this.formService.beer.ratings,
      imageData: this.formService.beer.imageData,
    };
    this.formService.saveToLocalStorage(this.current, formData);
  }

  delete() {
    if (this.formService.beer) {
      this.formService.deleteBeer(this.current);
      this.router.navigate(['/']);
    } else {
      console.log('No beer to delete');
    }
  }

  modify(type: string) {
    if (type === 'desc') {
      this.isModifyDesc = !this.isModifyDesc; // Toggle description edit mode
    } else if (type === 'img') {
      this.isModifyImg = !this.isModifyImg; // Toggle image edit mode
    }
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.formService.beer.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  deleteImage() {
    this.formService.beer.imageData = ''; // Törli a képet
  }
}
