import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from '@angular/fire/auth';
import { DetailsPage } from '../details/details';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild("email") email;
  @ViewChild("password") password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private firebaseAuth: AngularFireAuth, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  registerModal() {
    let goTo =this.modalCtrl.create(RegisterPage);
    goTo.present();
  }

  userLogin() {
    this.firebaseAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data =>{
      console.log('User signed in successful', this.firebaseAuth.auth.currentUser);
      let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: 'User logged in!',
        buttons: ['OK']
      });
      alert.present();
      // this.navCtrl.push(DetailsPage);
    })
    ,error => {
      console.log("Error signing in", error);
    };
  }

  cancel() {
    this.navCtrl.push(HomePage);
  }
  goToSignUp() {
    this.navCtrl.push(RegisterPage);
  }
}
