# Js13k2020

A Web VR game for js13kgames 2020

### Requirements
- Node.js installed (v12.18 or greater)

### Setup
Run `npm install` on a terminal

### Development
Run `npm start` to start a development server on `localhost:8080` and listen to code changes.

### Production
Use `npm run build` to create minified files and zip them. The result will be available at the `build` directory. 

## Project structure

- `src` - The game source code. Needs to be processed with webpack using the commands above (because of conflicts between AFRAME and ES6 modules).

- `POCs` - Proofs of concept, each folder contain an independent piece of code that targets a specific problem. These files are not included in the final build. POCs work out of the box, no need to run commands.