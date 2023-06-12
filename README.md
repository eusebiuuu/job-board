# Welcome to Rejob!
> I strongly recommend you to go through the README first of all in order to get a better picture of how I approached this project, what features it consists of and more.  

Though, you want to see the project in action right away? Click [here](http://16.170.252.79).  

Want to see the API Docs? Click [here](https://documenter.getpostman.com/view/24263146/2s93sdXrCc).  

[I want to see some code.](#code-snippets)

## Table of content
- [Overview](#overview)
  - [Introduction](#introduction)
  - [Purpose](#purpose)
  - [Workflow](#workflow)
  - [Features](#features)
  - [Technologies and tools](#technologies-and-tools)
  - [Code structure](#code-structure)
  - [Technical decisions](#technical-decisions)
  - [Future functionalities](#future-functionalities)
- [Architecture and design](#architecture-and-design)
  - [Structure diagrams and wireframe](#structure-diagrams-and-wireframe)
  - [API docs](#api-docs)
- [Installation setup](#installation-and-usage-instructions)
- [Code snippets](#code-snippets)
- [Conclusion](#conclusion)
- [Licence](#licence)


## Overview
### Introduction
Welcome to one of my full-stack projects called **Rejob**. In this one, I focused on managing and optimising the process of hiring and, respectively, finding candidates.  

The entire project, including this short documentation, is structured and build only by me and without any external significant help.  


### Purpose
Among the goals that determined me to build this project are worth mentioning:
- Improving the efficiency and clarity of writing code
- Improving the critical and logical thinking
- Improving the ability to handle stressful situations that can appear throughout a project
- Learning new technologies and abilities to excel in this field
- Improving organisational skills  


### Workflow
Throughout the building phase I focused on respecting the principles of a professional workflow. Now, at the end, I realise there is still room for improvement.  

In the first steps, I created the diagrams of the app's functionality and the app's wireframe with Figma (for more information go to [architecture and design section](#architecture-and-design)).  

Next, I divided my work in 6 alternated stages (3 for back-end and 3 for front-end). Each stage had its established tasks and objectives, but, also, was updated in the moment when new ideas came to me.  

In the last steps, I did the CI/CD, the deployment, the documentation and the final testing of the app.  


### Features
The app has many functionalities, most of them depending on the type of the logged in user (unknown, company or candidate).  

An unknown user have restricted permissions, but it still can search for jobs or view the profile of other companies and candidates. Once an unknown user logs in, registers (and validates its email address) or goes through a password reset, it gets more permissions depending on the account type.  

A candidate user can search jobs, apply and unapply for jobs, find and review companies, upload profile images, change the email or password and much more.  

A company user can add jobs, find candidates that applied for a specified job, delete candidates' applications, pay for monthly or individual subscriptions, update profile and a lot more.  

If you want to discover more features visit my website by clicking [here](http://16.170.252.79).  


### Technologies and tools
This project was made with the help of various technologies and tools present on the market at that moment.
- I used Figma to build the wireframes and diagrams
- The front-end was build with ReactJS and implemented with the create-react-app tool
- The API was build with NodeJS and its framework, ExpressJS
- The database was created with the help of MongoDB, the queries being made in NoSQL
- The API structure respects the REST principles
- Postman was responsible with the initial API testing and the final API documentation
- Testing was realised with react-testing-library & jest on the front-end and supertest & jest on the back-end
- The CSS was written with CSS modules
- The CI/CD pipeline was made with GitHub Actions
- The containerisation was made with Docker
- The deployment was made through AWS EC2 service
- Sendgrid was used for emails handling
- Cloudinary managed the upload functionality
- Stripe is responsible with payments  


### Code structure
Fundamentally, both parts, front-end and back-end, were structured around roles (not features).  

Front-end functionality is located mostly in pages, components, utils and redux directories.  

Back-end functionality respects MVC pattern and is located across muliple directories: models (with MongoDB models), controllers (with actual back-end functionalities), routes (with the endpoints) and middlewares (with authentication and authorisation functionalities).  


### Technical decisions
I didn't use a CSS library (like bootstrap) on purpose, because I know writing responsive and efficient custom CSS is a very important skill for front-end developers.  

I focused on using React Redux as little as possible (and using local state management as ) as I see that global state management throughout the app is handled, in modern projects, using React Query or GraphQL, technologies I haven't learnt yet.  

I used Docker and EC2 deployment because I see it's a more professional way of deploying full-stack web apps and it offers more options in deployment configuration.  

Lastly, I didn't write many tests because I wanted to focus mainly on the functionality of the app. In the next projects I intend to write more tests and apply test-driven-development practices.  


### Future updates
In the near future, if time allows me, I plan to add more features in the website like company's ability to search for candidates, email candidates, more filters and sorting functionality.  

Besides this, I plan to improve project's design and general app performance.


## Architecture and design

### Structure diagrams and wireframe
As I said above, before starting the actual building I created some structure diagrams and a wireframe. Even if the final version of the project is slighlty different from the first place, the general idea is the same.  

The diagrams can be seen [here](https://www.figma.com/file/cNMMALbxdKtl9pBLf2WZeP/Job-board-structure?type=whiteboard&node-id=0-1&t=fEZUqXg70mwJJblR-0).  

The wireframe can be seen [here](https://www.figma.com/file/t5cWTB9QZLxa3dTZUv0D05/Job-board-wireframe?type=design&t=fEZUqXg70mwJJblR-0).  

### API Docs
Check the brief API documentation of the app [here](https://documenter.getpostman.com/view/24263146/2s93sdXrCc).  


## Installation and usage instructions

1. Firstly you need an IDE (I recommend VS Code) with a shell terminal integrated.

1. Clone this repository locally

2. Install dependencies
```sh
npm install
```

3. Create a .env file and add your credentials
- MONGO_URI=
- CRYPTO_HASH_ALGORITHM=
- CRYPTO_HASH_ENCODING=
- JWT_SECRET=
- SENDGRID_API_KEY=
- COOKIE_PARSER_SECRET=
- CLOUDINARY_NAME=
- CLOUDINARY_API_KEY=
- CLOUDINARY_API_SECRET=
- STRIPE_API_KEY=

4. Run a development version locally
```sh
npm run dev
```

5. Create a production version and run it locally
```sh
npm run build --prefix client && npm run deploy
```

## Code snippets

Among all the written code, some parts I consider more interesting and relevant. Thus, I want to show you in order to create a better picture of the way I approached some parts of the project.

#### Filtering functionality (redux reducer)
```js
filterJobs: (state, { payload: filters }) => {
  if (state.jobs === null) {
    state.jobs = [];
  }
  const keys = filters.keywords.toLowerCase();
  state.filteredJobs = state.jobs.filter(job => {
    if (!job.title.toLowerCase().includes(keys) &&
      !job.requirements.toLowerCase().includes(keys) &&
      !job.description.toLowerCase().includes(keys)) {
      return null;
    }
    const num1 = filters.minSalary === '' ? 0 : Number(filters.minSalary);
    const num2 = job.minSalary === '' ? 0 : Number(job.minSalary);
    if (num1 > num2) {
      return null;
    }
    const existType = job.jobTypes.find(type => {
      if (filters.jobTypes.includes(type)) {
        return true;
      }
      return null;
    });
    const existCity = job.cities.find(city => {
      if (filters.cities.includes(city.toLowerCase())) {
        return true;
      }
      return null;
    })
    if (filters.jobTypes.length !== 0 && !existType) {
      return null;
    }
    if (filters.cities.length !== 0 && !existCity) {
      return null;
    }
    if (filters.locations.length !== 0 && !filters.locations.includes(job.location)) {
      return null;
    }
    if (filters.experiences.length !== 0 && !filters.experiences.includes(job.experience)) {
      return null;
    }
    return job;
  });
  state.page = 1;
}
```

#### Send email function
```js
const sendEmail = async (req, name, email, token, type, field) => {
  const forwardedHost = req.get('host');
  const forwardedProtocol = req.get('x-forwarded-proto') || 'http';
  const origin = `${forwardedProtocol}://${forwardedHost}`;

  const message = emailMessages[field];
  const uri = `${origin}/${message.link}?token=${token}&email=${email}&type=${type}`;
  const link = `<a href=${uri}>here</a>`;
  const htmlMessage = `<p>${message.msg} ${link}.</p>`;
  const htmlBody = `<h4>Hello ${name}!<h4>${htmlMessage}`;
  const subject = message.title;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const emailContent = {
    from: 'eusebiu.rimboi04@gmail.com',
    to: email,
    subject: subject,
    html: htmlBody,
  };
  const info = await sgMail.send(emailContent);
}
```

#### Authenticate user middleware
```js
const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = getTokenInfo(accessToken);
      req.userInfo = payload.user;
      return next();
    }
    const payload = getTokenInfo(refreshToken);
    const existingToken = await Token.findOne({
      refreshToken: payload.refreshToken,
      userID: payload.user.userID,
    });
    if (!existingToken || !existingToken.isValid) {
      throw new CustomAPIError('Invalid authentication', StatusCodes.UNAUTHORIZED);
    }
    attachCookiesToResponse({ res, user: payload.user, refreshToken: payload.refreshToken });
    req.userInfo = payload.user;
    return next();
  } catch (error) {
    throw new CustomAPIError('Invalid authentication', StatusCodes.UNAUTHORIZED);
  }
};
```

#### Abstract Chips component
```js
export default function Chips(props) {
  const { placeholder, name, value: objects, onChange: changeObjects } = props;
  const [object, setObject] = useState('');

  function handleObjectAdd() {
    const exist = objects.find(curObj => {
      if (object.toLowerCase() === curObj.toLowerCase()) {
        return curObj;
      }
      return null;
    });
    const obj = { target: {
      value: !exist && object !== '' ? [...objects, object.toLowerCase()] : objects,
      name: name,
    }};
    changeObjects(obj);
    setObject(old => {
      return exist ? old : '';
    });
  }

  function handleObjectDelete(val) {
    const curIdx = objects.indexOf(val);
    const newObjects = objects.filter((elem, idx) => {
      if (curIdx !== idx) {
        return elem;
      }
      return null;
    });
    const obj = { target: {
      value: newObjects,
      name: name,
    }};
    changeObjects(obj);
  }

  function handleObjectChange(event) {
    setObject(event.target.value);
  }

  return <div data-testid='chips'>
  {objects && objects.map((elem, idx) => {
    return <div key={nanoid()} className={styles.elem}>
      <div className={styles.flex}>
        <button onClick={() => handleObjectDelete(elem)}>
          <TiDeleteOutline size={25} />
        </button>
        <div data-testid={`${name}${idx}`}>{elem}</div>
      </div>
    </div>
  })}
  <div className={styles.form}>
    <input id={`input${placeholder}`} name={name} onChange={handleObjectChange} type='text'
      value={object} placeholder={placeholder} onKeyDown={e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleObjectAdd();
      }
    }} />
    <button id={`add${placeholder}`} className={styles.btn} onClick={handleObjectAdd}>Add</button>
  </div>
</div>
}
```

## Conclusion
Hope you enjoy the project as much as I do!  

If you have any more question, don't hesitate to contact me: <eusebiu.rimboi04@gmail.com>.

## Licence
[MIT](https://choosealicense.com/licenses/mit/)