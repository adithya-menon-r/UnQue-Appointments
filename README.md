# Unque Appointment APIs

A backend server with RESTful APIs for managing appointment bookings between students and professors. This system allows students to sign up, log in, view professor availability, book or cancel appointments. Professors can sign up, log in, set availability, and cancel appointments when necessary.

## Tech Stack
- **NodeJS**, **ExpressJS** - Backend API routing & logic
- **MongoDB** - NoSQL DB for storage
- **JWT**, **BcryptJS** - Authentication
- **Jest**, **Supertest** - API Testing

## Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/adithya-menon-r/UnQue-Appointments.git
cd UnQue-Appointments
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root directory with the following:
```
PORT=5000
JWT_SECRET="YOUR_JWT_SECRET"
MONGO_URI="YOUR_MONGODB_CONNECTION_STRING"
```

### 4. Start the server
```bash
npm run dev
```

The server will now be running on `http://localhost:PORT`.

## API Endpoints

All protected endpoints require a valid JWT in the `Authorization` header:
```
Authorization: Bearer <token>
```

### Auth
| Method | Endpoint           | Description                                |
|--------|--------------------|--------------------------------------------|
| POST   | `/api/auth/signup` | Register a new user (student or professor) |
| POST   | `/api/auth/login`  | Log in with email and password             |

### Availability
| Method | Endpoint            | Description                             | Allowed By             |
|--------|---------------------|-----------------------------------------|------------------------|
| GET    | `/api/availability` | Get available slots for a professor     | Any authenticated user |
| POST   | `/api/availability` | Set availability slots for a professor  | Professor              |

### Appointments
| Method | Endpoint                               | Description                    | Allowed By                                  |
|--------|----------------------------------------|--------------------------------|---------------------------------------------|
| POST   | `/api/appointments`                    | Book an appointment            | Student                                     |
| DELETE | `/api/appointments/:appointmentId`     | Cancel an appointment          | Student who booked or related Professor     |
| GET    | `/api/appointments/student/:studentId` | Get appointments for a student | The student themselves or related Professor |


## Testing
Run the end-to-end automated test with the following command:
```bash
npm run test
```
## License
[LICENSE](LICENSE)
