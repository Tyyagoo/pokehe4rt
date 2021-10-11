import { Component, OnInit } from '@angular/core';
import { Pokemon } from './models/entity';
import { PokemonsService } from './services/pokemons/pokemons.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit {
  pokes: Pokemon[] = [];
  constructor(private pokeService: PokemonsService) {}

  ngOnInit(): void {
    console.log('On init');
    this.pokeService.fetchPokemons().subscribe((res) => {
      console.log(res);
      this.pokes = res.data;
    });
  }
}
