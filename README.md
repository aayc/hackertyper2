# Hacker Studio

Hacker Studio is a simple solution to looking busy at work! In a browser environment that mimics VS Code, just choose a repository from the bottom bar, start typing, and watch the code magically fill in!

## Setup

**This project will not work without credentials to our Mongo DB**. If you would like to see the project in action, please message us and we will send you credentials to access the database.

After you have received credentials, clone the repository and install dependencies:

```
$ git clone https://github.com/aayc/hackertyper2.git && cd hackertyper2
$ npm install
```

You will need to download the Netlify CLI in order to run the project:

```
$ npm i -g netlify-cli
```

Finally, you can run the project!

```
$ netlify dev
```

Navigate to http://localhost:8000 in your browser to see Hacker Studio in action.

## Demo

Click on the bottom to choose a repository:

![Choosing a repository](./public/BasePhoto.png)

![Search for a repository](./public/ChooseRepo.png)

Now type any keys you want and watch the code magically fill in!

![Code filling in](./public/CodeFillIn.png)
