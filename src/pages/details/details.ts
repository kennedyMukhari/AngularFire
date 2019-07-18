import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  outpt = [];
  info : Observable<any[]>
   persons : AngularFireList<any>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdb: AngularFireDatabase) {
    this.persons = fdb.list('/hotel/');
    this.info = this.persons.valueChanges();
    this.outpt.push(this.info);
    console.log('Nothing to display',this.outpt);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
