# 🏰 Goblet of Fire - Hogwarts Enrollment SystemThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A magical web application for Hogwarts student enrollment, featuring a beautiful Harry Potter themed interface, passwordless authentication, and seamless Firebase integration. Built with Next.js and designed for VIT-AP students.## Getting Started



## ✨ FeaturesFirst, run the development server:



- 🧙‍♂️ **Magical Enrollment Form**: Harry Potter themed student registration```bash

- 📧 **Passwordless Authentication**: Email link sign-in (no passwords required!)npm run dev

- 🎓 **VIT Student Integration**: Automatic email validation for VIT-AP students# or

- 🏰 **Hogwarts Admission Letter**: Downloadable admission certificateyarn dev

- 🏆 **House Points System**: Interactive leaderboard and scoring# or

- 📱 **Responsive Design**: Beautiful UI that works on all devicespnpm dev

- 🔥 **Firebase Integration**: Real-time database and authentication# or

- 🎨 **Magical Theme**: Consistent Harry Potter aesthetic throughoutbun dev

```

## 🚀 Quick Start

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Prerequisites

- Node.js 18+ You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- npm or yarn

- Firebase accountThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



### Installation## Learn More



1. **Clone the repository**To learn more about Next.js, take a look at the following resources:

   ```bash

   git clone https://github.com/pranjal-kumar-0/goblet-of-fire.git- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

   cd goblet-of-fire- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

   ```

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

2. **Install dependencies**

   ```bash## Deploy on Vercel

   npm install

   # orThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

   yarn install

   ```Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication with **Email link (passwordless sign-in)**
   - Create a Firestore database
   - Copy your Firebase config

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your Firebase configuration to `.env`:
   ```env
   # Firebase Client Configuration (Frontend Only)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the magical interface!

## 🏗️ Project Structure

```
goblet-of-fire/
├── app/                      # Next.js App Router
│   ├── auth/                 # Authentication pages
│   ├── form/                 # Enrollment form
│   ├── game/                 # Interactive game
│   └── layout.tsx            # Root layout
├── auth/                     # Authentication system
│   ├── components/           # Auth UI components
│   ├── hooks/                # React hooks for auth
│   ├── utils/                # Auth utilities and services
│   └── types/                # TypeScript definitions
├── components/               # Shared UI components
│   └── Enroll.tsx           # Hogwarts admission letter
├── firebase/                 # Firebase configuration
└── public/                   # Static assets (images, icons)
```

## 🎯 Usage Guide

### For Students

1. **Enrollment Process**:
   - Visit `/form` to access the enrollment form
   - Fill in your details with VIT-AP email format: `name.regnumber@vitapstudent.ac.in`
   - Submit form to receive your Hogwarts admission letter
   - Check email for magic sign-in link

2. **Authentication**:
   - Click the magic link in your email
   - Automatically signed in to the authentication portal
   - Access house points system and leaderboard

3. **Download Certificate**:
   - Your personalized Hogwarts admission letter
   - Download as PNG image for sharing

### For Developers

1. **Adding New Features**:
   ```bash
   # Create a new component
   mkdir components/NewFeature
   touch components/NewFeature/index.tsx
   ```

2. **Modifying Authentication**:
   - Check `auth/` folder for all auth-related code
   - See `auth/README.md` for detailed documentation

3. **Database Operations**:
   ```tsx
   import { db } from "./firebase/firebase.config";
   import { collection, addDoc } from "firebase/firestore";

   // Add data to Firestore
   await addDoc(collection(db, "enrollments"), {
     name: "Harry Potter",
     email: "harry.potter@vitapstudent.ac.in"
   });
   ```

## 🔧 Configuration

### Firebase Setup

1. **Authentication Configuration**:
   - Enable Email link (passwordless sign-in)
   - Add your domain to authorized domains
   - Configure action URL settings

2. **Firestore Collections**:
   ```
   enrollments/     # Student enrollment data
   ├── name         # Full name
   ├── email        # VIT student email
   ├── regNum       # Registration number
   ├── createdAt    # Timestamp
   └── status       # Enrollment status

   scores/          # Leaderboard data  
   ├── userId       # Firebase user ID
   ├── score        # Points earned
   ├── timestamp    # When score was added
   └── house        # Hogwarts house (optional)
   ```

3. **Security Rules**:
   ```javascript
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

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**:
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Add Environment Variables**:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add all your `NEXT_PUBLIC_FIREBASE_*` variables

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Other Platforms

- **Netlify**: Connect GitHub repo and add env vars
- **Firebase Hosting**: Use `firebase deploy`
- **Railway**: Connect repo and configure env vars

## 🛠️ Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production  
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript compilation check
```

### Code Style

- **ESLint**: Configured with Next.js recommended rules
- **TypeScript**: Full type safety throughout the project
- **Prettier**: Code formatting (configure in `.prettierrc`)

### Adding New Pages

```tsx
// app/new-page/page.tsx
export default function NewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black">
      <h1 className="text-yellow-200 text-center">New Magical Page</h1>
    </div>
  );
}
```

## 🎨 Theming

The project uses a consistent Harry Potter theme with:

- **Colors**: Dark backgrounds with gold/yellow accents
- **Fonts**: 'Cinzel Decorative' for headings, serif for body text  
- **Components**: Magical wax seals, parchment textures, shadow effects
- **Animations**: Subtle pulse animations and transitions

### Custom CSS Classes

```css
/* Magical gradient background */
.magical-bg {
  background: linear-gradient(to bottom, #000000, #7f1d1d, #000000);
}

/* Golden text with shadow */
.magical-text {
  color: #fcd34d;
  text-shadow: 0 2px 5px rgba(0,0,0,0.8);
}

/* Wax seal effect */
.wax-seal {
  background: linear-gradient(to bottom right, #facc15, #dc2626);
  box-shadow: 0 0 25px 5px rgba(255,215,0,0.9);
}
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and structure
- Add TypeScript types for all new code
- Test your changes thoroughly
- Update documentation for new features
- Maintain the magical theme consistency

## 📞 Support

- **GitHub Issues**: Report bugs or request features
- **Documentation**: Check `/auth/README.md` for authentication details
- **Firebase**: [Firebase Documentation](https://firebase.google.com/docs)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Harry Potter Universe**: For the magical inspiration
- **Firebase**: For the excellent backend-as-a-service platform  
- **Next.js**: For the amazing React framework
- **Vercel**: For seamless deployment and hosting
- **VIT-AP**: For the educational context and student community

---

*"It is our choices, Harry, that show what we truly are, far more than our abilities."* - Albus Dumbledore