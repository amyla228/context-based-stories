# Story Spark - Location-Based Video Ideas

A mobile web app that detects your current location and suggests creative video story ideas you can record right now based on where you are.

## 🌟 Features

### 📍 Location Detection
- Automatically detects your current location
- Identifies the type of place you're at (coffee shop, gym, home, park, etc.)
- Works on mobile devices with GPS

### 🎬 Creative Video Ideas
Based on your location, the app suggests relevant video content ideas:

**Coffee Shop:**
- Rate Every Drink Challenge
- Aesthetic Study Session  
- Coffee Shop Hidden Gems

**Gym:**
- Workout Transformation
- Beginner Workout Tips
- Gym Equipment Guide

**Home:**
- Morning Routine
- Room Makeover
- Cooking Challenge

**Park:**
- Nature Photography
- Outdoor Workout

**Shopping Mall:**
- Shopping Haul
- Mall Food Court Review

**Restaurant:**
- Restaurant Review
- Food Photography

### 🎥 Video Recording
- Built-in camera recording functionality
- Records both video and audio
- Automatic download of recorded videos
- TikTok-style recording interface

### 📱 Mobile-First Design
- Beautiful, modern UI inspired by TikTok
- Responsive design that works on all devices
- Smooth animations and transitions
- Intuitive touch-friendly interface

## 🚀 How to Use

1. **Open the App**: Load `index.html` in your mobile browser
2. **Allow Location**: Grant location permissions when prompted
3. **Select an Idea**: Browse through the suggested video ideas for your location
4. **Preview Video**: Click "Preview Video" to see detailed instructions
5. **Start Recording**: Select an idea and click the record button
6. **Record Your Video**: Use the built-in camera to record your content
7. **Download**: Your video will automatically download when you stop recording

## 🛠️ Technical Details

### Built With
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript ES6+**: Location detection, video recording, and interactive features
- **Web APIs**: Geolocation API, MediaRecorder API, getUserMedia API

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Requirements
- HTTPS connection (required for camera access)
- Location services enabled
- Camera and microphone permissions

## 📁 File Structure

```
context-based-stories/
├── index.html          # Main app interface
├── styles.css          # Modern, TikTok-style styling
├── script.js           # App functionality and logic
└── README.md          # This file
```

## 🎯 How It Works

1. **Location Detection**: Uses the browser's Geolocation API to get your coordinates
2. **Place Identification**: Determines the type of location you're at
3. **Idea Generation**: Suggests relevant video ideas based on your location
4. **Video Scripts**: Provides detailed video structure and tips for each idea
5. **Recording**: Uses MediaRecorder API to capture video and audio
6. **Download**: Automatically saves your recorded video

## 💡 Creative Inspiration

The app is designed to spark creativity by:
- **Context Awareness**: Suggests ideas that make sense for your current location
- **Detailed Guidance**: Provides step-by-step video structure and pro tips
- **Immediate Action**: Encourages you to start recording right away
- **Authentic Content**: Focuses on genuine, location-based storytelling

## 🔧 Customization

You can easily add new location types and video ideas by editing the `locationIdeas` object in `script.js`. Each idea includes:
- Title and description
- Relevant tags
- Detailed video script with structure and tips

## 📱 Mobile Optimization

- Touch-friendly buttons and interactions
- Optimized for vertical mobile viewing
- Fast loading and smooth performance
- Works offline (except for location detection)

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful purple gradient theme
- **Glass Morphism**: Modern frosted glass effects
- **Smooth Animations**: Fade-in and slide-up transitions
- **Responsive Grid**: Adapts to different screen sizes
- **Modern Typography**: Clean, readable Inter font

## 🚀 Getting Started

1. Clone or download the files
2. Open `index.html` in a modern web browser
3. Allow location and camera permissions
4. Start creating amazing location-based content!

---

**Note**: For the best experience, use this app on a mobile device with location services enabled. The app works best with HTTPS for camera access. 