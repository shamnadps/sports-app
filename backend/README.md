# Vantaa - backend

## Prerequisites
- Node 8.10 or later

## Development
In this folder:
```
npm install
npm start
```

API is available now in `localhost:3000`

## API Calls

list of all available courses: (http://localhost:8000/courses).
list of all available events: (http://localhost:8000/events)
list of all available users: (http://localhost:8000/users)

## Implementation Details

Right now the backend application starts up on (localhost:8000), then connects to the postgres db on docker using sequalize.

We are using the test API call to get the list of all courses from the Grynos Server.(https://colosseum.grynos.com/ilmoapix/v1/course/search?com=3,6&cgt=176).

This will be later replaced with the actual API once available.
