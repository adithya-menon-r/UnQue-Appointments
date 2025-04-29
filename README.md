# Unque Appointment APIs

A backend server with REST APIs for managing appointment bookings between students and professors. This system allows students to authenticate, view available professor slots, and book/cancel appointments. Professors can set their availability and cancel appointments when necessary.

## Tech Stack
- NodeJS, ExpressJS - Backend API routing & logic
- MongoDB - NoSQL DB for storage
- Jest, Supertest - API Testing

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
MONGO_URI="your_mongodb_connection_string"
```

### 4. Start the server
```bash
npm run dev
```

The server will now be running on `http://localhost:PORT`.

## API Endpoints

### Auth
| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | `/api/auth/login` | User login (creates user if doesn't exist) |

### Availability
| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| GET    | `/api/availability` | Get available slots for a professor |
| POST   | `/api/availability` | Set availability slots for a professor |

### Appointments
| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | `/api/appointments` | Book an appointment    |
| DELETE | `/api/appointments/:appointmentId` | Cancel an appointment |
| GET    | `/api/appointments/student/:studentId` | Get appointments for a specific student |


## Testing
Run the end-to-end automated test with the following command:
```bash
npm run test
```
## License
[LICENSE](LICENSE)
