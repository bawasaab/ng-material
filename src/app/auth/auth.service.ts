import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';
import { AuthData } from './auth.data.model';

import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  collection,
  doc,
  docData,
  DocumentReference,
  CollectionReference,
  Firestore,
  onSnapshot,
  query,
  where,
  Unsubscribe,
  Query,
  DocumentData,
  collectionData,
  collectionChanges,
  docSnapshots,
  addDoc, deleteDoc, updateDoc
} from '@angular/fire/firestore';

import {
  Auth,
  signOut,
  signInWithPopup,
  user,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  getAdditionalUserInfo,
  OAuthProvider,
  linkWithPopup,
  unlink,
  updateEmail,
  updatePassword,
  User as fuser,
  reauthenticateWithPopup,
  authState,
  onAuthStateChanged
} from '@angular/fire/auth';

import {
  Storage,
  ref,
  deleteObject,
  uploadBytes,
  uploadString,
  uploadBytesResumable,
  percentage,
  getDownloadURL
} from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authChange$ = new Subject<boolean>();
  private user!: User | null;
  private fUser$!: Observable<fuser | null>;
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private afAuth: Auth,
    private storage: Storage,
    private firestore: Firestore
  ) {

    // user observable, not user doc
    // this.user$ = user(auth);

    // or use this version...
    this.fUser$ = authState(afAuth);
    
    // this.user$ = new Observable((observer: any) =>
    //   onAuthStateChanged(auth, observer)
    // );
  }

  /**
   * App User Starts
   */
  registerUser( authData: AuthData ) {

    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };

    this.emailSignUp( authData.email, authData.password );

  }

  async login( authData: AuthData ) {
    
    let result = await this.emailLogin( authData.email, authData.password );
    this.user = {
      email: result.user.email,
      userId: result.user.uid
    };
    this.authSuccessfully();
  }

  logout() {

    this.afAuth.signOut();
    this.isAuthenticated = false;
    this.user = null;
    this.authChange$.next(false);
    this.router.navigate([`/login`]);
  }

  isAuth() {

    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange$.next(true);
    this.router.navigate([`/training`]);
  }

  /**
   * App User Ends
   */

   async getFUser(): Promise<any> {
    return await this.fUser$.pipe(take(1)).toPromise();
  }

  async emailLogin(email: string, password: string) : Promise<any> {

    let result = await signInWithEmailAndPassword(this.afAuth, email, password);
    return result;
  }

  async emailSignUp(email: string, password: string)
  // : Promise<void> 
  {

    try {

      const credential = await createUserWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
  
      await updateProfile(
        credential.user, { displayName: credential.user.displayName }
      );
      await sendEmailVerification(credential.user);
  
      // create user in db
      const notesRef = collection(this.firestore, `users`);
      let in_user = {
        email: credential.user.email,
        emailVerified: credential.user.emailVerified,
        isAnonymous: credential.user.isAnonymous,
        // metadata: credential.user.metadata,
        phoneNumber: credential.user.phoneNumber,
        photoURL: credential.user.photoURL,
        providerData: credential.user.providerData,
        providerId: credential.user.providerId,
        tenantId: credential.user.tenantId,
        uid: credential.user.uid,
      };
      this.authSuccessfully();

      return addDoc( notesRef, in_user);
    } catch( ex ) {

      throw ex;
    }
  }

  async resetPassword(email: string): Promise<any> {

    // sends reset password email
    await sendPasswordResetEmail(this.afAuth, email);
  }  
  
  async oAuthLogin(p: string): Promise<void> {

    // get provider, sign in
    const provider = new OAuthProvider(p);
    const credential = await signInWithPopup(this.afAuth, provider);
    const additionalInfo = getAdditionalUserInfo(credential);
  
    // create user in db
    if (additionalInfo?.isNewUser) {
    }
  }  

  async upload( folder: string, name: string, file: File | null ): Promise<string> {

    let url = '';
  
    const ext = file!.name.split('.').pop();
    const path = `${folder}/${name}.${ext}`; {
  
      if (file) {
        try {
          const storageRef = ref(this.storage, path);
          const task = uploadBytesResumable(storageRef, file);
          // this.uploadPercent = percentage(task);
          await task;
          url = await getDownloadURL(storageRef);
        } catch(e: any) {
          console.error(e);
        }   
      } else {
        // handle invalid file
      }
      return url;
    }
  }
}
