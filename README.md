# Tuteora
<img src="./Capture.PNG" width="100">

Tuteora - inspired by "Tutoring" and "ora" (well-being), reflecting the positive outcomes of learning.

Mobile app for students to connect with a tutor and book sessions in a more organized, streamlined fashion. 

# Key Features

**User Authentication**: Built on Firebase to manage user registration, login, and authentication.

**Data Storage**: Firebase handles storage of user data and app-related information.

**Responsive Design**: The UI is styled with Tailwind CSS, ensuring a mobile-friendly and adaptive layout.

**State Management**: React Context API is used to manage and propagate updates and statuses across components.

# User Features

**Session Management**: Easily manage your learning sessions with a user-friendly interface. Track active sessions, view session history, cancel sessions, and stay updated on your progress.

**Request Management**: Request a tutor or learning session at any time. Seamlessly submit requests and receive timely responses from available tutors.

**Change & Request a Tutor at Any Time**: If you're not satisfied with your current tutor or wish to switch, you can request a new tutor at any point during your learning journey.

**Scheduling For Seamless Communication**: Schedule sessions with your tutor or student based on mutual availability. The built-in calendar, schedule display, and request system ensure that both parties stay informed and on schedule for every session.

**Adjust Your Tutoring Availability**: Tutors can easily manage their schedule by setting their availability. Specify days, times, and overall availability to ensure both you and your students stay informed and can book sessions without any conflicts. This feature helps tutors efficiently balance their workload while providing students with clear access to open time slots.

# Known Bugs

The react context for sessions does not update correctly when requests are made/received.

# Install & Usage

After cloning down, ensure your device is capable of running Android Studio. Additionally, ensure you have the system environment variable "ANDROID/HOME". If you do not, create it and select androidsdk as the directory.

Open Android Studio and run an emulator of your choice.

Run the following once the above is done:
```
npm run android
```

Once the app is running, you will be prompted to sign in or register.

