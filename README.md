# Nuuly News

## Overview

Displays the top articles from New York Times. Home page displays the most trending articles and you can view top stories by category.

## Run Locally

- Requirements:
  - **Node** _version_ 12.18+
  - Create **.env** file in root directory and paste api key that I provided in email
  - Create **cypress.env.json** file in root directory and paste variable I provided in email

```
npm install
npm start
```

- Open up [http://localhost:3000/](http://localhost:3000/) in your preferred browser.

## To Test Locally

- (If not previously run)

```
npm install
```

- Then, for Cypress Open

```
npm run test:e2e
```

## Features

- Displays Material UI Cards for each NY Times article
- Card links open new tab to specific NY Times article
- Displays articles by category based on sidebar navigation
- Home page displays trending articles
- Implemented end to end UI testing with Cypress

## Stretch Features

####

- Add a title section that changes depending on category clicked for improved UX
- Implement react-window for improved performance
- Improved styling to differentiate home page from other pages
- Add a search bar for searching articles by title, subtopic, or author
