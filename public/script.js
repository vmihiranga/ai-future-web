// Futuristic AI Website JavaScript
// Enhanced with 3D animations, typing effects, and AI API integration

document.addEventListener("DOMContentLoaded", function () {
    // Initialize loading screen
    initializeLoadingScreen();

    // Initialize theme
    initializeTheme();

    // Initialize typing animation
    initializeTypingAnimation();

    // Initialize scroll animations
    initializeScrollAnimations();

    // Initialize navigation
    initializeNavigation();

    // Initialize 3D background
    initialize3DBackground();

    // Initialize neural network animation
    initializeNeuralNetwork();

    // Initialize chat functionality
    initializeChatSystem();

    // Initialize stats counter
    initializeStatsCounter();

    // Initialize tilt effects
    initializeTiltEffects();

    // Initialize particle systems
    initializeParticleSystem();
 initContactForm();

});


function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');

    // Character counter for message
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', () => {
            const count = messageTextarea.value.length;
            charCount.textContent = count;
            
            if (count > 950) {
                charCount.style.color = '#ff4444';
            } else if (count > 800) {
                charCount.style.color = '#ffa500';
            } else {
                charCount.style.color = 'var(--text-muted)';
            }
        });
    }

    // Real-time validation
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showStatus('Please correct the errors before submitting.', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                showStatus('Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success');
                form.reset();
                charCount.textContent = '0';
                
                // Remove validation states
                inputs.forEach(input => {
                    input.classList.remove('error');
                    const errorMsg = input.parentElement.querySelector('.form-error');
                    if (errorMsg) errorMsg.classList.remove('show');
                });

                // Add success animation to submit button
                submitBtn.innerHTML = `
                    <span class="btn-text">
                        <i class="fas fa-check-circle"></i>
                        <span>Message Sent!</span>
                    </span>
                    <div class="btn-particles"></div>
                `;

                setTimeout(() => {
                    submitBtn.innerHTML = `
                        <span class="btn-text">
                            <i class="fas fa-paper-plane"></i>
                            <span>Send Message</span>
                        </span>
                        <span class="btn-loading">
                            <i class="fas fa-spinner fa-spin"></i>
                            <span>Sending...</span>
                        </span>
                        <div class="btn-particles"></div>
                    `;
                }, 3000);
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showStatus('Oops! Something went wrong. Please try again or contact us directly via email.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    function validateField(field) {
        const value = field.value.trim();
        const errorElement = field.parentElement.querySelector('.form-error');
        let errorMessage = '';

        // Remove previous error
        field.classList.remove('error');
        if (errorElement) errorElement.classList.remove('show');

        // Check if field is empty
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
        }
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
            }
        }
        // Phone validation (optional field)
        else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
                errorMessage = 'Please enter a valid phone number';
            }
        }
        // Name validation
        else if (field.id === 'name' && value && value.length < 2) {
            errorMessage = 'Name must be at least 2 characters';
        }
        // Message validation
        else if (field.id === 'message' && value && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters';
        }

        if (errorMessage) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.add('show');
            }
            return false;
        }

        return true;
    }

    function showStatus(message, type) {
        formStatus.className = `form-status ${type}`;
        formStatus.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        formStatus.style.display = 'flex';

        // Auto-hide after 8 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 8000);

        // Scroll to status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Loading Screen Management
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    const loadingProgress = document.querySelector(".loading-progress");
    const loadingText = document.querySelector(".loading-text");

    if (!loadingScreen || !loadingProgress || !loadingText) return;

    const loadingSteps = [
        "Initializing Neural Networks...",
        "Loading AI Models...",
        "Connecting to Quantum Processors...",
        "Calibrating Intelligence Systems...",
        "Ready to Transform the Future!",
    ];

    let currentStep = 0;
    let progress = 0;

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);

            setTimeout(() => {
                loadingScreen.classList.add("hidden");
                document.body.classList.add("loaded");
            }, 500);
        }

        loadingProgress.style.width = `${progress}%`;

        if (
            progress > (currentStep + 1) * 20 &&
            currentStep < loadingSteps.length - 1
        ) {
            currentStep++;
            loadingText.textContent = loadingSteps[currentStep];
        }
    }, 100);
}

// Fixed Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const sunIcon = themeToggle?.querySelector(".sun");
    const moonIcon = themeToggle?.querySelector(".moon");

    if (!themeToggle || !sunIcon || !moonIcon) return;

    // Get saved theme or default to dark
    let currentTheme = "dark";
    try {
        if (typeof Storage !== "undefined") {
            currentTheme = localStorage.getItem("theme") || "dark";
        }
    } catch (e) {
        console.warn("localStorage not available, using default theme");
    }

    // Apply initial theme
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcons(currentTheme);

    // Theme toggle functionality with smooth transition
    themeToggle.addEventListener("click", function () {
        currentTheme = currentTheme === "dark" ? "light" : "dark";

        // Add transition class for smooth theme switching
        document.documentElement.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        document.documentElement.setAttribute("data-theme", currentTheme);
        
        try {
            if (typeof Storage !== "undefined") {
                localStorage.setItem("theme", currentTheme);
            }
        } catch (e) {
            console.warn("Could not save theme preference");
        }
        
        updateThemeIcons(currentTheme);

        // Remove transition class after animation
        setTimeout(() => {
            document.documentElement.style.transition = "";
        }, 300);
    });

    function updateThemeIcons(theme) {
        if (theme === "dark") {
            sunIcon.style.opacity = "1";
            sunIcon.style.transform = "rotate(0deg) scale(1)";
            moonIcon.style.opacity = "0";
            moonIcon.style.transform = "rotate(180deg) scale(0.5)";
        } else {
            sunIcon.style.opacity = "0";
            sunIcon.style.transform = "rotate(-180deg) scale(0.5)";
            moonIcon.style.opacity = "1";
            moonIcon.style.transform = "rotate(0deg) scale(1)";
        }
    }
}

// Enhanced Typing Animation
function initializeTypingAnimation() {
    const typingElement = document.getElementById("typing-text");
    const cursor = document.querySelector(".cursor");

    if (!typingElement || !cursor) return;

    const messages = [
        "The Future is AI",
        "Artificial Intelligence", 
        "Smart Technology",
        "Innovation Unleashed",
        "Tomorrow, Today",
        "Neural Networks",
        "Machine Learning",
        "Deep Learning",
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    let isDeleting = false;

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDelay = 2000;

    function typeMessage() {
        const currentMessage = messages[messageIndex];

        if (isTyping && !isDeleting) {
            if (charIndex < currentMessage.length) {
                typingElement.textContent += currentMessage.charAt(charIndex);
                charIndex++;
                setTimeout(typeMessage, typingSpeed + Math.random() * 50);
            } else {
                isTyping = false;
                setTimeout(() => {
                    isDeleting = true;
                    typeMessage();
                }, pauseDelay);
            }
        } else if (isDeleting) {
            if (charIndex > 0) {
                typingElement.textContent = currentMessage.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeMessage, deletingSpeed);
            } else {
                isDeleting = false;
                isTyping = true;
                messageIndex = (messageIndex + 1) % messages.length;
                setTimeout(typeMessage, typingSpeed);
            }
        }

        // Animate cursor
        cursor.style.animation = "none";
        cursor.offsetHeight; // Trigger reflow
        cursor.style.animation = "blink 1s infinite";
    }

    typeMessage();
}

// Enhanced Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                // Trigger specific animations for different elements
                if (entry.target.classList.contains("stat-item")) {
                    animateStatsCounter(entry.target);
                }

                if (entry.target.classList.contains("neural-network-3d")) {
                    startNeuralAnimation();
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document
        .querySelectorAll(
            ".fade-in, .animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2, .animate-fade-in-delay-3",
        )
        .forEach((el) => {
            observer.observe(el);
        });

    // Enhanced navbar scroll effect
    let lastScrollTop = 0;
    let ticking = false;

    function updateNavbar() {
        const navbar = document.getElementById("navbar");
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Add navbar hide/show effect (only on mobile)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = "translateY(-100%)";
            } else {
                navbar.style.transform = "translateY(0)";
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
    }
}

// Enhanced Neural Network Animation
function initializeNeuralNetwork() {
    const neuralNetwork = document.querySelector(".neural-network-3d");
    if (!neuralNetwork) return;

    const nodes = document.querySelectorAll(".node");
    const svg = document.querySelector(".connections-svg");

    // Create connections between layers
    function createConnections() {
        const inputNodes = document.querySelectorAll('[data-layer="input"]');
        const hiddenNodes = document.querySelectorAll('[data-layer="hidden"]');
        const outputNodes = document.querySelectorAll('[data-layer="output"]');

        let connections = "";

        // Input to hidden connections
        inputNodes.forEach((inputNode, i) => {
            hiddenNodes.forEach((hiddenNode, j) => {
                const inputRect = inputNode.getBoundingClientRect();
                const hiddenRect = hiddenNode.getBoundingClientRect();
                const svgRect = svg.getBoundingClientRect();

                const x1 = inputRect.left + inputRect.width / 2 - svgRect.left;
                const y1 = inputRect.top + inputRect.height / 2 - svgRect.top;
                const x2 = hiddenRect.left + hiddenRect.width / 2 - svgRect.left;
                const y2 = hiddenRect.top + hiddenRect.height / 2 - svgRect.top;

                connections += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                    stroke="rgba(0, 237, 238, 0.3)" stroke-width="1" 
                    class="connection-line" data-delay="${(i + j) * 100}"/>`;
            });
        });

        // Hidden to output connections
        hiddenNodes.forEach((hiddenNode, i) => {
            outputNodes.forEach((outputNode, j) => {
                const hiddenRect = hiddenNode.getBoundingClientRect();
                const outputRect = outputNode.getBoundingClientRect();
                const svgRect = svg.getBoundingClientRect();

                const x1 = hiddenRect.left + hiddenRect.width / 2 - svgRect.left;
                const y1 = hiddenRect.top + hiddenRect.height / 2 - svgRect.top;
                const x2 = outputRect.left + outputRect.width / 2 - svgRect.left;
                const y2 = outputRect.top + outputRect.height / 2 - svgRect.top;

                connections += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                    stroke="rgba(0, 237, 238, 0.3)" stroke-width="1" 
                    class="connection-line" data-delay="${(i + j + 10) * 100}"/>`;
            });
        });

        svg.innerHTML = connections;
    }

    function startNeuralAnimation() {
        createConnections();

        // Animate connections
        const connectionLines = document.querySelectorAll(".connection-line");
        connectionLines.forEach((line, index) => {
            const delay = parseInt(line.getAttribute("data-delay"));
            setTimeout(() => {
                line.style.stroke = "rgba(0, 237, 238, 0.6)";
                line.style.strokeWidth = "2";

                setTimeout(() => {
                    line.style.stroke = "rgba(0, 237, 238, 0.3)";
                    line.style.strokeWidth = "1";
                }, 500);
            }, delay);
        });

        // Animate nodes
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.transform = "scale(1.2)";
                node.style.boxShadow = "0 0 30px rgba(0, 237, 238, 0.8)";

                setTimeout(() => {
                    node.style.transform = "scale(1)";
                    node.style.boxShadow = "0 0 20px rgba(0, 237, 238, 0.6)";
                }, 300);
            }, index * 100);
        });
    }

    // Trigger animation on scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startNeuralAnimation();
                    setInterval(startNeuralAnimation, 5000); // Repeat every 5 seconds
                }
            });
        },
        { threshold: 0.5 },
    );

    observer.observe(neuralNetwork);
}

// Enhanced Chat System
function initializeChatSystem() {
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const chatMessages = document.getElementById("chat-messages");
    const typingIndicator = document.getElementById("typing-indicator");
    const clearChatBtn = document.querySelector(".clear-chat");

    if (!chatInput || !sendBtn || !chatMessages) return;

    let isTyping = false;

    // Enable/disable send button based on input
    chatInput.addEventListener("input", function () {
        sendBtn.disabled = this.value.trim() === "" || isTyping;
    });

    // Send message on Enter key
    chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && !e.shiftKey && !isTyping) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Send button click
    sendBtn.addEventListener("click", sendMessage);

    // Clear chat functionality
    if (clearChatBtn) {
        clearChatBtn.addEventListener("click", clearChat);
    }

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message || isTyping) return;

        // Add user message
        addMessage(message, "user");
        chatInput.value = "";
        sendBtn.disabled = true;
        isTyping = true;

        // Show typing indicator
        showTypingIndicator();

        try {
            // Call the local backend API
            const response = await fetch(
                `/api/chat?text=${encodeURIComponent(message)}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();

            if (data.success && data.result && data.result.prompt) {
                // Simulate typing delay for more natural feel
                setTimeout(
                    () => {
                        hideTypingIndicator();
                        addMessage(data.result.prompt, "bot");
                        isTyping = false;
                        sendBtn.disabled = chatInput.value.trim() === "";
                        
                        // Add indicator if using fallback response
                        if (data.fallback) {
                            const lastMessage = chatMessages.lastElementChild;
                            if (lastMessage) {
                                const statusIndicator = document.createElement("div");
                                statusIndicator.style.cssText = `
                                    font-size: 0.7rem;
                                    color: var(--text-muted);
                                    opacity: 0.6;
                                    margin-top: 0.3rem;
                                    font-style: italic;
                                `;
                                statusIndicator.textContent = "• Backend response";
                                lastMessage.querySelector(".message-content").appendChild(statusIndicator);
                            }
                        }
                    },
                    800 + Math.random() * 1200, // Random delay between 0.8-2 seconds
                );
            } else {
                throw new Error("API response error or invalid format");
            }
        } catch (error) {
            console.warn("Backend API not available, using fallback responses:", error.message);
            // Fallback to local responses
            const fallbackResponse = generateFallbackResponse(message);
            setTimeout(() => {
                hideTypingIndicator();
                addMessage(fallbackResponse, "bot");
                isTyping = false;
                sendBtn.disabled = chatInput.value.trim() === "";
                
                // Add a subtle indicator that this is a fallback response
                const lastMessage = chatMessages.lastElementChild;
                if (lastMessage) {
                    const statusIndicator = document.createElement("div");
                    statusIndicator.style.cssText = `
                        font-size: 0.7rem;
                        color: var(--text-muted);
                        opacity: 0.6;
                        margin-top: 0.3rem;
                        font-style: italic;
                    `;
                    statusIndicator.textContent = "• Offline response";
                    lastMessage.querySelector(".message-content").appendChild(statusIndicator);
                }
            }, 1000);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement("div");
        avatar.className = "message-avatar";
        avatar.innerHTML = sender === "bot" ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        const content = document.createElement("div");
        content.className = "message-content";

        const messageText = document.createElement("p");
        messageText.textContent = text;

        const timestamp = document.createElement("div");
        timestamp.className = "message-time";
        timestamp.textContent = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        content.appendChild(messageText);
        content.appendChild(timestamp);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Animate message appearance
        messageDiv.style.opacity = "0";
        messageDiv.style.transform = "translateY(20px)";
        requestAnimationFrame(() => {
            messageDiv.style.transition = "all 0.3s ease";
            messageDiv.style.opacity = "1";
            messageDiv.style.transform = "translateY(0)";
        });
    }

    function showTypingIndicator() {
        if (typingIndicator) {
            typingIndicator.classList.add("show");
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function hideTypingIndicator() {
        if (typingIndicator) {
            typingIndicator.classList.remove("show");
        }
    }

    function generateFallbackResponse(message) {
        const responses = {
            hello: "Hello! I'm your AI assistant. How can I help you explore the fascinating world of artificial intelligence?",
            hi: "Hi there! I'm here to help you understand AI and its applications. What would you like to know?",
            ai: "Artificial Intelligence is revolutionizing our world by enabling machines to learn, reason, and make decisions. It's transforming industries from healthcare to transportation.",
            "machine learning": "Machine Learning is a subset of AI that allows systems to learn and improve from experience without being explicitly programmed. It powers everything from recommendation systems to autonomous vehicles.",
            future: "The future of AI is incredibly exciting! We're moving towards more intelligent automation, personalized experiences, and AI-human collaboration that will solve complex global challenges.",
            help: "I'm here to help you understand AI and its applications! Feel free to ask me about artificial intelligence, machine learning, neural networks, or any technology topics.",
            "neural networks": "Neural networks are computing systems inspired by biological neural networks. They're the foundation of deep learning and power applications like image recognition and natural language processing.",
            robots: "AI-powered robots are becoming increasingly sophisticated, from industrial automation to personal assistants. They're designed to work alongside humans to enhance productivity and safety.",
            technology: "AI technology is advancing rapidly, with breakthroughs in areas like natural language processing, computer vision, and reinforcement learning creating new possibilities every day.",
            default: "That's an interesting question! AI technology continues to evolve rapidly, opening new possibilities for innovation and problem-solving across countless industries.",
        };

        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        return responses.default;
    }

    function clearChat() {
        const userMessages = chatMessages.querySelectorAll(".user-message");
        userMessages.forEach((msg) => {
            msg.style.transition = "all 0.3s ease";
            msg.style.opacity = "0";
            msg.style.transform = "translateX(-100%)";
            setTimeout(() => msg.remove(), 300);
        });

        // Keep the welcome message but remove other bot messages
        const botMessages = chatMessages.querySelectorAll(".bot-message");
        if (botMessages.length > 1) {
            for (let i = 1; i < botMessages.length; i++) {
                botMessages[i].style.transition = "all 0.3s ease";
                botMessages[i].style.opacity = "0";
                botMessages[i].style.transform = "translateX(100%)";
                setTimeout(() => botMessages[i].remove(), 300);
            }
        }
    }
}

// Stats Counter Animation
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number");

    function animateCounter(element) {
        const target = parseInt(element.getAttribute("data-count"));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (target >= 1000000) {
                element.textContent = (current / 1000000).toFixed(1) + "M+";
            } else if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(1) + "K+";
            } else {
                element.textContent = Math.floor(current) + (target === 92 ? "%" : "+");
            }
        }, 16);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector(".stat-number");
                    if (statNumber && !statNumber.classList.contains("animated")) {
                        statNumber.classList.add("animated");
                        animateCounter(statNumber);
                    }
                }
            });
        },
        { threshold: 0.5 },
    );

    document.querySelectorAll(".stat-item").forEach((stat) => {
        observer.observe(stat);
    });
}

// 3D Tilt Effects
function initializeTiltEffects() {
    const tiltElements = document.querySelectorAll("[data-tilt]");

    tiltElements.forEach((element) => {
        let isHovering = false;

        element.addEventListener("mouseenter", function () {
            this.style.transformStyle = "preserve-3d";
            isHovering = true;
        });

        element.addEventListener("mousemove", function (e) {
            if (!isHovering) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener("mouseleave", function () {
            isHovering = false;
            this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    });
}

// Enhanced Particle System
function initializeParticleSystem() {
    const heroParticles = document.getElementById("hero-particles");
    if (!heroParticles) return;

    let particleInterval;

    function createParticle() {
        const particle = document.createElement("div");
        particle.className = "hero-particle";
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 237, 238, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float-up 4s linear infinite;
            left: ${Math.random() * 100}%;
            top: 100%;
            box-shadow: 0 0 10px rgba(0, 237, 238, 0.8);
        `;

        heroParticles.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 4000);
    }

    // Create particles periodically
    particleInterval = setInterval(createParticle, 300);

    // Add CSS for particle animation if not exists
    if (!document.getElementById("particle-styles")) {
        const style = document.createElement("style");
        style.id = "particle-styles";
        style.textContent = `
            @keyframes float-up {
                0% {
                    transform: translateY(0) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-300px) scale(1);
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-600px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Cleanup function
    window.addEventListener("beforeunload", function() {
        if (particleInterval) {
            clearInterval(particleInterval);
        }
    });
}

// Utility Functions
function scrollToChat() {
    const chatSection = document.getElementById("chat");
    if (chatSection) {
        const navbarHeight = document.getElementById("navbar").offsetHeight;
        const targetPosition = chatSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
        });
    }
}

function clearChat() {
    const chatMessages = document.getElementById("chat-messages");
    if (!chatMessages) return;

    const userMessages = chatMessages.querySelectorAll(".user-message");
    userMessages.forEach((msg) => {
        msg.style.transition = "all 0.3s ease";
        msg.style.opacity = "0";
        msg.style.transform = "translateX(-100%)";
        setTimeout(() => msg.remove(), 300);
    });

    // Keep the welcome message but remove other bot messages
    const botMessages = chatMessages.querySelectorAll(".bot-message");
    if (botMessages.length > 1) {
        for (let i = 1; i < botMessages.length; i++) {
            botMessages[i].style.transition = "all 0.3s ease";
            botMessages[i].style.opacity = "0";
            botMessages[i].style.transform = "translateX(100%)";
            setTimeout(() => botMessages[i].remove(), 300);
        }
    }
}

// Contact Form Enhancement
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Validate form data
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert("Please fill in all fields.");
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Message Sent!</span>';
                submitBtn.style.background = "linear-gradient(135deg, #4CAF50, #45a049)";

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = "";
                    contactForm.reset();
                    
                    // Reset form labels
                    const labels = contactForm.querySelectorAll('label');
                    labels.forEach(label => {
                        label.style.top = "1rem";
                        label.style.fontSize = "";
                        label.style.color = "var(--text-muted)";
                        label.style.fontWeight = "";
                    });
                }, 2000);
            }, 1500);
        });
    }
});

// Performance optimization and cleanup
window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Lazy load images and optimize performance
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove("lazy");
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll("img[data-src]").forEach((img) => {
            imageObserver.observe(img);
        });
    }

    // Preload critical resources
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = "https://api.dreaded.site/api/chatgpt";
    document.head.appendChild(link);
});

// Error handling for better UX
window.addEventListener("error", function(e) {
    console.warn("JavaScript error caught:", e.error);
    // Don't show error to user, but log it for debugging
});

// Handle visibility changes for performance
document.addEventListener("visibilitychange", function() {
    const canvas = document.getElementById("bg-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        if (document.hidden) {
            // Pause animations when tab is not visible
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
});

// Enhanced scroll navigation with proper scoping
(function() {
    let ticking = false;
    let lastScrollTop = 0;

    function updateNavbar() {
        const navbar = document.getElementById("navbar");
        if (!navbar) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Add navbar hide/show effect (only on mobile)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = "translateY(-100%)";
            } else {
                navbar.style.transform = "translateY(0)";
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
    }

    // Add scroll listener with proper throttling
    window.addEventListener("scroll", function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
})();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = document.getElementById("navbar").offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });

            // Close mobile menu if open
            const navMenu = document.getElementById("nav-menu");
            const hamburger = document.getElementById("hamburger");
            if (navMenu && hamburger) {
                navMenu.classList.remove("active");
                hamburger.classList.remove("active");
                resetHamburgerIcon(hamburger);
            }
        }
    });
});

// Fixed Navigation
function initializeNavigation() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
        
        // Animate hamburger lines
        const spans = hamburger.querySelectorAll("span");
        if (hamburger.classList.contains("active")) {
            spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            spans[1].style.opacity = "0";
            spans[1].style.transform = "translateX(20px)";
            spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
        } else {
            resetHamburgerIcon(hamburger);
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
            resetHamburgerIcon(hamburger);
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
            resetHamburgerIcon(hamburger);
        });
    });

    // Add active link highlighting
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            navLinks.forEach((l) => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    function resetHamburgerIcon(hamburger) {
        const spans = hamburger.querySelectorAll("span");
        spans.forEach((span) => {
            span.style.transform = "none";
            span.style.opacity = "1";
        });
    }
}

// Fixed Discover More Click Handler
function initializeDiscoverMore() {
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const mouse = document.querySelector(".mouse");
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener("click", function(e) {
            e.preventDefault();
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
                const navbarHeight = document.getElementById("navbar").offsetHeight;
                const targetPosition = aboutSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
        
        // Make it more obvious that it's clickable
        scrollIndicator.style.cursor = "pointer";
    }
    
    if (mouse) {
        mouse.addEventListener("click", function(e) {
            e.preventDefault();
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
                const navbarHeight = document.getElementById("navbar").offsetHeight;
                const targetPosition = aboutSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
        
        mouse.style.cursor = "pointer";
    }
}

// 3D Background Animation with Fade Effects
function initialize3DBackground() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    // Add fade-in animation to canvas
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 2s ease-in-out';
    setTimeout(() => {
        canvas.style.opacity = '1';
    }, 500);

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle3D {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * 1000;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.vz = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = `rgba(0, 237, 238, ${this.opacity})`;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.z += this.vz;

            // 3D perspective calculation
            const scale = 500 / (500 + this.z);
            this.screenX = this.x * scale + canvas.width / 2;
            this.screenY = this.y * scale + canvas.height / 2;
            this.screenSize = this.size * scale;

            // Reset particles that are too far
            if (this.z > 1000 || this.z < -500) {
                this.z = -500;
                this.x = (Math.random() - 0.5) * canvas.width;
                this.y = (Math.random() - 0.5) * canvas.height;
            }

            // Wrap around edges
            if (this.x < -canvas.width / 2) this.x = canvas.width / 2;
            if (this.x > canvas.width / 2) this.x = -canvas.width / 2;
            if (this.y < -canvas.height / 2) this.y = canvas.height / 2;
            if (this.y > canvas.height / 2) this.y = -canvas.height / 2;
        }

        draw() {
            // Ensure screenSize is positive to avoid radius errors
            const radius = Math.max(0.1, this.screenSize);
            
            ctx.beginPath();
            ctx.arc(this.screenX, this.screenY, radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Add glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00EDEE";
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function createParticles() {
        particles = [];
        const particleCount = Math.min(100, Math.floor(canvas.width / 15));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle3D());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].screenX - particles[j].screenX;
                const dy = particles[i].screenY - particles[j].screenY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].screenX, particles[i].screenY);
                    ctx.lineTo(particles[j].screenX, particles[j].screenY);
                    ctx.strokeStyle = `rgba(0, 237, 238, ${0.1 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.fillStyle = "rgba(10, 10, 15, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        animationId = requestAnimationFrame(animate);
    }

    createParticles();
    animate();
}

// Enhanced Neural Network Animation
function initializeNeuralNetwork() {
    const neuralNetwork = document.querySelector(".neural-network-3d");
    if (!neuralNetwork) return;

    const nodes = document.querySelectorAll(".node");
    const svg = document.querySelector(".connections-svg");

    // Create connections between layers
    function createConnections() {
        const inputNodes = document.querySelectorAll('[data-layer="input"]');
        const hiddenNodes = document.querySelectorAll('[data-layer="hidden"]');
        const outputNodes = document.querySelectorAll('[data-layer="output"]');

        let connections = "";

        // Input to hidden connections
        inputNodes.forEach((inputNode, i) => {
            hiddenNodes.forEach((hiddenNode, j) => {
                const inputRect = inputNode.getBoundingClientRect();
                const hiddenRect = hiddenNode.getBoundingClientRect();
                const svgRect = svg.getBoundingClientRect();

                const x1 = inputRect.left + inputRect.width / 2 - svgRect.left;
                const y1 = inputRect.top + inputRect.height / 2 - svgRect.top;
                const x2 = hiddenRect.left + hiddenRect.width / 2 - svgRect.left;
                const y2 = hiddenRect.top + hiddenRect.height / 2 - svgRect.top;

                connections += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                    stroke="rgba(0, 237, 238, 0.3)" stroke-width="1" 
                    class="connection-line" data-delay="${(i + j) * 100}"/>`;
            });
        });

        // Hidden to output connections
        hiddenNodes.forEach((hiddenNode, i) => {
            outputNodes.forEach((outputNode, j) => {
                const hiddenRect = hiddenNode.getBoundingClientRect();
                const outputRect = outputNode.getBoundingClientRect();
                const svgRect = svg.getBoundingClientRect();

                const x1 = hiddenRect.left + hiddenRect.width / 2 - svgRect.left;
                const y1 = hiddenRect.top + hiddenRect.height / 2 - svgRect.top;
                const x2 = outputRect.left + outputRect.width / 2 - svgRect.left;
                const y2 = outputRect.top + outputRect.height / 2 - svgRect.top;

                connections += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                    stroke="rgba(0, 237, 238, 0.3)" stroke-width="1" 
                    class="connection-line" data-delay="${(i + j + 10) * 100}"/>`;
            });
        });

        svg.innerHTML = connections;
    }

    function startNeuralAnimation() {
        createConnections();

        // Animate connections
        const connectionLines = document.querySelectorAll(".connection-line");
        connectionLines.forEach((line, index) => {
            const delay = parseInt(line.getAttribute("data-delay"));
            setTimeout(() => {
                line.style.stroke = "rgba(0, 237, 238, 0.6)";
                line.style.strokeWidth = "2";

                setTimeout(() => {
                    line.style.stroke = "rgba(0, 237, 238, 0.3)";
                    line.style.strokeWidth = "1";
                }, 500);
            }, delay);
        });

        // Animate nodes
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.transform = "scale(1.2)";
                node.style.boxShadow = "0 0 30px rgba(0, 237, 238, 0.8)";

                setTimeout(() => {
                    node.style.transform = "scale(1)";
                    node.style.boxShadow = "0 0 20px rgba(0, 237, 238, 0.6)";
                }, 300);
            }, index * 100);
        });
    }

    // Trigger animation on scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startNeuralAnimation();
                    setInterval(startNeuralAnimation, 5000); // Repeat every 5 seconds
                }
            });
        },
        { threshold: 0.5 },
    );

    observer.observe(neuralNetwork);
}

// Enhanced Chat System
function initializeChatSystem() {
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const chatMessages = document.getElementById("chat-messages");
    const typingIndicator = document.getElementById("typing-indicator");
    const clearChatBtn = document.querySelector(".clear-chat");

    let isTyping = false;

    // Enable/disable send button based on input
    chatInput.addEventListener("input", function () {
        sendBtn.disabled = this.value.trim() === "" || isTyping;
    });

    // Send message on Enter key
    chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && !e.shiftKey && !isTyping) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Send button click
    sendBtn.addEventListener("click", sendMessage);

    // Clear chat functionality
    clearChatBtn.addEventListener("click", clearChat);

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message || isTyping) return;

        // Add user message
        addMessage(message, "user");
        chatInput.value = "";
        sendBtn.disabled = true;
        isTyping = true;

        // Show typing indicator
        showTypingIndicator();

        try {
            // Call the local backend API
            const response = await fetch(
                `/api/chat?text=${encodeURIComponent(message)}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();

            if (data.success && data.result && data.result.prompt) {
                // Simulate typing delay for more natural feel
                setTimeout(
                    () => {
                        hideTypingIndicator();
                        addMessage(data.result.prompt, "bot");
                        isTyping = false;
                        sendBtn.disabled = chatInput.value.trim() === "";
                    },
                    800 + Math.random() * 1200, // Random delay between 0.8-2 seconds
                );
            } else {
                throw new Error("API response error or invalid format");
            }
        } catch (error) {
            console.error("AI API Error:", error);
            // Fallback to local responses with enhanced error handling
            const fallbackResponse = generateFallbackResponse(message);
            setTimeout(() => {
                hideTypingIndicator();
                addMessage(fallbackResponse, "bot");
                isTyping = false;
                sendBtn.disabled = chatInput.value.trim() === "";
                
                // Add a subtle indicator that this is a fallback response
                const lastMessage = chatMessages.lastElementChild;
                if (lastMessage) {
                    const statusIndicator = document.createElement("div");
                    statusIndicator.style.cssText = `
                        font-size: 0.7rem;
                        color: var(--text-muted);
                        opacity: 0.6;
                        margin-top: 0.3rem;
                        font-style: italic;
                    `;
                    statusIndicator.textContent = "• Offline response";
                    lastMessage.querySelector(".message-content").appendChild(statusIndicator);
                }
            }, 1000);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement("div");
        avatar.className = "message-avatar";
        avatar.innerHTML = sender === "bot" ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        const content = document.createElement("div");
        content.className = "message-content";

        const messageText = document.createElement("p");
        messageText.textContent = text;

        const timestamp = document.createElement("div");
        timestamp.className = "message-time";
        timestamp.textContent = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        content.appendChild(messageText);
        content.appendChild(timestamp);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Animate message appearance
        messageDiv.style.opacity = "0";
        messageDiv.style.transform = "translateY(20px)";
        setTimeout(() => {
            messageDiv.style.opacity = "1";
            messageDiv.style.transform = "translateY(0)";
        }, 10);
    }

    function showTypingIndicator() {
        typingIndicator.classList.add("show");
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        typingIndicator.classList.remove("show");
    }

    function generateFallbackResponse(message) {
        const responses = {
            hello: "Hello! I'm your AI assistant. How can I help you explore the fascinating world of artificial intelligence?",
            ai: "Artificial Intelligence is revolutionizing our world by enabling machines to learn, reason, and make decisions. It's transforming industries from healthcare to transportation.",
            "machine learning": "Machine Learning is a subset of AI that allows systems to learn and improve from experience without being explicitly programmed. It powers everything from recommendation systems to autonomous vehicles.",
            future: "The future of AI is incredibly exciting! We're moving towards more intelligent automation, personalized experiences, and AI-human collaboration that will solve complex global challenges.",
            help: "I'm here to help you understand AI and its applications! Feel free to ask me about artificial intelligence, machine learning, neural networks, or any technology topics.",
            default: "That's an interesting question! AI technology continues to evolve rapidly, opening new possibilities for innovation and problem-solving across countless industries.",
        };

        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        return responses.default;
    }

    function clearChat() {
        const userMessages = chatMessages.querySelectorAll(".user-message");
        userMessages.forEach((msg) => msg.remove());

        // Keep the welcome message
        const botMessages = chatMessages.querySelectorAll(".bot-message");
        if (botMessages.length > 1) {
            for (let i = 1; i < botMessages.length; i++) {
                botMessages[i].remove();
            }
        }
    }
}

// Stats Counter Animation
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number");

    function animateCounter(element) {
        const target = parseInt(element.getAttribute("data-count"));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(1) + "K+";
            } else {
                element.textContent = Math.floor(current) + (target === 99 ? "%" : "+");
            }
        }, 16);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector(".stat-number");
                    if (statNumber && !statNumber.classList.contains("animated")) {
                        statNumber.classList.add("animated");
                        animateCounter(statNumber);
                    }
                }
            });
        },
        { threshold: 0.5 },
    );

    document.querySelectorAll(".stat-item").forEach((stat) => {
        observer.observe(stat);
    });
}

// 3D Tilt Effects
function initializeTiltEffects() {
    const tiltElements = document.querySelectorAll("[data-tilt]");

    tiltElements.forEach((element) => {
        element.addEventListener("mouseenter", function () {
            this.style.transformStyle = "preserve-3d";
        });

        element.addEventListener("mousemove", function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener("mouseleave", function () {
            this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    });
}

// Enhanced Particle System
function initializeParticleSystem() {
    const heroParticles = document.getElementById("hero-particles");
    if (!heroParticles) return;

    function createParticle() {
        const particle = document.createElement("div");
        particle.className = "hero-particle";
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 237, 238, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float-up 4s linear infinite;
            left: ${Math.random() * 100}%;
            top: 100%;
            box-shadow: 0 0 10px rgba(0, 237, 238, 0.8);
        `;

        heroParticles.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 4000);
    }

    // Create particles periodically
    setInterval(createParticle, 300);

    // Add CSS for particle animation
    if (!document.getElementById("particle-styles")) {
        const style = document.createElement("style");
        style.id = "particle-styles";
        style.textContent = `
            @keyframes float-up {
                0% {
                    transform: translateY(0) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-300px) scale(1);
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-600px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Utility Functions
function scrollToChat() {
    document.getElementById("chat").scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
}

function clearChat() {
    const chatMessages = document.getElementById("chat-messages");
    const userMessages = chatMessages.querySelectorAll(".user-message");
    userMessages.forEach((msg) => msg.remove());

    // Keep the welcome message
    const botMessages = chatMessages.querySelectorAll(".bot-message");
    if (botMessages.length > 1) {
        for (let i = 1; i < botMessages.length; i++) {
            botMessages[i].remove();
        }
    }
}

// Contact Form Enhancement
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Message Sent!</span>';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
});

// Performance optimization
window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Lazy load images and optimize performance
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove("lazy");
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll("img[data-src]").forEach((img) => {
            imageObserver.observe(img);
        });
    }
});



// Enhanced AI Tools Tabs System
function initializeAIToolsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const toolContents = document.querySelectorAll('.ai-tool-content');
    
    if (!tabBtns.length || !toolContents.length) return;
    
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            tabBtns.forEach(tab => tab.classList.remove('active'));
            toolContents.forEach(content => {
                content.classList.remove('active');
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content with animation
            const targetTab = this.getAttribute('data-tab');
            const targetContent = document.getElementById(`${targetTab}-tab`);
            
            if (targetContent) {
                setTimeout(() => {
                    targetContent.classList.add('active');
                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    });
}

// Enhanced Image Generation System
function initializeImageGeneration() {
    const imagePrompt = document.getElementById('image-prompt');
    const generateImageBtn = document.getElementById('generate-image-btn');
    const imageResult = document.getElementById('image-result');
    const ghibliPrompt = document.getElementById('ghibli-prompt');
    const generateGhibliBtn = document.getElementById('generate-ghibli-btn');
    const ghibliResult = document.getElementById('ghibli-result');
    
    // Image Generator
    if (generateImageBtn && imagePrompt && imageResult) {
        generateImageBtn.addEventListener('click', async function() {
            const prompt = imagePrompt.value.trim();
            if (!prompt) {
                showNotification('Please enter a description for the image', 'warning');
                return;
            }
            
            generateImageBtn.disabled = true;
            generateImageBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            
            // Add loading animation to result container
            imageResult.innerHTML = `
                <div class="generation-loading">
                    <div class="loading-spinner"></div>
                    <p>Creating your image...</p>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                </div>
            `;
            
            try {
                // Simulate API call with enhanced feedback
                await simulateImageGeneration(imageResult, prompt, 'general');
            } catch (error) {
                console.error('Image generation error:', error);
                showGenerationError(imageResult, 'Failed to generate image. Please try again.');
            } finally {
                generateImageBtn.disabled = false;
                generateImageBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Image';
            }
        });
    }
    
    // Ghibli Generator
    if (generateGhibliBtn && ghibliPrompt && ghibliResult) {
        generateGhibliBtn.addEventListener('click', async function() {
            const prompt = ghibliPrompt.value.trim();
            if (!prompt) {
                showNotification('Please enter a description for your Ghibli artwork', 'warning');
                return;
            }
            
            generateGhibliBtn.disabled = true;
            generateGhibliBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Art...';
            
            ghibliResult.innerHTML = `
                <div class="generation-loading ghibli-loading">
                    <div class="magical-spinner">
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                    </div>
                    <p>Crafting Ghibli magic...</p>
                    <div class="progress-bar ghibli-progress">
                        <div class="progress-fill"></div>
                    </div>
                </div>
            `;
            
            try {
                await simulateImageGeneration(ghibliResult, prompt, 'ghibli');
            } catch (error) {
                console.error('Ghibli generation error:', error);
                showGenerationError(ghibliResult, 'Failed to create Ghibli artwork. Please try again.');
            } finally {
                generateGhibliBtn.disabled = false;
                generateGhibliBtn.innerHTML = '<i class="fas fa-sparkles"></i> Create Ghibli Art';
            }
        });
    }
}

// Enhanced Image Generation Simulation
async function simulateImageGeneration(resultContainer, prompt, style = 'general') {
    const steps = [
        { text: 'Analyzing prompt...', progress: 20 },
        { text: 'Initializing AI model...', progress: 40 },
        { text: 'Generating image...', progress: 70 },
        { text: 'Applying final touches...', progress: 90 },
        { text: 'Complete!', progress: 100 }
    ];
    
    const progressFill = resultContainer.querySelector('.progress-fill');
    const statusText = resultContainer.querySelector('p');
    
    for (let step of steps) {
        if (statusText) statusText.textContent = step.text;
        if (progressFill) {
            progressFill.style.width = `${step.progress}%`;
            progressFill.style.background = step.progress === 100 ? 
                'linear-gradient(90deg, #4CAF50, #45a049)' : 
                'linear-gradient(90deg, var(--primary-cyan), var(--primary-blue))';
        }
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    }
    
    // Generate placeholder image with style-specific content
    const imageContent = generatePlaceholderImage(prompt, style);
    resultContainer.innerHTML = imageContent;
    
    // Add success animation
    const imageElement = resultContainer.querySelector('.generated-image-container');
    if (imageElement) {
        imageElement.style.opacity = '0';
        imageElement.style.transform = 'scale(0.8)';
        setTimeout(() => {
            imageElement.style.opacity = '1';
            imageElement.style.transform = 'scale(1)';
        }, 100);
    }
}

// Enhanced Placeholder Image Generator
function generatePlaceholderImage(prompt, style) {
    const styleClass = style === 'ghibli' ? 'ghibli-style' : 'general-style';
    const backgroundColor = style === 'ghibli' ? 
        'linear-gradient(135deg, #87CEEB, #98FB98, #F0E68C)' : 
        'linear-gradient(135deg, var(--primary-cyan), var(--primary-blue))';
    
    return `
        <div class="generated-image-container ${styleClass}">
            <div class="image-placeholder-generated" style="background: ${backgroundColor};">
                <div class="image-overlay">
                    <i class="fas fa-${style === 'ghibli' ? 'tree' : 'image'} image-icon"></i>
                    <h4>Generated: ${style === 'ghibli' ? 'Ghibli Style' : 'AI Art'}</h4>
                    <p class="prompt-display">"${prompt.length > 50 ? prompt.substring(0, 50) + '...' : prompt}"</p>
                    <div class="image-actions">
                        <button class="action-btn download-btn">
                            <i class="fas fa-download"></i> Download
                        </button>
                        <button class="action-btn regenerate-btn">
                            <i class="fas fa-redo"></i> Regenerate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function showGenerationError(container, message) {
    container.innerHTML = `
        <div class="generation-error">
            <i class="fas fa-exclamation-triangle error-icon"></i>
            <h4>Generation Failed</h4>
            <p>${message}</p>
            <button class="retry-btn" onclick="this.closest('.ai-tool-content').querySelector('.generate-btn').click()">
                <i class="fas fa-redo"></i> Try Again
            </button>
        </div>
    `;
}

// Enhanced Floating Elements Animation
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-cube, .floating-sphere');
    
    floatingElements.forEach((element, index) => {
        // Add mouse interaction
        element.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2) rotateY(45deg)';
            this.style.opacity = '0.3';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
            this.style.opacity = '0.1';
        });
        
        // Add random movement variation
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
    });
}

// Enhanced Particle Cursor Trail
function initializeCursorParticles() {
    let particles = [];
    let mouse = { x: 0, y: 0 };
    
    document.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        // Create particle on mouse move with throttling
        if (Math.random() > 0.8) {
            createCursorParticle(mouse.x, mouse.y);
        }
    });
    
    function createCursorParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: var(--primary-cyan);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.8;
            animation: cursorParticleFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        setTimeout(() => {
            particle.remove();
            particles = particles.filter(p => p !== particle);
        }, 1000);
    }
    
    // Add CSS animation for cursor particles
    if (!document.getElementById('cursor-particle-styles')) {
        const style = document.createElement('style');
        style.id = 'cursor-particle-styles';
        style.textContent = `
            @keyframes cursorParticleFade {
                0% {
                    transform: scale(1) translate(0, 0);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(0) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Card Hover Effects
function initializeEnhancedCardEffects() {
    const cards = document.querySelectorAll('.news-card, .showcase-card, .feature-card');
    
    cards.forEach(card => {
        let isHovering = false;
        
        card.addEventListener('mouseenter', function() {
            isHovering = true;
            this.style.transform = 'translateY(-10px) rotateX(5deg) scale(1.02)';
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'card-ripple';
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(0, 237, 238, 0.1) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: rippleEffect 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        card.addEventListener('mouseleave', function() {
            isHovering = false;
            this.style.transform = '';
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            if (!isHovering) return;
            
            this.style.transform = 'translateY(-10px) rotateX(5deg) scale(0.98)';
            setTimeout(() => {
                if (isHovering) {
                    this.style.transform = 'translateY(-10px) rotateX(5deg) scale(1.02)';
                }
            }, 150);
        });
    });
    
    // Add ripple effect CSS
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes rippleEffect {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Button Interactions
function initializeEnhancedButtons() {
    const buttons = document.querySelectorAll('.btn, .demo-btn, .read-more-btn, .generate-btn');
    
    buttons.forEach(button => {
        // Add magnetic effect
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add click wave effect
        button.addEventListener('click', function(e) {
            const wave = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            wave.style.cssText = `
                position: absolute;
                top: ${y}px;
                left: ${x}px;
                width: 0;
                height: 0;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: clickWave 0.5s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(wave);
            
            setTimeout(() => wave.remove(), 500);
        });
    });
    
    // Add click wave CSS
    if (!document.getElementById('click-wave-styles')) {
        const style = document.createElement('style');
        style.id = 'click-wave-styles';
        style.textContent = `
            @keyframes clickWave {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Scroll Reveal Animations
function initializeScrollRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('visible');
                
                // Add staggered animation for child elements
                const children = element.querySelectorAll('.feature-card, .news-card, .showcase-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                });
                
                // Trigger particle burst for special sections
                if (element.classList.contains('hero') || element.classList.contains('showcase')) {
                    createParticleBurst(element);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in, .section-header, .hero-content').forEach(el => {
        observer.observe(el);
    });
}

// Particle Burst Effect
function createParticleBurst(container) {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = 100 + Math.random() * 100;
            
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 4px;
                height: 4px;
                background: var(--primary-cyan);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: particleBurst 2s ease-out forwards;
            `;
            
            particle.style.setProperty('--dx', `${Math.cos(angle) * velocity}px`);
            particle.style.setProperty('--dy', `${Math.sin(angle) * velocity}px`);
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 2000);
        }, i * 50);
    }
    
    // Add particle burst CSS
    if (!document.getElementById('particle-burst-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-burst-styles';
        style.textContent = `
            @keyframes particleBurst {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--dx), var(--dy)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements and process steps
document.querySelectorAll('.fade-in, .process-step').forEach(el => {
    observer.observe(el);
});
// AI GIF Gallery Controls
function initializeGIFControls() {
    const gifButtons = document.querySelectorAll('.gif-btn');
    const mainGifWrapper = document.querySelector('.main-gif');
    const gifShowcase = document.querySelector('.gif-showcase');
    
    if (!gifButtons.length || !mainGifWrapper) return;
    
    // GIF categories with different AI-related GIFs
    const gifCategories = {
        neural: {
            src: 'https://media.giphy.com/media/3o7qDSOvfaCO9b3MlO/giphy.gif',
            title: 'Neural Network Learning',
            description: 'Watch AI neurons process and learn from data patterns in real-time'
        },
        vision: {
            src: 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
            title: 'Computer Vision Analysis',
            description: 'See how AI systems recognize and analyze visual information'
        },
        nlp: {
            src: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
            title: 'Natural Language Processing',
            description: 'Experience how AI understands and generates human language'
        }
    };
    
    // Alternative GIF sources (fallbacks)
    const fallbackGifs = {
        neural: [
            'https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif',
            'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif'
        ],
        vision: [
            'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
            'https://media.giphy.com/media/l46CDHTqbmnGZyxKo/giphy.gif'
        ],
        nlp: [
            'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
            'https://media.giphy.com/media/3o7qDSOvfaCO9b3MlO/giphy.gif'
        ]
    };
    
    function updateMainGif(category) {
        const gifData = gifCategories[category];
        const mainImg = mainGifWrapper.querySelector('img');
        const overlay = mainGifWrapper.querySelector('.gif-overlay');
        const gifInfo = overlay.querySelector('.gif-info');
        
        if (!mainImg || !gifInfo) return;
        
        // Add loading state
        mainGifWrapper.classList.add('loading');
        
        // Create new image element to test loading
        const newImg = new Image();
        newImg.onload = function() {
            // Update main image
            mainImg.src = gifData.src;
            mainImg.alt = gifData.title;
            
            // Update overlay information
            const title = gifInfo.querySelector('h5');
            const description = gifInfo.querySelector('p');
            
            if (title) title.textContent = gifData.title;
            if (description) description.textContent = gifData.description;
            
            // Remove loading state
            mainGifWrapper.classList.remove('loading');
            
            // Add animation
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.style.opacity = '1';
            }, 100);
        };
        
        newImg.onerror = function() {
            // Try fallback GIFs
            const fallbacks = fallbackGifs[category];
            if (fallbacks && fallbacks.length > 0) {
                const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
                newImg.src = randomFallback;
            } else {
                mainGifWrapper.classList.remove('loading');
                console.warn('Failed to load GIF for category:', category);
            }
        };
        
        newImg.src = gifData.src;
    }
    
    function setActiveButton(activeBtn) {
        gifButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = '';
        });
        
        activeBtn.classList.add('active');
        activeBtn.style.transform = 'translateY(-2px) scale(1.05)';
        
        // Add ripple effect
        createButtonRipple(activeBtn);
    }
    
    function createButtonRipple(button) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(0, 237, 238, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: buttonRipple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    // Add button event listeners
    gifButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-gif');
            
            if (!category || !gifCategories[category]) return;
            
            setActiveButton(this);
            updateMainGif(category);
            
            // Update showcase data attribute
            if (gifShowcase) {
                gifShowcase.setAttribute('data-category', category);
            }
            
            // Add visual feedback
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }, 150);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
    
    // Initialize with first category
    const firstButton = document.querySelector('.gif-btn[data-gif="neural"]');
    if (firstButton) {
        updateMainGif('neural');
    }
    
    // Add CSS for button ripple animation
    if (!document.getElementById('gif-controls-styles')) {
        const style = document.createElement('style');
        style.id = 'gif-controls-styles';
        style.textContent = `
            @keyframes buttonRipple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced GIF Grid Interactions
function initializeGIFGrid() {
    const gifItems = document.querySelectorAll('.gif-item');
    
    gifItems.forEach((item, index) => {
        // Add click functionality to switch main GIF
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gif-caption');
            const mainImg = document.querySelector('.main-gif img');
            const mainOverlay = document.querySelector('.main-gif .gif-info');
            
            if (!img || !mainImg) return;
            
            // Swap GIFs with animation
            const tempSrc = mainImg.src;
            const tempAlt = mainImg.alt;
            
            // Animate transition
            mainImg.style.opacity = '0.5';
            img.style.opacity = '0.5';
            
            setTimeout(() => {
                mainImg.src = img.src;
                mainImg.alt = img.alt;
                img.src = tempSrc;
                img.alt = tempAlt;
                
                // Update overlay if caption exists
                if (caption && mainOverlay) {
                    const title = mainOverlay.querySelector('h5');
                    if (title) title.textContent = caption.textContent;
                }
                
                // Restore opacity
                mainImg.style.opacity = '1';
                img.style.opacity = '1';
            }, 300);
            
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add intersection observer for lazy loading
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target.querySelector('img');
                    if (img && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });
}

// Auto-play GIF rotation (optional)
function initializeGIFAutoRotation() {
    const buttons = document.querySelectorAll('.gif-btn');
    let currentIndex = 0;
    let autoRotateInterval;
    
    function startAutoRotation() {
        autoRotateInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % buttons.length;
            buttons[currentIndex].click();
        }, 8000); // Change every 8 seconds
    }
    
    function stopAutoRotation() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
        }
    }
    
    // Start auto-rotation after initial load
    setTimeout(startAutoRotation, 3000);
    
    // Stop auto-rotation when user interacts
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            stopAutoRotation();
            // Restart after 10 seconds of inactivity
            setTimeout(startAutoRotation, 10000);
        });
    });
    
    // Pause on hover
    const gifContainer = document.querySelector('.gif-container');
    if (gifContainer) {
        gifContainer.addEventListener('mouseenter', stopAutoRotation);
        gifContainer.addEventListener('mouseleave', () => {
            setTimeout(startAutoRotation, 2000);
        });
    }
}

// Performance optimization for GI
// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize new features
    initializeAIToolsTabs();
    initializeImageGeneration();
    initializeFloatingElements();
    initializeCursorParticles();
    initializeEnhancedCardEffects();
    initializeEnhancedButtons();
    initializeScrollRevealAnimations();
    initializeGIFAutoRotation();
    initializeGIFGrid();
    initializeGIFControls();
    
});
