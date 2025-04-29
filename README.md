# Unque Appointments APIs

A backend server with APIs for managing appointment bookings between students and professors.

## Project Structure

```
├── config/                 
│   └── db.js              # MongoDB connection setup
├── controllers/           # Route logic for auth, availability & appointments
├── models/                # Mongoose Schemas for User, Availability & Appointment
├── routes/                # Express routes for the API endpoints
├── tests/                 # End-to-end automated tests
├── .babelrc               
├── .env                   # Environment variables
├── .gitignore             
├── jest.config.js         
├── app.js                 # Express app setup
├── package-lock.json          
├── package.json          
└── server.js              # Entry point
```

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
