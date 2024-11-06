import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService, Item } from '../../services/items.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule], // Ajout de CommonModule pour utiliser *ngFor et *ngIf
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  // Charge les items
  loadItems(): void {
    this.itemService.getItems().subscribe({
      next: (data: Item[]) => {
        this.items = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des items', error);
      }
    });
  }
}
