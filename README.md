## About

This is the repository for uCredit, 4-year course planning, streamlined.
Deployment: https://ucredit.me

- If the site doesn't immediately show, please give the frontend server a few seconds to load.
- If user and plan data doesn't show, give it a second longer for the backend server to start up.

## Structure

```
.
├── lib
│   ├── appStore
│   ├── components
│   │   ├── dashboard
│   │   │   ├── course-list
│   │   │   │   ├── horizontal
│   │   │   │   └── vertical
│   │   │   └── degree-info
│   │   ├── landing-page
│   │   ├── login
│   │   └── popups
│   │       └── course-search
│   │           ├── cart
│   │           ├── prereqs
│   │           ├── query-components
│   │           └── search-results
│   ├── resources
│   │   └── redux_sample
│   └── slices
├── pages
│   └── login
└── public
    ├── img
    │   ├── landing-page
    │   └── line-art
    └── svg
```

All folders and files in the `pages` folder correspond to client paths you access. E.g., `/pages/index.tsx` corresponds to `/` in the browser. For any other (utility) components, put them under the `lib` folder. Basically, `src` is now `lib`.

Any static assets placed in the `public` folder can be accessed directly as follows, `/img/bg.png` instead of `/public/img/bg.png`.

## Getting Started

1. `npm i`
2. `npm start` to run a local server on "localhost:3000" with nodemon listening for changes
3. `npm build` -> `npm start:prod` to run an unlistened production-build server.
4. The development branch has the newest development code. Master may not have the most updated code.
5. All components asset files, redux files, etc. can be found in `lib`
