# CareCircle v3.1

A private family care coordination app using GitHub Pages and Firebase.

## What's new in v3.1

- More polished dashboard header
- Quick action buttons
- Global dashboard search across appointments, tasks, and notes
- Activity timeline
- Mobile styling improvements

## Setup

1. Replace your GitHub repository files with these files.
2. Keep Firebase Authentication > Google enabled.
3. Keep Firestore rules set to require login:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Approved emails

Open `auth.js` and add emails to `APPROVED_EMAILS` when ready. Leave empty while testing.

```js
const APPROVED_EMAILS = [
  "you@example.com",
  "mom@example.com"
];
```
