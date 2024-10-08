# Rejob

Want to see the project in action? Click [here](https://rejob.pro).  

Want to see the API Docs? Click [here](https://documenter.getpostman.com/view/24263146/2s93sdXrCc).  

[I want to see some code.](#code-snippets)

## Table of content
- [Overview](#overview)
- [Workflow](#workflow)
- [Features](#features)
- [Technologies and tools](#technologies-and-tools)
- [Code structure](#code-structure)
- [Technical decisions](#technical-decisions)
- [Future functionalities](#future-updates)
- [Functionalities](#functionalities)
- [API docs](#api-docs)
- [Database structure](#database-structure)
- [Installation setup](#installation-and-usage-instructions)
- [Code snippets](#code-snippets)
- [Conclusion](#conclusion)
- [Licence](#licence)


## Overview
**Rejob** is a job board website intended to help job seeker and employers alike, by managing and enriching the process of hiring and find jobs, respectively.


## Workflow
Throughout the building phase I focused on respecting the principles of a professional workflow. Now, at the end, I realise there is still room for improvement.  

In the first steps, I created the diagrams of the app's functionality and the app's wireframe with Figma.

Next, I divided my work in 6 alternated stages (3 for back-end and 3 for front-end). Each stage had its established tasks and objectives, but, also, was updated in the moment when new ideas came to me.  

In the last steps, I did the CI/CD, the deployment, the documentation and the final testing of the app.  


## Features
The app has many functionalities, most of them depending on the type of the logged in user (unknown, company or candidate).  

An unknown user have restricted permissions, but it still can search for jobs or view the profile of other companies and candidates. Once an unknown user logs in, registers (and validates its email address) or goes through a password reset, it gets more permissions depending on the account type.  

A candidate user can search jobs, apply and unapply for jobs, find and review companies, upload profile images, change the email or password and much more.  

A company user can, among others, add jobs, find candidates that applied for a specified job, delete candidates' applications, pay for monthly or individual subscriptions and update profile.  


## Technologies and tools
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


## Code structure
Fundamentally, both parts, front-end and back-end, were structured around roles.  

Front-end functionality is located mostly in pages, components, utils and redux directories.  

Back-end functionality respects MVC pattern and is located across muliple directories: models (with MongoDB models), controllers (with actual back-end functionalities), routes (with the endpoints) and middlewares (with authentication and authorisation functionalities).  


## Technical decisions
I didn't use a CSS library (like bootstrap) on purpose, because I know writing responsive and efficient custom CSS is a very important skill for developers.  

I focused on using React Redux as little as possible (and using local state management as much as possible) as I think is a bit overkill for my goals with this project.  

I used Docker and EC2 deployment because I see it's a more professional way of deploying full-stack web apps and it offers more options in deployment configuration.  


## Future updates
In the near future, if time allows me, I plan to add more features in the website like company's ability to search for candidates, email candidates, more filters and sorting functionality.  

Besides this, I plan to improve project's design and general app performance.   


## Functionalities
As I said above, before starting the actual building I created some structure diagrams that can be seen in the following images:
* [image1](https://github.com/eusebiuuu/job-board/assets/107063753/d5151079-d4b1-470c-b904-15c564da80e4)
* [image2](https://github.com/eusebiuuu/job-board/assets/107063753/374e5a23-f27c-4847-af49-ca459ca3540a)
* [image3](https://github.com/eusebiuuu/job-board/assets/107063753/d4533aff-59e4-44cf-ab11-e78f4534d493)


## API Docs
Check the brief API documentation of the app [here](https://documenter.getpostman.com/view/24263146/2s93sdXrCc).  


## Database structure
Check the database structure [here](https://github.com/eusebiuuu/job-board/assets/107063753/4921c7c3-1ffe-4922-8424-815fbd1fc8ee).   

## Installation and usage instructions

1. Firstly you need a shell terminal

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

Among all the written code, some parts I consider more interesting and relevant. Thus, I want to show you in order to create a better picture of the way I approached them.

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
