# ⚡️ Boilerplate: Frontend with React + GraphQL + Apollo

This project is an easy and fast way to start new projects in JavaScript. 
The main goal is provide two repositories: one for the backend and one for the frontend application. 

This repository is for the frontend and is made to work with another boilerplate: [the backend](https://github.com/didaquis/boilerplate-backend-node-graphql-mongodb)

If you prefer, you can use one of these boilerplates without using the other! Feel free to explore ideas like develop your own backend in PHP or your frontend in Angular, for example.


### 🎁 What it's included on the frontend boilerplate?
Technologies used are: React + GraphQL + Apollo + Bootstrap 4

**✨ These are some of the highlights:** 

✅ A frontend application ready to use!  
✅ Users can login and registrate  
✅ Separated routes for users with role 'administrator'  
✅ Ready to connect with backend  
✅ If you don't like Bootstrap, it's easy to implement any other one UI library or use your own CSS  

### 📝 Frontend Requirements
* Backend must be running. I recommend use my [backend boilerplate](https://github.com/didaquis/boilerplate-backend-node-graphql-mongodb)
* Node.js 10 or higher (just for development)

### 📚 How to run the application?
* Use the command: `npm install`. If you are deploying the app in production, it's better to use this command: `npm install --production`
* Configure the application:
  * Duplicate the configuration file `_env` and rename as `.env`
  * Edit the file `.env`
* Then use: `npm run start`. 

**❗️You need help with `.env` file?** 

Do not worry, here you have a guide:

| Key | Description |
|-----|-------------|
| REACT_APP_PROTOCOL | Protocol to communicate with backend. Set http or https |
| REACT_APP_HOST | Host of backend. An IP or domain |
| REACT_APP_PORT | Port of backend |
| REACT_APP_GRAPHQL | Endpoint of GraphQL API |

### 💻 Tricks for development
* Run app in dev mode: `npm run start`
* Run the linter: `npm run lint`
* Builds the app for production to the `build` folder: `npm run build`

### Would you like to contribute to this project?
It would be great to receive your help. ♥️ 

You can collaborate in multiple ways, of course. I recommend you check the **Roadmap** section of this documentation, but let me give you some ideas:
* Help me with this documentation. If you think something it's not clear, open an issue and talk to me!
* Share this project, mark it as a favorite (⭐️) or make some suggestions
* Help me to improve the implementation of React or Apollo Client. I'm not an expert!

### Roadmap
Some ideas that I would like to implement:
* Add test!
