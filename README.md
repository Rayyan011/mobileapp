# 📝 Notes App

A modern, AI-powered notes application built with React Native and Expo, featuring intelligent note cleanup using Groq API.



## ✨ Features

- 📝 **Create, Edit & Delete Notes** - Simple and intuitive note management
- 💾 **Auto-Save** - Notes are automatically saved as you type - no save button needed!
- 🔍 **Search Functionality** - Quickly find notes by title
- ✨ **AI-Powered Cleanup** - Improve and organize notes using Groq's Llama 3.3 model
- 💾 **Local Storage** - Persistent data storage with AsyncStorage
- 🎨 **8 Beautiful Themes** - Light, Dark, Blue, Green, Purple, Orange, Pink, and System
- 📱 **Cross-Platform** - Works on both iOS and Android
- 🎯 **Floating Action Button** - Quick access to create new notes
- 🌙 **Dark Mode Support** - Full theme system with proper contrast

## 🛠️ Tech Stack

- **Expo SDK 53** - React Native framework
- **React 19** - UI library
- **Expo Router** - File-based routing
- **MobX** - State management with persistence
- **NativeWind** - Tailwind CSS for React Native
- **Groq API** - AI note cleanup (Llama 3.3-70b)
- **TypeScript** - Type safety
- **React Query Kit** - API state management
- **React Native Reanimated** - Smooth animations

## 📋 Prerequisites

- Node.js 20.19.4+
- Yarn package manager
- Expo Go app (for testing) or Xcode/Android Studio (for simulators)
- Groq API key (for AI cleanup feature)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Rayyan011/mobileapp.git
cd mobileapp
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
GROQ_API_KEY=your-groq-api-key-here
```

Get your free API key from [console.groq.com](https://console.groq.com)

### 4. Start the Development Server

```bash
yarn start
```

### 5. Run on Your Device

- **iOS Simulator:** `yarn ios`
- **Android Emulator:** `yarn android`
- **Expo Go:** Scan the QR code with Expo Go app

## 🎨 Themes

The app includes 8 beautiful themes:

- 🌞 **Light** - Clean white background
- 🌙 **Dark** - Easy on the eyes dark mode
- 💙 **Blue** - Blue-tinted dark theme
- 💚 **Green** - Green-tinted light theme
- 💜 **Purple** - Purple-tinted dark theme
- 🧡 **Orange** - Orange-tinted light theme
- 💗 **Pink** - Pink-tinted light theme
- ⚙️ **System** - Follows device theme

Access themes from Settings → Theme

## 💾 Auto-Save Feature

Notes are **automatically saved** as you type - there's no save button needed!

- **Real-time saving:** Changes are saved automatically while you write
- **No data loss:** Your work is preserved even if you navigate away
- **Seamless experience:** Just start typing and your notes are saved instantly
- **Works offline:** All data is stored locally on your device

## 🤖 AI Cleanup Feature

The app includes an AI-powered note cleanup feature:

1. Open any note for editing
2. Tap the **✨ Clean** button in the header
3. The AI will improve grammar, fix spelling, and organize your note
4. Watch the smooth animation as your note is rewritten
5. The cleaned note is automatically saved

**Powered by:** Groq's Llama 3.3-70b model

## 📁 Project Structure

```
src/
├── app/                    # Expo Router screens
│   ├── (app)/             # Protected app screens
│   │   ├── notes.tsx     # Notes list screen
│   │   └── settings.tsx  # Settings screen
│   ├── (auth)/           # Authentication screens
│   │   ├── login.tsx     # Login screen
│   │   └── onboarding.tsx # Onboarding screen
│   └── notes/            # Note-related screens
│       ├── add.tsx       # Note editor with AI cleanup
│       └── [id].tsx     # Individual note view
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── note-card.tsx     # Note card component
│   ├── note-editor.tsx  # Note editor component
│   └── splash-screen.tsx # Custom splash screen
├── stores/              # MobX state management
│   ├── notes-store.ts   # Notes data store
│   ├── auth-store.ts    # Authentication store
│   └── ui-theme-store.ts # Theme management
├── api/                 # API integrations
│   └── notes/           # Notes API hooks
│       └── use-cleanup-note.ts # AI cleanup hook
├── hooks/               # Custom React hooks
│   └── use-theme.tsx    # Theme hook
└── lib/                 # Utilities
    ├── theme.ts         # Theme definitions
    └── i18n/            # Internationalization
```

## 🔧 Development Commands

```bash
# Start development server
yarn start

# Run on iOS simulator
yarn ios

# Run on Android emulator
yarn android

# Run on web
yarn web

# Lint code
yarn lint

# Format code
yarn format
```

## 🧪 Testing

Tested on:
- ✅ iOS Simulator (Xcode)
- ✅ Android Emulator (Android Studio)
- ✅ Physical devices via Expo Go

## 🐛 Troubleshooting

### App Won't Load?
- Ensure both devices are on the same WiFi network
- Press `r` in terminal to reload
- Press `Shift + r` for full reload
- Restart Expo Go app

### AI Cleanup Not Working?
- Verify `GROQ_API_KEY` is set in `.env` file
- Restart the Expo dev server after adding API key
- Check console for error messages

### Theme Not Applying?
- Clear app cache: `yarn start --clear`
- Restart the app completely

## 📝 Notes

- **Auto-save:** Notes are automatically saved as you type - no manual save needed
- **Local storage:** Notes are stored locally using AsyncStorage
- **Data persistence:** All notes persist across app restarts
- **Offline-first:** Works completely offline - no internet required for note-taking
- **AI cleanup:** Requires internet connection (uses Groq API)
- **Theme preferences:** Saved automatically and persist across sessions

## 🔐 Environment Variables

Required:
- `GROQ_API_KEY` - Your Groq API key for AI features

Optional:
- `API_URL` - Backend API URL (if using)
- `SECRET_KEY` - Secret key for API (if using)


