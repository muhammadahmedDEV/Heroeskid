// MAIN MODULES
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";
import { push } from "connected-react-router";
import { loadStripe } from '@stripe/stripe-js';

// ACTIONS
import { createUser, addCurrentUser, setProfileType } from "../actions";
import { getError, setLoginUser } from "../routines/main";
type _t_firebaseConfig = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};
export type _t_userCreate = {
  additionalUserInfo: object;
  credential: null | object;
  operationType: string;
  user: object;
};

// Configuration For Staging App live
// const firebaseConfig: _t_firebaseConfig = {
//   apiKey: "AIzaSyASfEu0GL3zCihK6Lqhq2NdQ7DrrzebVNg",
//   authDomain: "heroes-kids-health.firebaseapp.com",
//   databaseURL: "https://heroes-kids-health.firebaseio.com",
//   projectId: "heroes-kids-health",
//   storageBucket: "heroes-kids-health.appspot.com",
//   messagingSenderId: "581457584561",
//   appId: "1:581457584561:web:248587045f86e978b0dd90",
//   measurementId: "G-6399PQYKXN",
// };

//   measurementId: "G-F8S99ZYEG7",

// Third testing app test
const firebaseConfig = {
  apiKey: "AIzaSyBqVp1iPoVFvPdQx2HmofjOCKOaRE2wEo0",
  authDomain: "heroes-testing.firebaseapp.com",
  databaseURL: "https://heroes-testing.firebaseio.com",
  projectId: "heroes-testing",
  storageBucket: "heroes-testing.appspot.com",
  messagingSenderId: "885380503915",
  appId: "1:885380503915:web:4cdebcc581bc715b43942e",
  measurementId: "G-W4YSY6WJNH",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
firebase.analytics();
const dev_URL = `https://us-central1-heroes-testing.cloudfunctions.net`
const prod_URL = `https://us-central1-heroes-kids-health.cloudfunctions.net`

export const base_URL = dev_URL;

export const logEventToAnalytics = (eventName: string, value: any): any => {
  // It takes name of event as eventName and object of parameters as value
  firebase.analytics().logEvent(eventName, value);
};
export const getUserData = (ref: any): Promise<any> => {
  return db
    .collection(ref.table)
    .where("authId", "==", ref.id)
    .get();
};

export const isStripePayment = (payload: any): Promise<any> => {
  return db
    .collection(payload.table)
    .doc(payload.id)
    .collection('subscriptions')
    .get()
}
export const get20Records = (payload: any): Promise<any> => {
  if (!payload?.cursor?.id) { // the first fetch
    return db
      .collection('users')
      .orderBy('id')
      .orderBy('first_name')
      .limit(12)
      .get()
  }
  else { // fetch after specified doc id
    return db
      .collection('users')
      .orderBy('id')
      .orderBy('first_name')
      .limit(12)
      .startAfter(payload.cursor.id)
      .get()
  }
}

export const get20RecordsOrganization = (payload: any): Promise<any> => {

  if (!payload?.cursor?.id) { // the first fetch

    return db
      .collection('organizations')
      .orderBy('name')
      .limit(12)
      .get()
  }
  else { // fetch after specified doc id

    return db
      .collection('organizations')
      .orderBy('name')
      .limit(12)
      .startAfter(payload.cursor.name)
      .get()
  }
}

export const getUserDataByID = (ref: any): Promise<any> => {
  return db
    .collection(ref.table)
    .where("id", "==", ref.id)
    .get();
};

export const getEvent = (ref: any): Promise<any> => {
  return db
    .collection(ref.collection)
    .where('createdBy', '==', ref.id)
    .get();
}
export const setCurrentUser = async (ref: any) => {
  let user: any;
  const querySnapshot = await getUserDataByID({
    table: ref.table,
    id: ref.id,
  });
  querySnapshot.forEach((doc: any) => {
    user = doc.data();
  });
  if (user) {
    ref.dispatch(addCurrentUser(user));
  }
};

export const getCity = (ref: any): Promise<any> => {
  return db
    .collection(ref.table)
    .where("name", "==", ref.name)
    .get();
};

export const getMailListItem = (ref: any): Promise<any> => {
  return db
    .collection(ref.table)
    .where("email", "==", ref.email)
    .get();
};
export const googleAuth = (dispatch: any, flag: string): any => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");

  // check if user exists in users or organizations profile for this email
  // if user exists in any, redirect it to that profile
  // else create user for requested flag type

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          let loginUser: any;
          let loginOrg: any;

          await getUserData({
            table: 'users',
            id: user.uid,
          }).then(querySnapshot => {
            querySnapshot.forEach((doc: any) => {
              const newDoc: any = doc.data();
              loginUser = newDoc;
            });
          })

          await getUserData({
            table: 'organizations',
            id: user.uid,
          }).then(querySnapshot => {
            querySnapshot.forEach((doc: any) => {
              const newDoc: any = doc.data();
              loginOrg = newDoc;
            });
          })

          if (loginUser?.id) {
            dispatch(setProfileType('users'));
            dispatch(setLoginUser(loginUser));
            push(`/user/${loginUser.id}`);
          } else if (loginOrg?.id) {
            dispatch(setProfileType('organizations'));
            dispatch(setLoginUser(loginOrg));
            push(`/org/${loginOrg.id}`);
          } else {
            dispatch(createUser({ ...res, flag })); // redirect to relevant page to create profile
          }
        }
      });
    });
};
export const facebookAuth = (dispatch: any, flag: string): any => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res): void => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          let loginUser: any;
          let loginOrg: any;
          await getUserData({
            table: 'users',
            id: user.uid,
          }).then(querySnapshot => {
            querySnapshot.forEach((doc: any) => {
              const newDoc: any = doc.data();
              loginUser = newDoc;
            });
          })

          await getUserData({
            table: 'organizations',
            id: user.uid,
          }).then(querySnapshot => {
            querySnapshot.forEach((doc: any) => {
              const newDoc: any = doc.data();
              loginOrg = newDoc;
            });
          })


          if (loginUser?.id) {
            dispatch(setProfileType('users'));
            dispatch(setLoginUser(loginUser));
            push(`/user/${loginUser.id}`);
          } else if (loginOrg?.id) {
            dispatch(setProfileType('organizations'));
            dispatch(setLoginUser(loginOrg));
            push(`/org/${loginOrg.id}`);
          } else {
            dispatch(createUser({ ...res, flag }))
          }
        }
      });
    })
    .catch((error) => {
      dispatch(getError(error));
    });
};

export const createUserWithEmailAndPassword = (
  email: string,
  password: string,
  dispatch: any,
  flag: string
): void => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res): void => {
      dispatch(createUser({ ...res, flag }));
    })
    .catch((error: any): void => {
      dispatch(getError(error));
    });
};

export const signInWithEmailAndPassword = (
  email: string,
  password: string
): Promise<any> => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logOut = (): Promise<any> => {
  return firebase.auth().signOut();
};

export const resetPassword = (emailAddress: string): Promise<any> => {
  return firebase.auth().sendPasswordResetEmail(emailAddress);
};

// CRUD FOR FIREBASE
// GET DATA
export const getFbData = (ref: string): Promise<any> => {
  return db.collection(ref).get();
};

export const updateUserData = (ref: string, id: string): Promise<any> => {
  return db
    .collection(ref)
    .doc(id)
    .update("id", id);
};
export const updateFiltersData = (ref: string, data: any): Promise<any> => {
  return db.collection(ref).add(data);
};

export const updateCityData = (
  ref: string,
  id: any,
  data: any
): Promise<any> => {
  return db
    .collection(ref)
    .doc(id)
    .update(data);
};

// Stripe functions

export const getSubscriptionPlans = async () => {
  return await db.collection('subscription-plans')
    .where('active', '==', true)
    .get();
}
export const createCheckoutSession = async (uid: string, priceId: string) => {
  const docRef = await db
    .collection('org-pro-customer')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_1HqEBnIKumCkOv7ZL8rDwkmO', // org monthly price test
      // price: priceId, // org price live
      // price: 'price_1HpFAdIKumCkOv7ZELjoZ9W3', // org monthly price live
      allow_promotion_codes: true,
      // success_url: `https://heroes-testing.web.app/join-our-organizations`,
      // cancel_url: `https://heroes-testing.web.app/login`,
      success_url: `http://localhost:3000/join-our-organizations`,
      cancel_url: `http://localhost:3000/login`,
      // success_url: `https://www.ehkidshealth.com/join-our-organizations`,
      // cancel_url: `https://www.ehkidshealth.com/login`,
    });
  // Wait for the CheckoutSession to get attached by the extension
  docRef.onSnapshot(async (snap) => {
    const { error, sessionId } = snap.data();
    if (error) {
      // Show an error to your customer and
      // inspect your Cloud Function logs in the Firebase console.
      alert(`An error occured: ${error.message}`);
    }
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      const stripe = await loadStripe('pk_test_51Gwo9IIKumCkOv7ZpjrvhsQKdCGmzeKWgL9DFvI0BcxJdPQFBl7QT9xkqpqnd7S21sCnyejpmDdzMYBvDCm5DDKp00QoNQvjFi');
      // const stripe = await loadStripe('pk_live_51Gwo9IIKumCkOv7ZIwYI3LeBFkFR4lDU0lyTz836wYj91X3p3BxW0v0tEZ3GVJkxXsSVy6mSY2Uur9KGW9fKwVQg009ScxPb2q');
      stripe.redirectToCheckout({ sessionId });
    }
  });
}
export const uploadImage = async (
  base64Image: string,
  reference: string
): Promise<any> => {
  // Upload Avatar to cloud storage
  return new Promise((resolve, reject) => {
    const uploadTask = firebase
      .storage()
      .ref()
      .child(reference)
      .putString(base64Image, "data_url");
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, null, null, () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then(resolve)
        .catch(reject);
    });
  });
};
export const handleAvatarImage = async (data: any, name: string, ref: string, authId: string) => {
  const block = data.split(";");
  const contentType = block[0].split(":")[1];
  if (
    contentType === "image/jpeg" ||
    contentType === "image/jpg" ||
    contentType === "image/png"
  ) {
    if (ref.includes('organizations')) {
      // put pictures in separate folders for org and professionals
      data = name === "avatar"
        ? await uploadImage(data, `organizations/${authId}/profile`)
        : await uploadImage(data, `organizations/${authId}/contact_profile`);
    } else {
      data = await uploadImage(data, `professionals/${authId}/profile`)
    }
  } else {
    return data;
  }
};

export const handleOfficeImages = async (data: any, ref: string) => {
  const officePicturesURL: string[] =
    data?.pictures?.map(async (pic: string, index: number) => {
      const block = pic && pic.split(";");
      const contentType = block && block[0].split(":")[1];
      if (
        contentType === "image/jpeg" ||
        contentType === "image/jpg" ||
        contentType === "image/png"
      ) {
        if (ref.includes('organizations')) {
          // put pictures in separate folders for org and professionals
          return await uploadImage(pic, `organizations/${data.authId}/office${index}`);
        } else {
          return await uploadImage(pic, `professionals/${data.authId}/office${index}`);
        }
      } else {
        return pic;
      }
    });
  // Update Image Firebase Storage URL in pictures
  officePicturesURL.forEach(async (image) => {
    if (image !== undefined) {
      const URLs = await Promise.all(officePicturesURL);
      URLs.forEach((url: string, index: number) => {
        data.pictures[index] = url;
      });
    } else {
      return;
    }
  });
};

export const writeUserData = async (ref: string, data: any): Promise<any> => {
  await handleAvatarImage(data.avatar, "avatar", ref, data.authId);
  if (data.contact_avatar) {
    await handleAvatarImage(data.contact_avatar, "contact_avatar", ref, data.authId)
  }
  await handleOfficeImages(data, ref);
  return db.collection(ref).add(data);
};

export const updateCompleteUserData = async (
  ref: string,
  id: string,
  value: any
): Promise<any> => {
  await handleAvatarImage(value.avatar, "avatar", ref, value.authId);
  if (value.contact_avatar) {
    await handleAvatarImage(value.contact_avatar, "contact_avatar", ref, value.authId);
  }
  await handleOfficeImages(value, ref);
  return db
    .collection(ref)
    .doc(id)
    .update(value);
};

export default firebase;
