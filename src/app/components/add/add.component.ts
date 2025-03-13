import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  beerTypes = [
    {
      name: 'Wheat',
      image: '/assets/beerTypes/wheat.png',
      desc: 'A light, refreshing beer with a slightly fruity taste.',
    },
    {
      name: 'Pilsner',
      image: '/assets/beerTypes/pilsner.png',
      desc: 'A crisp, clean lager with a balanced bitterness.',
    },
    {
      name: 'Pale Ale',
      image: '/assets/beerTypes/pale_ale.png',
      desc: 'A hop-forward beer with a slightly bitter finish.',
    },
    {
      name: 'Lager',
      image: '/assets/beerTypes/lager.png',
      desc: 'A smooth and mild lager with subtle malt sweetness.',
    },
    {
      name: 'IPA',
      image: '/assets/beerTypes/ipa.png',
      desc: 'A hoppy, aromatic beer with a punch of bitterness.',
    },
    {
      name: 'Brown Ale',
      image: '/assets/beerTypes/brown_ale.png',
      desc: 'A rich, malty beer with caramel and nutty flavors.',
    },
    {
      name: 'Bock',
      image: '/assets/beerTypes/bock.png',
      desc: 'A strong, malty beer with a sweet, toasty flavor.',
    },
    {
      name: 'Stout',
      image: '/assets/beerTypes/stout.png',
      desc: 'A dark, rich beer with flavors of coffee and chocolate.',
    },
    {
      name: 'Porter',
      image: '/assets/beerTypes/porter.png',
      desc: 'A dark ale with rich, roasted malt flavors.',
    },
  ];

  ratings = [
    { attribute: 'strength', value: 0, hover: 0 },
    { attribute: 'fruitiness', value: 0, hover: 0 },
    { attribute: 'price', value: 0, hover: 0 },
    { attribute: 'aftertaste', value: 0, hover: 0 },
    { attribute: 'star', value: 0, hover: 0 },
  ];

  starRating = {value: 0, hover: 0}

  isChecked = false;

  selectedBeer: string = '';

  selectBeer(index: number) {
    this.selectedBeer = this.beerTypes[index].name;
  }

  setRating(attribute: string, index: number, event: MouseEvent) {
    const rating = this.ratings.find(r => r.attribute === attribute);
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
    const rating = this.ratings.find(r => r.attribute === attribute);
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
    const rating = this.ratings.find(r => r.attribute === attribute);
    if (rating) {
      rating.hover = rating.value;
    }
  }
  

  getImagePath(attribute: string, type: string): string {    
    return `/assets/ratings/${attribute}-${type}.png`;
  }
}
