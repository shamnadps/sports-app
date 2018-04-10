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

To get the list of events: (localhost:8000/events/getAllEvents)

## Implementation Details

Right now the backend application starts up on localhost:3000, then connects to the postgres db on docker using sequalize and then insert a single row of data to the events table. This data can be fetched using the events api call.
