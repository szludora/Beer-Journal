import { Component, OnInit } from '@angular/core';
import { FormService } from '../../form.service';
import beerOptions from './beerOptions.json';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  constructor(private beerService: FormService) {}

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
    this.beerService.handleFileSelected(event, -1, this.beerService.beer);
  }

  deleteImage() {
    this.beerService.deleteImage(-1, this.beerService.beer);
  }

  starRating = { value: 0, hover: 0 };
  isFavorite = false;
  selectedBeer: string = '';

  selectBeer(index: number) {
    this.selectedBeer = this.beerTypes[index].name;
  }

  setRating(attribute: string, index: number, event: MouseEvent) {
    this.beerService.setRating(attribute, index, event);
  }

  previewRating(event: MouseEvent, index: number, attribute: string) {
    this.beerService.previewRating(event, index, attribute);
  }

  resetHover(attribute: string) {
    this.beerService.resetHover(attribute);
  }

  getImagePath(attribute: string, type: string): string {
    return this.beerService.getImagePath(attribute, type);
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
    this.beerService.saveToLocalStorage(-1, formData);
  }
}
