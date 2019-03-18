import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategoryKeys() {
    return this.db.list('/categories', ref => ref.orderByChild('name'))
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({
          key: a.key,
          name: a.payload.val()
        }))
        )
    );
  }

  getAllCategories() {
    return this.db.list('/categories').snapshotChanges();
  }

}
