# Agents app

This is a simple react app that displays a list of Agents and has CRUD operations through an JSON server api, I used the material ui grid since this comes with pagination and filtering already and it's a solution that I have used in previous projects.

I've implemented a Hook that takes care of the mutation of the Agent and it works for both create and update, as well as the form that does this. I used formik because it makes so much simpler the state management of the form and combined with yup you can implement the validations of the fields seamlessly.

I've wrote a couple of tests for the hooks and my plan was to write some more for the components but I ran accross a nasty bug with babel and ran out of time.

Thank you for the opportunity and I hope that you like this enough for you to decide to work together.

## Installation

Use the package manager [yarn](https://yarnpkg.com/) to install all the dependencies.

```bash
yarn install
```

## How to run the app

First we need to run the api server, this is a simple JSON server

```bash
yarn run db
```

And then we run the app

```bash
yarn run dev
```

## Pictures and video for showcase

![Admin list](<src/assets/Captura de pantalla 2025-01-28 133733.png>)
![Updating Agent](<src/assets/Captura de pantalla 2025-01-28 133747.png>)
![Creating Agent](<src/assets/Captura de pantalla 2025-01-28 133758.png>)
![Filtering the list](<src/assets/Captura de pantalla 2025-01-28 133819.png>)
![Agent details page](<src/assets/Captura de pantalla 2025-01-28 133840.png>)
<video controls src="src/assets/showcase.mp4" title="Agents app showcase"></video>
