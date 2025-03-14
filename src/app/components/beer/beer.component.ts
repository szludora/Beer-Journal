import { Component, OnInit } from '@angular/core';
import { FormService } from '../../form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss'],
})
export class BeerComponent implements OnInit {
  constructor(private formService: FormService, private router: Router) {}

  current: number = 0;

  ngOnInit(): void {
    this.current = Number(window.location.pathname.split('/')[2]);

    let list = localStorage.getItem('beers');
    if (list) {
      try {
        let parsedList = JSON.parse(list);
        if (Array.isArray(parsedList) && this.current < parsedList.length) {
          this.formService.beer = parsedList[this.current];
        }
      } catch (error) {}
    }
  }

  changeFavorite() {
    this.formService.toggleFavorite(this.current, this.formService.beer);
  }

  setRating(attribute: string, index: number, event: MouseEvent) {
    this.formService.setRating(attribute, index, event);
  }

  previewRating(event: MouseEvent, index: number, attribute: string) {
    this.formService.previewRating(event, index, attribute);
  }

  resetHover(attribute: string) {
    this.formService.resetHover(attribute);
  }

  getImagePath(attribute: string, type: string): string {
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
    this.formService.deleteBeer(this.current);
    this.router.navigate(['/']);
  }
}
