import { initializeApp, getApp, FirebaseApp, FirebaseOptions } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
}

function createFirebaseApp(config: FirebaseOptions): FirebaseApp {
    try {
        return getApp()
    } catch {
        return initializeApp(config)
    }
}

export const firebaseApp = createFirebaseApp(firebaseConfig)
export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

const EMULATORS_STARTED = 'EMULATORS_STARTED'
function startEmulators() {
    if (!global[EMULATORS_STARTED]) {
        global[EMULATORS_STARTED] = true
        connectFirestoreEmulator(firestore, 'localhost', 8080)
        connectAuthEmulator(auth, 'http://localhost:9099')
    }
}

if (process.env.NODE_ENV === 'development') {
    startEmulators()
} else {
    const analytics = getAnalytics(firebaseApp)
}

export const storage = getStorage(firebaseApp)
export const STATE_CHANGED = 'state_changed'