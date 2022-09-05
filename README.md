# Blogsite Fun

Experimenting with NextJS.

## Development

This site uses Firebase as a backend, specifically Firebase Authentication, Firestore and Storage.

To set it up, create a Firebase project and enable Firebase Authentication, Firestore and Storage. Create a `.env.local` file and set the following values:

```env
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

Firebase emulators allow you to emulate Firebase services locally. **`yarn dev`** will automatically start firebase emulators and export any submitted data in the web app to a directory called `emulatordata`.
