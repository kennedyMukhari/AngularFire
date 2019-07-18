import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { DetailsPage } from '../details/details';



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('email') email;
  @ViewChild('password') password;

  peopleList: AngularFireList<any>

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl: ViewController,private firebaseAuth:AngularFireAuth, public alertCtrl: AlertController, public fdb:AngularFireDatabase ) {
    this.peopleList = fdb.list('/hotel/')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
  userRegister() {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      console.log("User registered succcessfully", data)
      let alert = this.alertCtrl.create({
        title: 'New User!',
        subTitle: 'Your registration is successfull!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push(LoginPage);
    })
    .catch(error => {
      console.log("Did not register user",error)
    })
    console.log(this.email.value);
  }
  createPerson (name, lname, cell) {
    this.peopleList.push({
      name :name,
      lname :lname,
      cell : cell
    }).then(newPerson =>{
      this.navCtrl.push(DetailsPage)
    })
    .catch(error =>{
      console.log("Did not push", error)
    });
  }
  goToSignIn() {

  }
}
