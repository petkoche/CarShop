import { Offer } from './../shared/models/Offer';
import { Observable } from 'rxjs/Observable';
import { Mechanic } from './../shared/models/Mechanic';
import { CarService } from './../shared/models/CarService';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/models/User';

@Injectable()
export class CarServiceService {

  uid: string;

  carServices: FirebaseListObservable<any[]>;

  myMechanics: FirebaseListObservable<any>;

  myOffers: FirebaseListObservable<any>;

  myClients: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase, private AuthService: AuthService) {
    this.uid = this.AuthService.currentUser().uid;
    this.myMechanics = this.db.list('/users/' + this.uid + '/myMechanics');
    this.myOffers = this.db.list('/users/' + this.uid + '/myOffers');
    this.myClients = this.db.list('/users/' + this.uid + '/myClients');
    this.carServices = db.list('/users', {
      query: {
        orderByChild: 'role',
        equalTo: 'service'
      }
    });
  }

  getMechanics(id: string): FirebaseListObservable<Mechanic[]> {
    // this.myMechanics = this.db.list('/users/' + id + '/myMechanics');
    return this.myMechanics;
  }

  getOffers(id: string): FirebaseListObservable<Offer[]> {
    return this.myOffers;
  }

  getClients(id: string): FirebaseListObservable<User[]> {
    return this.myClients;
  }

  getOffer(serviceId: string, offerId: string) {
    return this.db.object('/users/' + serviceId + '/myOffers/' + offerId);
  }

  getMyTopMechanics(): Observable<any[]> {
    return this.myMechanics
      .map((mechanics) => mechanics.sort((a, b) => a.rating - b.rating))
      .map((mechanics) => mechanics.splice(0, 3));
  }

  getService(id: string) {
    return  this.db.list('/users', {
      query: {
        orderByChild: 'id',
        equalTo: id,
      }
    });
  }

  updateVoters(id: string, voter: any) {
    this.db.list('/users/' + id + '/voters').set(voter.id, voter.value);
  }

  updateRating(id: string, rating: number) {
    this.db.list('/users/' + id).set('rating', rating);
  }

  updateCarService(carService: CarService) {
    this.db.object('/users/' + carService.id + '/name').set(carService.name);
    this.db.object('/users/' + carService.id + '/owner').set(carService.owner);
    this.db.object('/users/' + carService.id + '/address').set(carService.address);
    this.db.object('/users/' + carService.id + '/activities').set(carService.activities);
  }

  addMechanic(serviceId: string, mechanicId: string, mechanic: any) {
    console.log(mechanic);
    return this.db.list('/users/' + serviceId + '/myMechanics').set(mechanicId, mechanic);
  }

  addOffer(serviceId: string, offer: Offer) {
    return this.db.list('/users/' + serviceId + '/myOffers').push(offer);
  }

  sendOffer(id: string, offer: any) {
    this.db.list('/users/' + id + '/offers').push(offer);
  }
}
