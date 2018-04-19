# Vantaa Exercise Reservations

## Architecture
This project is simple client-server application built with 
- Frontend: React.js & MobX
- Backend: Node.js & Express.js
- Database: PostgreSQL

It integrates to Grynos to get the information about current courses available in Vantaa.


## Running locally
### With Docker
Run
```bash
./run-locally.sh
```

### Without Docker
See `backend/README.md` and `frontend/README.md` for details.

## Deployment
### Development
To deploy, Heroku CLI needs to be set-up along with Docker. 
```bash
./deploy-to-dev.sh
```

### Production
TBD