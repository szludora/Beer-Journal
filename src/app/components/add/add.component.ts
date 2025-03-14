import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import beerOptions from './beerOptions.json';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class AddComponent implements OnInit {
  constructor(public formService: FormService) {}

  starRating = { value: 0, hover: 0 };
  isFavorite = false;
  selectedBeer: string = '';
  isFormInvalid = false;
  isRatingInvalid = false;

  ngOnInit(): void {
    this.formService.resetBeer();

    this.beerTypes = beerOptions.beerTypes;
    this.ratings = beerOptions.ratings;
  }
  beerTypes: any = [];
  ratings: { attribute: string; value: number; hover: number }[] = [];
  beerName = '';
  description = '';
  imageData: string | null = null;

  onFileSelected(event: Event) {
    this.formService.handleFileSelected(event, -1, this.formService.beer);
  }

  deleteImage() {
    this.formService.deleteImage(-1, this.formService.beer);
  }

  selectBeer(index: number) {
    const selectedBeer = this.beerTypes[index];
    this.formService.beer.selectedBeer = selectedBeer.name;
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
    this.isFormInvalid =
      !this.formService.beer.beerName || !this.formService.beer.selectedBeer;
    this.isRatingInvalid = !this.formService.beer.ratings.every(
      (rating) => rating.value > 0
    );

    if (this.isFormInvalid || this.isRatingInvalid) {
      return;
    }

    const formData = {
      isFavorite: this.formService.beer.isFavorite,
      beerName: this.formService.beer.beerName,
      description: this.formService.beer.description,
      selectedBeer: this.formService.beer.selectedBeer,
      ratings: this.formService.beer.ratings,
      imageData: this.formService.beer.imageData,
    };

    this.formService.saveToLocalStorage(-1, formData);
  }
}
