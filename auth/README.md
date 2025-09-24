# Hogwarts Authentication System

A modern, magical authentication system built with Firebase (client-side only). Features passwordless email link authentication, enrollment system, and a beautiful Harry Potter theme.

## ✨ Features

- **Passwordless Authentication**: Magic email links for secure sign-in
- **Student Enrollment**: VIT student email validation and automatic account creation
- **Email Link Sign-In**: No passwords required - just click the link!
- **Real-time Auth State**: Seamless authentication experience
- **Firestore Integration**: Direct client-side database operations
- **Magical Theme**: Harry Potter styled components and messaging
- **Modular Design**: Easy to integrate and customize

## 🏗️ Structure

```
auth/
├── components/
│   ├── AuthDashboard.tsx     # Main auth interface with email link handling
│   ├── AuthForm.tsx          # Login/signup form with VIT student detection
│   ├── Leaderboard.tsx       # Score system and leaderboard
│   └── Message.tsx           # Magical toast notifications
├── hooks/
│   ├── useAuth.tsx           # Authentication context and state
│   └── useMessage.tsx        # Message management
├── types/
│   └── index.ts              # TypeScript definitions
├── utils/
│   ├── authService.tsx       # Firebase Auth services
│   └── enrollmentAuth.ts     # Enrollment validation and email link sending
└── index.ts                  # Centralized exports
```

## 🚀 Setup

1. **Environment Variables**: Add to your `.env` file:
   ```env
   # Firebase Client Configuration (Frontend Only)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

2. **Firebase Console Setup**: 
   - Enable Authentication with **Email Link** provider
   - Create Firestore database with these collections:
     - `enrollments` - For student enrollment data
     - `scores` - For leaderboard system
   - Configure authorized domains for email link auth

## 🎯 Usage

### 🏰 Complete Auth Dashboard
```tsx
import { AuthDashboard } from "../auth";

export default function AuthPage() {
  return <AuthDashboard />;
}
```

### 🪄 Enrollment Flow Integration
```tsx
import { EnrollmentAuthService } from "../auth";

// Process student enrollment with email link
const result = await EnrollmentAuthService.processEnrollment({
  fullName: "Harry Potter",
  email: "harry.21bce1234@vitapstudent.ac.in",
  regNum: "21BCE1234",
  phone: "9876543210",
  bloodStatus: "Half-blood"
});

if (result.success) {
  // User will receive magic email link
  console.log("Magic sign-in link sent!");
}
```

### ⚡ Custom Auth Components
```tsx
import { AuthProvider, useAuth, AuthForm } from "../auth";

function MagicalComponent() {
  const { currentUser, loading } = useAuth();
  
  if (loading) return <div>Casting spells...</div>;
  
  return (
    <div>
      {currentUser ? (
        <h1>Welcome, {currentUser.email}!</h1>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}

export default function MyPage() {
  return (
    <AuthProvider>
      <MagicalComponent />
    </AuthProvider>
  );
}
```

## 🧙‍♂️ Core Components

- **AuthDashboard**: Complete magical auth interface with email link handling
- **AuthForm**: Smart form that detects VIT students and adapts UI
- **Leaderboard**: House points system with real-time updates
- **Message**: Magical toast notifications with themed styling

## 🪝 Hooks

- **useAuth()**: Authentication state, user info, and auth methods
- **useMessage()**: Magical message management with auto-dismiss

## ⚡ Services

- **EnrollmentAuthService**: Student enrollment and email link authentication
  - `validateEnrollment(data)` - Validates VIT email format and reg number
  - `sendMagicalSignInLink(email)` - Sends passwordless sign-in link
  - `processEnrollment(data)` - Complete enrollment flow

- **AuthService**: Core Firebase authentication operations
  - `signup(email, password)` - Traditional signup (if needed)
  - `login(email, password)` - Traditional login (if needed)
  - `logout()` - Sign out current user
  - `resetPassword(email)` - Send password reset email
  - `addScore(score)` - Add score to leaderboard
  - `getLeaderboard(limit)` - Fetch top scores

## 🎯 Key Features for Integration

- **Zero Backend**: Pure client-side Firebase integration
- **Email Link Auth**: Passwordless authentication flow
- **VIT Student Detection**: Smart email validation and UI adaptation
- **Modular Architecture**: Self-contained `/auth` folder
- **TypeScript Ready**: Full type safety and IntelliSense
- **Theme Consistent**: Magical Harry Potter styling throughout
- **CORS Friendly**: No server-side dependencies or API routes

## 🔧 Advanced Configuration

### Email Link Authentication Setup
1. In Firebase Console → Authentication → Sign-in method
2. Enable **Email link (passwordless sign-in)**
3. Add your domain to authorized domains
4. Configure action URL template (optional)

### Firestore Security Rules
```javascript
// Allow authenticated users to read/write their own data
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /enrollments/{document} {
      allow read, write: if request.auth != null;
    }
    match /scores/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```