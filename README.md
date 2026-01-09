## Management API

User authentication API with **sign up**, **sign in**, and **sign out**.  
Uses **JWT** and **session cookies** for authentication.

### Docker

The application can be containerized using the provided scripts:

- `build-docker.sh` – builds the Docker image  
- `run-docker.sh` – runs the Docker container

### Environment Variables

A `.env` file **must be created** before running the application.  
It contains all required configuration values such as database credentials and secrets.
