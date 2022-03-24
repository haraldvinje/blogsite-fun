# Blogsite Fun

Experimenting with NextJS. Based on the [Fireship course on NextJS](https://fireship.io/courses/react-next-firebase/), with some slight changes.

## Development

This site uses Firebase as a backend, specifically Firebase Authentication, Firestore and Storage.

To set it up, create a Firebase project and enable Firebase Authentication, Firestore and Storage. Create a `.env.local` file and set the following values:

```
NEXT_PUBLIC_API_KEY=sampleKey
NEXT_PUBLIC_AUTH_DOMAIN=sampleDomain
NEXT_PUBLIC_PROJECT_ID=sampleProject
NEXT_PUBLIC_STORAGE_BUCKET=sampleBucket
NEXT_PUBLIC_MESSAGING_SENDERID=sampleId
NEXT_PUBLIC_APP_ID=sampleAppId
NEXT_PUBLIC_MEASUREMENT_ID=sampleMeasureId
```

Run **`yarn`** to install dependencies and **`yarn dev`** to start the development server.

### Firebase emulators

Firebase emulators allow you to emulate Firebase services locally. Install the [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli) and run **`firebase emulators:start`** to start the emulators.