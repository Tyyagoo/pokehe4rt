import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { Trainer } from '../../models/entity';
import { TrainerCreatePayload } from '../../models/http';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  constructor(private http: HttpService) {}

  fetchTrainers() {
    return this.http.get<Trainer[]>('trainers');
  }

  fetchTrainerById(id: number) {
    return this.http.get<Trainer>(`trainers/${id}`);
  }

  createTrainer(data: TrainerCreatePayload) {
    return this.http.post<Trainer>('trainers', data);
  }

  deleteTrainer(id: number) {
    return this.http.delete(`trainers/${id}`);
  }
}
