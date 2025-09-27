# 🚀 Goblet of Fire - Setup Instructions

## 📋 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/pranjal-kumar-0/goblet-of-fire.git
cd goblet-of-fire
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Firebase (Optional)
If you want to use Firebase authentication:

1. **Create Firebase Project**: Go to [Firebase Console](https://console.firebase.google.com/)
2. **Enable Authentication**: Email/Password method
3. **Create Service Account**: Download the JSON key file
4. **Create `.env.local`** with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
NEXT_FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key\n-----END PRIVATE KEY-----\n"
```

### 4. Run the Application
```bash
npm run dev
```

### 5. Access the Game
- **Local**: http://localhost:3000
- **Network**: http://YOUR_IP:3000 (for mobile access)

## 🔐 Authentication

### **Works Without Firebase!**
The game includes a fallback authentication system using local JSON credentials. All 35 teams are pre-configured and ready to use.

### **Test Teams**
- **TEAM001** / gryffindor2024 (Gryffindor Lions)
- **TEAM015** / patronus2024 (Patronus Masters)
- **TEAM020** / quidditch2024 (Quidditch Champions)
- **TEAM035** / diagon2024 (Diagon Alley)

### **All 35 Teams Available**
Check `data/team-credentials.json` for the complete list.

## 🎮 Features

- ✅ **Dual Authentication**: Firebase + Local JSON fallback
- ✅ **35 Pre-configured Teams**: Ready to use
- ✅ **Mobile Responsive**: Works on all devices
- ✅ **Offline Capable**: Works without internet
- ✅ **Harry Potter Theme**: Magical UI/UX
- ✅ **Protected Routes**: Game pages require authentication

## 📱 Mobile Access

1. **Connect to same WiFi** as your computer
2. **Find your IP**: Run `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. **Open on phone**: `http://YOUR_IP:3000`
4. **Login with any team** from the credentials file

## 🛠️ Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### **Project Structure**
```
├── app/                 # Next.js App Router pages
├── components/          # React components
├── lib/                # Utility functions
├── data/               # Team credentials (JSON)
├── firebase/           # Firebase configuration
└── public/             # Static assets
```

## 🚨 Important Notes

- **No Firebase Required**: Game works with local authentication
- **Credentials Included**: All 35 teams ready to use
- **Secure**: No sensitive data in repository
- **Mobile Ready**: Works on any device on same WiFi

## 🎉 Ready to Play!

Your Harry Potter Goblet of Fire game is ready! Just run `npm run dev` and start the magical adventure! 🧙‍♂️✨
