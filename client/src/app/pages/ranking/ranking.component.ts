import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Charge les utilisateurs et les trie par `rank` décroissant
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data.sort((a, b) => b.rank - a.rank); // Tri par `rank` décroissant
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
      },
      complete: () => {
        console.log('Chargement des utilisateurs terminé');
      }
    });
  }
}
