# CDL Prep Mastery

**CDL Prep Mastery** is a comprehensive, offline-first mobile application designed to help aspiring truck drivers prepare for their Commercial Driver's License (CDL) exams. Built with React Native and Expo, it offers a robust study experience with practice questions, simulated exams, and detailed progress tracking.

## 🚀 Features

*   **Extensive Question Bank**: Over 600 verified questions covering 8 major CDL topics:
    *   General Knowledge
    *   Air Brakes
    *   Combination Vehicles
    *   Hazardous Materials (Hazmat)
    *   Passenger Transport
    *   Tank Vehicles
    *   Doubles/Triples
    *   School Bus
*   **Two Study Modes**:
    *   **Practice Mode**: Learn at your own pace with immediate feedback and detailed explanations for every question.
    *   **Exam Mode**: Simulate real test conditions with randomized questions and no hints until the end.
*   **Offline-First**: Fully functional without an internet connection. All questions and user progress are stored locally on your device.
*   **Progress Tracking**: Automatically tracks your stats, including:
    *   Average Score
    *   Total Questions Answered
    *   Study Time
    *   Exam Attempts
    *   Daily Streaks
*   **Dark Mode**: Seamlessly switch between light and dark themes for comfortable studying day or night.

## 🛠 Tech Stack

*   **Framework**: [Expo](https://expo.dev) (React Native)
*   **Language**: TypeScript
*   **Navigation**: Expo Router
*   **Storage**: `@react-native-async-storage/async-storage` (for offline persistence)
*   **Styling**: Custom stylesheets with Expo Linear Gradient
*   **Icons**: FontAwesome via `@expo/vector-icons`

## 🏃‍♂️ Getting Started

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or yarn

### Installation

1.  Clone the repository (if applicable) or navigate to the project directory.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npx expo start
```

*   **iOS Simulator**: Press `i` (requires Xcode installed on macOS).
*   **Android Emulator**: Press `a` (requires Android Studio).
*   **Web**: Press `w`.
*   **Physical Device**: Download the "Expo Go" app on your phone and scan the QR code.

## 📱 Building for Production

This project is configured for **EAS Build**.

1.  Install the EAS CLI globally:
    ```bash
    npm install -g eas-cli
    ```
2.  Log in to your Expo account:
    ```bash
    eas login
    ```
3.  Configure the build (if not already done):
    ```bash
    eas build:configure
    ```
4.  Create a build:
    *   **Android (.aab)**: `eas build --platform android`
    *   **iOS**: `eas build --platform ios`

## 📂 Project Structure

*   `app/`: Application screens and routing (Expo Router).
*   `components/`: Reusable UI components (e.g., StatsOverview).
*   `context/`: React Contexts for global state (Theme, Questions).
*   `data/`: Static question data and stats logic.
*   `assets/`: Images and icons.
*   `scripts/`: Utility scripts (e.g., for generating SQL seeds).

## 📄 License

This project is proprietary and intended for educational purposes.
