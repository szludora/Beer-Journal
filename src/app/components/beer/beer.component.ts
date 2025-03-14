import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beer',
  imports: [CommonModule, FormsModule],
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss'],
})
export class BeerComponent implements OnInit {
  constructor(
    private localstorage: LocalStorageService,
    private router: Router
  ) {}

  current: number = 0;
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

  isModifyImg = false;
  isModifyDesc = false;

  ngOnInit(): void {
    this.current = Number(window.location.pathname.split('/')[2]);

    let list = this.localstorage.getItem('beers');
    if (list) {
      try {
        let parsedList = JSON.parse(list);
        if (Array.isArray(parsedList) && this.current < parsedList.length) {
          this.beer = parsedList[this.current];
        } else {
        }
      } catch (error) {}
    } else {
    }
  }

  changeFavorite() {
    this.beer.isFavorite = !this.beer.isFavorite;
    this.localstorage.changeFavorite(this.current);
  }

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

  submit() {
    const formData = {
      isFavorite: this.beer.isFavorite,
      beerName: this.beer.beerName,
      description: this.beer.description,
      selectedBeer: this.beer.selectedBeer,
      ratings: this.beer.ratings,
      imageData: this.beer.imageData,
    };

    let list = localStorage.getItem('beers');

    if (list) {
      let beers = JSON.parse(list);
      beers[this.current].isFavorite = formData.isFavorite;
      beers[this.current].beerName = formData.beerName;
      beers[this.current].description = formData.description;
      beers[this.current].selectedBeer = formData.selectedBeer;
      beers[this.current].ratings = formData.ratings;
      beers[this.current].imageData = formData.imageData;
      localStorage.setItem('beers', JSON.stringify(beers));
    } else {
      localStorage.setItem('beers', JSON.stringify([formData]));
    }
  }

  modify(value: string) {
    switch (value) {
      case 'img':
        this.isModifyImg = !this.isModifyImg;
        break;
      case 'desc':
        if (this.isModifyDesc) {
          this.localstorage.updateBeerInLocalStorage(
            this.current,
            'description',
            this.beer.description
          );
        }
        this.isModifyDesc = !this.isModifyDesc;

        break;
      default:
        break;
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.beer.imageData = reader.result as string;
        this.localstorage.updateBeerInLocalStorage(
          this.current,
          'imageData',
          this.beer.imageData
        );
      };

      reader.readAsDataURL(file);
    }

    this.isModifyImg = false;
  }

  deleteImage() {
    localStorage.removeItem('uploadedImage');
    this.beer.imageData = '';
  }

  delete() {
    let list = localStorage.getItem('beers');

    if (list) {
      let beers = JSON.parse(list);

      this.localstorage.removeOneItem('beers', this.current);

      this.router.navigate(['/']);
    }
  }
}
