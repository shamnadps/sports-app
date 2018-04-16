# Vantaa - backend

## Prerequisities

*   Node 8.10
*   Docker

## Development

Move to the backend folder and build and run docker:

```
cd backend/
docker build -t vantaa-pwa  .
docker-compose up
```

Navigate to : (localhost:8000)

You should be able to see the following message on the browser.

> 'Welcome to PWA Vanta Project!.'

## API Calls

list of all available courses: (http://localhost:8000/courses).
list of all available events: (http://localhost:8000/events)
list of all available users: (http://localhost:8000/users)

## Implementation Details

Right now the backend application starts up on (localhost:8000), then connects to the postgres db on docker using sequalize.

We are using the test API call to get the list of all courses from the Grynos Server.(https://colosseum.grynos.com/ilmoapix/v1/course/search?com=3,6&cgt=176).

This will be later replaced with the actual API once available.
