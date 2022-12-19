# Blogsite Fun

Experimenting with NextJS.

## Development

This site uses Firebase as a backend, specifically Firebase Authentication, Firestore and Storage.

To develop, you'll need an `env` file, eg `.env.local`.

Create `env` file and install dependencies:

```
cp .env.example .env.local
yarn
```

Next, you must choose the backend to use for development.

### Using local backend with Firebase Emulators

The easiest and most convenient way to develop is by using [Firebase emulators](https://firebase.google.com/docs/emulator-suite).

Running

```
yarn dev
```

should set it all up for you. Visit [localhost:4000](localhost:4000) to se the emulator UI.

### Using Firebase

To use a real Firebase backend, create a Firebase project and enable Firebase Authentication, Firestore and Storage. Create a `.env.local` file and set the following values in your `env` file.

```env
NEXT_PUBLIC_API_KEY=sampleKey
NEXT_PUBLIC_AUTH_DOMAIN=sampleDomain
NEXT_PUBLIC_PROJECT_ID=sampleProject
NEXT_PUBLIC_STORAGE_BUCKET=sampleBucket
NEXT_PUBLIC_MESSAGING_SENDERID=sampleId
NEXT_PUBLIC_APP_ID=sampleAppId
NEXT_PUBLIC_MEASUREMENT_ID=sampleMeasureId
```

Run

```
yarn dev:prod-data
```

to develop using your Firebase project.
