// Story Spark App - Location-Based Video Ideas
// Updated: Added fallback mode for better mobile experience
class StorySparkApp {
    constructor() {
        this.currentLocation = null;
        this.placeType = null;
        this.selectedIdea = null;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.isRecording = false;
        this.testMode = false;
        this.testLocationIndex = 0;
        this.googlePlacesApiKey = 'AIzaSyAxX04ienIZ3ooKXP3wveQjPG5mtRJ5miw';
        this.youtubeApiKey = 'AIzaSyDfFlXr0xO_7iXEYV9R8zcYMvoGzmBIM9M';
        
        this.initializeApp();
    }

    // Search keywords for each location type
    locationSearchKeywords = {
        'coffee_shop': ['coffee shop vlog', 'cafe review', 'study with me coffee', 'coffee shop aesthetic'],
        'gym': ['gym transformation', 'workout motivation', 'gym beginner tips', 'fitness journey'],
        'home': ['morning routine', 'room makeover', 'cooking challenge', 'home vlog'],
        'park': ['nature photography', 'outdoor workout', 'park vlog', 'nature aesthetic'],
        'shopping_mall': ['shopping haul', 'mall food court', 'shopping vlog', 'mall review'],
        'restaurant': ['restaurant review', 'food vlog', 'dining experience', 'food photography']
    };

    // Database of location-based video ideas
    locationIdeas = {
        'coffee_shop': [
            {
                title: "Rate Every Drink Challenge",
                description: "Try every drink on the menu and rate them from worst to best!",
                tags: ["Food", "Challenge", "Review"],
                searchKeywords: ["coffee rating", "drink challenge", "cafe menu review"],
                videoScript: {
                    title: "Rate Every Drink Challenge",
                    intro: "Hey guys! Today I'm at [Coffee Shop Name] and I'm going to try every drink on their menu and rate them from worst to best!",
                    structure: [
                        "Start with a dramatic intro showing the menu",
                        "Order all drinks at once (dramatic effect)",
                        "Try each drink with honest reactions",
                        "Rate them 1-10 with explanations",
                        "End with your top 3 recommendations"
                    ],
                    tips: [
                        "Film your genuine reactions - don't fake it!",
                        "Show the drinks clearly before tasting",
                        "Use dramatic music for transitions",
                        "Include the barista's reaction to your order"
                    ]
                }
            },
            {
                title: "Aesthetic Study Session",
                description: "Create the perfect study atmosphere with coffee and productivity vibes",
                tags: ["Study", "Aesthetic", "Productivity"],
                searchKeywords: ["study with me", "coffee study", "aesthetic study"],
                videoScript: {
                    title: "Aesthetic Study Session",
                    intro: "Today I'm creating the perfect study session at [Coffee Shop Name] - let's get productive!",
                    structure: [
                        "Show your study setup and coffee order",
                        "Time-lapse of you studying",
                        "Show different study techniques",
                        "Include coffee breaks and snacks",
                        "End with your completed work"
                    ],
                    tips: [
                        "Use soft, calming background music",
                        "Show your study materials and organization",
                        "Include time stamps for different study phases",
                        "Film the coffee art and atmosphere"
                    ]
                }
            },
            {
                title: "Coffee Shop Hidden Gems",
                description: "Discover and share the best-kept secrets of this coffee shop",
                tags: ["Discovery", "Local", "Tips"],
                searchKeywords: ["coffee shop secrets", "hidden menu", "cafe discovery"],
                videoScript: {
                    title: "Coffee Shop Hidden Gems",
                    intro: "I'm exploring [Coffee Shop Name] to find their hidden gems that most people don't know about!",
                    structure: [
                        "Ask baristas for secret menu items",
                        "Try off-menu drink combinations",
                        "Show hidden seating areas or features",
                        "Discover unique decor or history",
                        "Share insider tips and tricks"
                    ],
                    tips: [
                        "Build rapport with the baristas first",
                        "Show the process of discovering secrets",
                        "Include the barista's reactions",
                        "Highlight what makes this place special"
                    ]
                }
            }
        ],
        'gym': [
            {
                title: "Workout Transformation",
                description: "Show your fitness journey with before/after or progress tracking",
                tags: ["Fitness", "Transformation", "Motivation"],
                searchKeywords: ["gym transformation", "workout progress", "fitness journey"],
                videoScript: {
                    title: "Workout Transformation",
                    intro: "Today I'm sharing my workout transformation journey at [Gym Name] - let's get inspired!",
                    structure: [
                        "Show your starting point and goals",
                        "Demonstrate your workout routine",
                        "Show progress over time",
                        "Include motivational moments",
                        "End with current results and future goals"
                    ],
                    tips: [
                        "Be honest about your journey",
                        "Show both struggles and victories",
                        "Include workout tips and form demonstrations",
                        "Use energetic music to match the vibe"
                    ]
                }
            },
            {
                title: "Beginner Workout Tips",
                description: "Help newcomers feel comfortable and confident in the gym",
                tags: ["Beginner", "Tips", "Education"],
                searchKeywords: ["gym beginner", "workout tips", "fitness beginner"],
                videoScript: {
                    title: "Beginner Workout Tips",
                    intro: "New to the gym? Don't worry! I'm sharing beginner-friendly tips at [Gym Name]",
                    structure: [
                        "Show common beginner mistakes to avoid",
                        "Demonstrate proper form for basic exercises",
                        "Explain gym etiquette and unwritten rules",
                        "Show beginner-friendly workout routines",
                        "End with encouragement and next steps"
                    ],
                    tips: [
                        "Be encouraging and non-judgmental",
                        "Show both correct and incorrect form",
                        "Include safety tips and modifications",
                        "Make it feel welcoming and accessible"
                    ]
                }
            },
            {
                title: "Gym Equipment Guide",
                description: "Walk through and explain how to use different gym machines",
                tags: ["Equipment", "Guide", "Education"],
                searchKeywords: ["gym equipment", "workout machines", "fitness equipment guide"],
                videoScript: {
                    title: "Gym Equipment Guide",
                    intro: "Confused by all the gym equipment? Let me show you how to use everything at [Gym Name]!",
                    structure: [
                        "Start with cardio equipment basics",
                        "Show weight training machines",
                        "Demonstrate free weight exercises",
                        "Explain safety features and settings",
                        "End with a complete workout using what you learned"
                    ],
                    tips: [
                        "Show the equipment labels and settings",
                        "Demonstrate proper form and safety",
                        "Include modifications for different fitness levels",
                        "Show the muscle groups each machine targets"
                    ]
                }
            }
        ],
        'home': [
            {
                title: "Morning Routine",
                description: "Share your perfect morning routine for productivity and wellness",
                tags: ["Routine", "Productivity", "Wellness"],
                searchKeywords: ["morning routine", "productive morning", "wellness routine"],
                videoScript: {
                    title: "Morning Routine",
                    intro: "Good morning! Today I'm sharing my perfect morning routine that sets me up for success!",
                    structure: [
                        "Show your alarm and first moments",
                        "Demonstrate your skincare routine",
                        "Show your breakfast and coffee preparation",
                        "Include exercise or meditation",
                        "End with your organized workspace"
                    ],
                    tips: [
                        "Use soft, morning-appropriate lighting",
                        "Show the time for each activity",
                        "Include your favorite morning products",
                        "Show the peaceful, intentional vibe"
                    ]
                }
            },
            {
                title: "Room Makeover",
                description: "Transform your space with creative DIY projects and organization",
                tags: ["DIY", "Organization", "Design"],
                searchKeywords: ["room makeover", "home decor", "diy room"],
                videoScript: {
                    title: "Room Makeover",
                    intro: "Today I'm giving my room a complete makeover! Let's transform this space together!",
                    structure: [
                        "Show the before state and problems",
                        "Plan your design and gather materials",
                        "Show the transformation process",
                        "Reveal the final result",
                        "Share organization tips and storage solutions"
                    ],
                    tips: [
                        "Show the planning and inspiration phase",
                        "Include budget-friendly DIY projects",
                        "Demonstrate organization techniques",
                        "Show before/after comparisons clearly"
                    ]
                }
            },
            {
                title: "Cooking Challenge",
                description: "Try a new recipe or cooking technique and share the process",
                tags: ["Cooking", "Challenge", "Food"],
                searchKeywords: ["cooking challenge", "recipe try", "cooking vlog"],
                videoScript: {
                    title: "Cooking Challenge",
                    intro: "Today I'm attempting to cook [Recipe Name] for the first time! Let's see how this goes!",
                    structure: [
                        "Show your ingredients and preparation",
                        "Demonstrate the cooking process",
                        "Include any mistakes or learning moments",
                        "Show the final result and tasting",
                        "Share what you learned and improvements"
                    ],
                    tips: [
                        "Be honest about your cooking skills",
                        "Show both successes and failures",
                        "Include cooking tips you discover",
                        "Make it fun and relatable"
                    ]
                }
            }
        ],
        'park': [
            {
                title: "Nature Photography",
                description: "Capture beautiful moments and share photography tips",
                tags: ["Photography", "Nature", "Art"],
                searchKeywords: ["nature photography", "outdoor photography", "nature aesthetic"],
                videoScript: {
                    title: "Nature Photography",
                    intro: "Today I'm exploring [Park Name] to capture some amazing nature shots!",
                    structure: [
                        "Show your camera equipment and settings",
                        "Demonstrate different photography techniques",
                        "Show the beautiful locations you find",
                        "Include editing tips and before/after",
                        "Share your favorite shots and why"
                    ],
                    tips: [
                        "Show your camera settings and techniques",
                        "Include composition tips and angles",
                        "Show the natural beauty around you",
                        "Share editing techniques and apps"
                    ]
                }
            },
            {
                title: "Outdoor Workout",
                description: "Take your fitness routine outside with nature as your gym",
                tags: ["Fitness", "Outdoor", "Nature"],
                searchKeywords: ["outdoor workout", "park fitness", "nature workout"],
                videoScript: {
                    title: "Outdoor Workout",
                    intro: "Today I'm taking my workout outside at [Park Name] - nature is my gym!",
                    structure: [
                        "Show the beautiful outdoor setting",
                        "Demonstrate outdoor exercises using natural elements",
                        "Show a complete outdoor workout routine",
                        "Include stretching and cool-down",
                        "End with the peaceful post-workout feeling"
                    ],
                    tips: [
                        "Show the natural beauty around you",
                        "Demonstrate safe outdoor exercises",
                        "Include modifications for different fitness levels",
                        "Show the peaceful, grounding experience"
                    ]
                }
            }
        ],
        'shopping_mall': [
            {
                title: "Shopping Haul",
                description: "Share your shopping experience and fashion finds",
                tags: ["Shopping", "Fashion", "Haul"],
                searchKeywords: ["shopping haul", "mall shopping", "fashion haul"],
                videoScript: {
                    title: "Shopping Haul",
                    intro: "Today I'm shopping at [Mall Name] and I found some amazing deals!",
                    structure: [
                        "Show your shopping list and budget",
                        "Visit different stores and try on items",
                        "Show your favorite finds and why you love them",
                        "Include price comparisons and deals",
                        "End with your complete haul and styling tips"
                    ],
                    tips: [
                        "Show the shopping experience authentically",
                        "Include try-on sessions and honest reviews",
                        "Share styling tips and outfit combinations",
                        "Show the total cost and value"
                    ]
                }
            },
            {
                title: "Mall Food Court Review",
                description: "Try different food options and rate the best spots",
                tags: ["Food", "Review", "Mall"],
                searchKeywords: ["food court review", "mall food", "food court vlog"],
                videoScript: {
                    title: "Mall Food Court Review",
                    intro: "Today I'm reviewing every restaurant in the food court at [Mall Name]!",
                    structure: [
                        "Show all the food court options",
                        "Order from different restaurants",
                        "Try each dish with honest reactions",
                        "Rate them and share recommendations",
                        "End with your top picks and budget tips"
                    ],
                    tips: [
                        "Show the variety of options available",
                        "Include honest food reactions",
                        "Share portion sizes and value",
                        "Include budget-friendly recommendations"
                    ]
                }
            }
        ],
        'restaurant': [
            {
                title: "Restaurant Review",
                description: "Share your dining experience and food recommendations",
                tags: ["Food", "Review", "Dining"],
                searchKeywords: ["restaurant review", "food review", "dining experience"],
                videoScript: {
                    title: "Restaurant Review",
                    intro: "Today I'm reviewing [Restaurant Name] - let's see if it lives up to the hype!",
                    structure: [
                        "Show the restaurant atmosphere and menu",
                        "Order signature dishes and drinks",
                        "Show the food presentation and taste test",
                        "Rate the service, atmosphere, and food",
                        "End with honest recommendations"
                    ],
                    tips: [
                        "Show the restaurant ambiance and decor",
                        "Include honest food reactions and ratings",
                        "Share the total cost and value assessment",
                        "Include service quality and atmosphere"
                    ]
                }
            },
            {
                title: "Food Photography",
                description: "Capture beautiful food shots and share photography tips",
                tags: ["Photography", "Food", "Art"],
                searchKeywords: ["food photography", "food aesthetic", "restaurant photography"],
                videoScript: {
                    title: "Food Photography",
                    intro: "Today I'm practicing food photography at [Restaurant Name] - let's make this food look amazing!",
                    structure: [
                        "Show your camera setup and settings",
                        "Demonstrate different food photography angles",
                        "Show the restaurant's beautiful dishes",
                        "Include editing tips and before/after",
                        "Share your best shots and techniques"
                    ],
                    tips: [
                        "Show different lighting and angle techniques",
                        "Include composition tips for food shots",
                        "Demonstrate editing techniques",
                        "Share the story behind each dish"
                    ]
                }
            }
        ]
    };

    async initializeApp() {
        this.bindEvents();
        
        // Check if we're on desktop for testing, but allow real location detection
        if (window.innerWidth > 768) {
            this.addTestControls();
        }
        
        await this.detectLocation();
    }

    addTestControls() {
        const header = document.querySelector('.header-content');
        const testButton = document.createElement('button');
        testButton.innerHTML = '🧪 Test Locations';
        testButton.style.cssText = `
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            cursor: pointer;
            margin-left: 1rem;
        `;
        testButton.addEventListener('click', () => {
            this.testMode = true;
            this.cycleTestLocation();
        });
        header.appendChild(testButton);
    }

    cycleTestLocation() {
        const placeTypes = ['coffee_shop', 'gym', 'home', 'park', 'shopping_mall', 'restaurant'];
        // Use the first test location for fallback
        this.placeType = placeTypes[0]; // Always use first location for fallback
        
        // Update location text
        const locationNames = {
            'coffee_shop': 'Local Coffee Shop',
            'gym': 'Fitness Center',
            'home': 'Your Home',
            'park': 'City Park',
            'shopping_mall': 'Shopping Mall',
            'restaurant': 'Local Restaurant'
        };
        
        document.getElementById('location-text').textContent = locationNames[this.placeType];
        
        // Show story ideas
        this.showStoryIdeas();
        
        // Show success message
        const notification = document.createElement('div');
        notification.innerHTML = `🎬 Now testing: ${locationNames[this.placeType]}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    bindEvents() {
        // Record button events
        document.getElementById('record-button').addEventListener('click', () => {
            this.startRecording();
        });

        document.getElementById('stop-button').addEventListener('click', () => {
            this.stopRecording();
        });

        // Modal events
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        document.getElementById('video-modal').addEventListener('click', (e) => {
            if (e.target.id === 'video-modal') {
                this.closeModal();
            }
        });
    }

    async detectLocation() {
        try {
            // Show loading state
            document.getElementById('location-status').style.display = 'block';
            document.getElementById('story-ideas').style.display = 'none';
            document.getElementById('recording-section').style.display = 'none';

            // Always try real location detection first
            const position = await this.getCurrentPosition();
            this.currentLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            console.log('Location detected:', this.currentLocation);

            // Get place information using Google Places API
            await this.identifyPlaceType();
            
            // Show story ideas
            this.showStoryIdeas();
            
        } catch (error) {
            console.error('Error detecting location:', error);
            
            // Show detailed error message with fallback
            let errorMessage = 'Unable to detect your location. ';
            
            if (error.code === 1) {
                errorMessage += 'Location permission denied. Please allow location access in your browser settings.';
            } else if (error.code === 2) {
                errorMessage += 'Location unavailable. Please check your GPS settings.';
            } else if (error.code === 3) {
                errorMessage += 'Location request timed out. Please try again.';
            } else {
                errorMessage += 'Please enable location services and try again.';
            }
            
            this.showError(errorMessage);
            
            // Fallback: Show test mode immediately if location fails
            console.log('Falling back to test mode immediately');
            this.testMode = true;
            this.cycleTestLocation();
        }
    }

    async simulateLocationDetection() {
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Use first test location
        const placeTypes = ['coffee_shop', 'gym', 'home', 'park', 'shopping_mall', 'restaurant'];
        this.placeType = placeTypes[this.testLocationIndex];
        
        // Update location text
        const locationNames = {
            'coffee_shop': 'Local Coffee Shop',
            'gym': 'Fitness Center',
            'home': 'Your Home',
            'park': 'City Park',
            'shopping_mall': 'Shopping Mall',
            'restaurant': 'Local Restaurant'
        };
        
        document.getElementById('location-text').textContent = locationNames[this.placeType];
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            });
        });
    }

    async identifyPlaceType() {
        try {
            // Use Google Places API to identify the place type
            const placeType = await this.getPlaceTypeFromGooglePlaces();
            this.placeType = placeType;
            
            // Get the actual place name
            const placeName = await this.getPlaceNameFromGooglePlaces();
            document.getElementById('location-text').textContent = placeName;
            
        } catch (error) {
            console.error('Error identifying place:', error);
            // Fallback to random place type if API fails
            const placeTypes = ['coffee_shop', 'gym', 'home', 'park', 'shopping_mall', 'restaurant'];
            this.placeType = placeTypes[Math.floor(Math.random() * placeTypes.length)];
            document.getElementById('location-text').textContent = 'Your Location';
        }
    }

    async getPlaceTypeFromGooglePlaces() {
        const { latitude, longitude } = this.currentLocation;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50&key=${this.googlePlacesApiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.status === 'OK' && data.results.length > 0) {
                const place = data.results[0];
                const types = place.types || [];
                
                // Map Google Places types to our location types
                if (types.includes('cafe') || types.includes('food') && place.name.toLowerCase().includes('coffee')) {
                    return 'coffee_shop';
                } else if (types.includes('gym') || types.includes('health')) {
                    return 'gym';
                } else if (types.includes('park') || types.includes('natural_feature')) {
                    return 'park';
                } else if (types.includes('shopping_mall') || types.includes('store')) {
                    return 'shopping_mall';
                } else if (types.includes('restaurant') || types.includes('food')) {
                    return 'restaurant';
                } else {
                    // Default to home if no specific type is found
                    return 'home';
                }
            } else {
                // Default to home if no places found nearby
                return 'home';
            }
        } catch (error) {
            console.error('Error fetching place type:', error);
            throw error;
        }
    }

    async getPlaceNameFromGooglePlaces() {
        const { latitude, longitude } = this.currentLocation;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50&key=${this.googlePlacesApiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.status === 'OK' && data.results.length > 0) {
                return data.results[0].name;
            } else {
                return 'Your Location';
            }
        } catch (error) {
            console.error('Error fetching place name:', error);
            return 'Your Location';
        }
    }

    async searchYouTubeShorts(keywords) {
        try {
            // Search for YouTube Shorts with the given keywords
            const searchQuery = keywords.join(' ');
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&videoDuration=short&maxResults=3&key=${this.youtubeApiKey}`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                return data.items.map(item => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.medium.url,
                    channelTitle: item.snippet.channelTitle,
                    publishedAt: item.snippet.publishedAt
                }));
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error searching YouTube Shorts:', error);
            return [];
        }
    }

    async getRelevantShortsForLocation(locationType) {
        const keywords = this.locationSearchKeywords[locationType] || [];
        if (keywords.length === 0) return [];
        
        // Get the first keyword for general location search
        const generalKeyword = keywords[0];
        return await this.searchYouTubeShorts([generalKeyword]);
    }

    async getRelevantShortsForIdea(idea) {
        if (!idea.searchKeywords) return [];
        return await this.searchYouTubeShorts(idea.searchKeywords);
    }

    showStoryIdeas() {
        // Hide loading
        document.getElementById('location-status').style.display = 'none';
        
        // Show ideas
        document.getElementById('story-ideas').style.display = 'block';
        document.getElementById('recording-section').style.display = 'block';
        
        // Add fade-in animation
        document.getElementById('story-ideas').classList.add('fade-in');
        document.getElementById('recording-section').classList.add('slide-up');
        
        // Populate ideas
        this.populateIdeas();
    }

    async populateIdeas() {
        const ideasGrid = document.getElementById('ideas-grid');
        const ideas = this.locationIdeas[this.placeType] || [];
        
        ideasGrid.innerHTML = '';
        
        for (let index = 0; index < ideas.length; index++) {
            const idea = ideas[index];
            
            // Get YouTube Shorts for this idea
            const shorts = await this.getRelevantShortsForIdea(idea);
            
            const ideaCard = document.createElement('div');
            ideaCard.className = 'idea-card';
            
            // Create the card content with YouTube Shorts
            let shortsHtml = '';
            if (shorts.length > 0) {
                shortsHtml = `
                    <div class="shorts-preview">
                        <h5>📺 Similar YouTube Shorts</h5>
                        <div class="shorts-mini-grid">
                            ${shorts.slice(0, 2).map(short => `
                                <div class="short-mini-card" onclick="app.openYouTubeVideo('${short.id}')">
                                    <img src="${short.thumbnail}" alt="${short.title}">
                                    <div class="play-mini-overlay">
                                        <i class="fas fa-play"></i>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <p class="shorts-note">Click to watch examples</p>
                    </div>
                `;
            }
            
            ideaCard.innerHTML = `
                <h3 class="idea-title">${idea.title}</h3>
                <p class="idea-description">${idea.description}</p>
                <div class="idea-tags">
                    ${idea.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                ${shortsHtml}
                <button class="preview-button" onclick="app.showVideoScript(${index})">
                    <i class="fas fa-file-alt"></i>
                    View Script
                </button>
            `;
            
            ideaCard.addEventListener('click', (e) => {
                // Only handle YouTube video clicks and script button clicks
                // Don't change card selection behavior
                if (e.target.closest('.shorts-preview')) {
                    // YouTube video clicks are handled by the onclick attribute
                    return;
                }
                if (e.target.closest('.preview-button')) {
                    // Script button clicks are handled by the onclick attribute
                    return;
                }
                // For all other clicks, just select the idea without changing card appearance
                this.selectIdea(index);
            });
            
            ideasGrid.appendChild(ideaCard);
        }
    }

    selectIdea(index) {
        // Don't change card visual appearance - just update the record button
        this.selectedIdea = this.locationIdeas[this.placeType][index];
        
        // Update record button
        const recordButton = document.getElementById('record-button');
        recordButton.innerHTML = `
            <i class="fas fa-video"></i>
            <span>Record "${this.selectedIdea.title}"</span>
        `;
    }

    showVideoScript(index) {
        const idea = this.locationIdeas[this.placeType][index];
        const modal = document.getElementById('video-modal');
        const modalTitle = document.getElementById('modal-title');
        const videoPreview = document.getElementById('video-preview');
        
        modalTitle.textContent = idea.videoScript.title;
        
        videoPreview.innerHTML = `
            <div class="video-script-section">
                <h4>📝 Your Video Script</h4>
                <p><strong>Intro:</strong> ${idea.videoScript.intro}</p>
                
                <h4>🎬 Video Structure:</h4>
                <ol>
                    ${idea.videoScript.structure.map(step => `<li>${step}</li>`).join('')}
                </ol>
                
                <h4>💡 Pro Tips:</h4>
                <ul>
                    ${idea.videoScript.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('video-modal').style.display = 'none';
    }

    async startRecording() {
        if (!this.selectedIdea) {
            alert('Please select a story idea first!');
            return;
        }

        if (this.testMode) {
            alert('🎬 Test Mode: Video recording is simulated. On mobile, this would start your camera!');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: true, 
                audio: true 
            });
            
            this.mediaRecorder = new MediaRecorder(stream);
            this.recordedChunks = [];
            
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };
            
            this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                
                // Create download link
                const a = document.createElement('a');
                a.href = url;
                a.download = `${this.selectedIdea.title.replace(/\s+/g, '_')}.webm`;
                a.click();
                
                // Clean up
                URL.revokeObjectURL(url);
                stream.getTracks().forEach(track => track.stop());
            };
            
            this.mediaRecorder.start();
            this.isRecording = true;
            
            // Update UI
            document.getElementById('record-button').style.display = 'none';
            document.getElementById('recording-status').style.display = 'flex';
            
        } catch (error) {
            console.error('Error starting recording:', error);
            alert('Unable to start recording. Please check camera and microphone permissions.');
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            
            // Update UI
            document.getElementById('recording-status').style.display = 'none';
            document.getElementById('record-button').style.display = 'flex';
        }
    }

    openYouTubeVideo(videoId) {
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        window.open(youtubeUrl, '_blank');
    }

    showError(message) {
        document.getElementById('location-status').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                <div class="error-actions">
                    <button onclick="app.detectLocation()" class="retry-button">
                        <i class="fas fa-redo"></i>
                        Try Again
                    </button>
                    <button onclick="app.enableTestMode()" class="test-mode-button">
                        <i class="fas fa-flask"></i>
                        Test Mode
                    </button>
                    <button onclick="app.showManualLocation()" class="manual-location-button">
                        <i class="fas fa-map-marker-alt"></i>
                        Manual Location
                    </button>
                </div>
            </div>
        `;
    }

    showManualLocation() {
        document.getElementById('location-status').innerHTML = `
            <div class="manual-location">
                <h4>📍 Enter Your Location</h4>
                <p>Choose a location type to test the app:</p>
                <div class="location-buttons">
                    <button onclick="app.setManualLocation('coffee_shop')" class="location-btn">
                        <i class="fas fa-coffee"></i>
                        Coffee Shop
                    </button>
                    <button onclick="app.setManualLocation('gym')" class="location-btn">
                        <i class="fas fa-dumbbell"></i>
                        Gym
                    </button>
                    <button onclick="app.setManualLocation('home')" class="location-btn">
                        <i class="fas fa-home"></i>
                        Home
                    </button>
                    <button onclick="app.setManualLocation('park')" class="location-btn">
                        <i class="fas fa-tree"></i>
                        Park
                    </button>
                    <button onclick="app.setManualLocation('shopping_mall')" class="location-btn">
                        <i class="fas fa-shopping-bag"></i>
                        Shopping Mall
                    </button>
                    <button onclick="app.setManualLocation('restaurant')" class="location-btn">
                        <i class="fas fa-utensils"></i>
                        Restaurant
                    </button>
                </div>
            </div>
        `;
    }

    setManualLocation(locationType) {
        this.placeType = locationType;
        this.testMode = true;
        
        // Update location text
        const locationNames = {
            'coffee_shop': 'Local Coffee Shop',
            'gym': 'Fitness Center',
            'home': 'Your Home',
            'park': 'City Park',
            'shopping_mall': 'Shopping Mall',
            'restaurant': 'Local Restaurant'
        };
        
        document.getElementById('location-text').textContent = locationNames[locationType];
        
        // Show story ideas
        this.showStoryIdeas();
    }

    enableTestMode() {
        this.testMode = true;
        this.testLocationIndex = 0;
        this.cycleTestLocation();
        this.showStoryIdeas();
    }
}

// Initialize the app when the page loads
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new StorySparkApp();
});