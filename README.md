## Management API

REST API for user management and authentication.

Supports:
- **Sign up**
- **Sign in**
- **Sign out**
- **Get user / users**
- **Update user**
- **Delete user**

Authentication is implemented using **JWT** stored in **HTTP-only session cookies**.

### Docker

Prebuilt Docker image is available on Docker Hub:

👉 https://hub.docker.com/repository/docker/erichwr/management-api/general

### Build and runlocally
```bash
./build-docker.sh
./run-docker.sh
```
###Example env file:
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
DATABASE_URL=YOUR_NEON_DATABASE_URL
JWT_SECRET=YOUR_JWT_SECRET





