# ⚡️ Boilerplate: Frontend with React + GraphQL + Apollo

This project is an easy and fast way to start new projects in JavaScript. 
The main goal is to provide two repositories: one for the backend and one for the frontend application. 

This repository is for the frontend and is designed to work with another boilerplate: [the backend](https://github.com/didaquis/boilerplate-backend-node-graphql-mongodb)

If you prefer it, you can use one of these boilerplates without using the other! Feel free to explore any ideas like developing your own backend in PHP or your frontend in Angular, for example.


### 🎁 What is included on the frontend boilerplate?
Technologies used are: React + GraphQL + Apollo Client + Bootstrap 4

**✨ These are some of the highlights:** 

✅ A frontend application ready to use!  
✅ Users can login and registrate  
✅ Separated routes for users with the role of the 'administrator'  
✅ Ready to connect with backend  
✅ If you don't like Bootstrap, it's easy to implement any other one UI library or use your own CSS  

### 📝 Frontend Requirements
* Backend must be running. I recommend use my [backend boilerplate](https://github.com/didaquis/boilerplate-backend-node-graphql-mongodb)
* Node.js 18.15 or higher

### 📚 How to run the application?
* Use the command: `npm install`.
* Configure the application:
  * Duplicate the configuration file `_env` and rename it as `.env`
  * Edit the file `.env`
* Then use: `npm run start`. 

### 🚀 How to deploy?
* Use the command: `npm install --production`.
* Make sure you have the correct environment vars configuration on the `.env` file.
* Then use `npm run build` to create a production bundle. This bundle will be created in the `./build` folder.
* The content of `./build` folder is ready to be deployed to production.

**Do you need help with `.env` file?** 

Don't worry, here you have a guide:

| Key | Description |
|-----|-------------|
| REACT_APP_PROTOCOL | Protocol to communicate with backend. Set http or https |
| REACT_APP_HOST | Host of backend. An IP or domain |
| REACT_APP_PORT | Port of backend |
| REACT_APP_GRAPHQL | Endpoint of GraphQL API |

### 💻 Tricks for development
* Run app in dev mode: `npm run start`
* Run the linter: `npm run lint`

### Would you like to contribute to this project?
It would be great to receive your help. ♥️ 

You can collaborate in multiple ways, of course. Let me give you some ideas:
* Help me with this documentation. If you think something it's not clear, open an issue and talk to me!
* Share this project, mark it as a favorite (⭐️) or make some suggestions
* Help me to improve the implementation of React. I'm not an expert!
