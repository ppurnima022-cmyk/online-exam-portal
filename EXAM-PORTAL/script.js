// Global utility functions and shared functionality

// Show success message
function showSuccessMessage(message) {
    showMessage(message, 'success');
}

// Show error message
function showErrorMessage(message) {
    showMessage(message, 'error');
}

// Show message helper
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // Add to page
    document.body.appendChild(messageElement);
    
    // Remove after 4 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 4000);
}

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format time helper
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Generate random ID
function generateId(prefix = 'ID') {
    return prefix + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Local Storage helpers
const Storage = {
    // Get data from localStorage
    get: function(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },
    
    // Set data to localStorage
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },
    
    // Remove data from localStorage
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },
    
    // Clear all localStorage data
    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

// User management
const UserManager = {
    // Get current logged-in user
    getCurrentUser: function() {
        return Storage.get('currentUser');
    },
    
    // Set current user (login)
    login: function(user) {
        Storage.set('currentUser', user);
        this.updateLoginState();
    },
    
    // Logout current user
    logout: function() {
        Storage.remove('currentUser');
        this.updateLoginState();
        window.location.href = 'index.html';
    },
    
    // Update login state in navigation
    updateLoginState: function() {
        const currentUser = this.getCurrentUser();
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (logoutBtn) {
            if (currentUser) {
                logoutBtn.style.display = 'block';
                logoutBtn.textContent = `Logout (${currentUser.name})`;
            } else {
                logoutBtn.style.display = 'none';
            }
        }
    },
    
    // Check if user is logged in
    isLoggedIn: function() {
        return this.getCurrentUser() !== null;
    },
    
    // Redirect to login if not authenticated
    requireAuth: function(redirectUrl = 'login.html') {
        if (!this.isLoggedIn()) {
            showErrorMessage('Please login to access this page.');
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 2000);
            return false;
        }
        return true;
    }
};

// Test management
const TestManager = {
    // Get all test results
    getAllResults: function() {
        return Storage.get('testResults', []);
    },
    
    // Get results for specific user
    getUserResults: function(userId) {
        const allResults = this.getAllResults();
        return allResults.filter(result => result.studentId === userId);
    },
    
    // Save test result
    saveResult: function(result) {
        const results = this.getAllResults();
        results.push({
            ...result,
            id: generateId('TEST'),
            date: new Date().toISOString()
        });
        Storage.set('testResults', results);
    },
    
    // Get test statistics for user
    getUserStats: function(userId) {
        const results = this.getUserResults(userId);
        
        if (results.length === 0) {
            return {
                totalTests: 0,
                averageScore: 0,
                bestScore: 0,
                totalTime: 0
            };
        }
        
        const totalScore = results.reduce((sum, result) => sum + result.percentage, 0);
        const totalTime = results.reduce((sum, result) => sum + result.timeUsed, 0);
        
        return {
            totalTests: results.length,
            averageScore: Math.round(totalScore / results.length),
            bestScore: Math.max(...results.map(r => r.percentage)),
            totalTime: totalTime
        };
    }
};

// Registration management
const RegistrationManager = {
    // Get all registrations
    getAllRegistrations: function() {
        return Storage.get('testRegistrations', []);
    },
    
    // Get registrations for specific user
    getUserRegistrations: function(userId) {
        const allRegistrations = this.getAllRegistrations();
        return allRegistrations.filter(reg => reg.studentId === userId);
    },
    
    // Save registration
    saveRegistration: function(registration) {
        const registrations = this.getAllRegistrations();
        registrations.push({
            ...registration,
            id: generateId('REG'),
            registrationDate: new Date().toISOString()
        });
        Storage.set('testRegistrations', registrations);
    },
    
    // Check if user is registered for a test
    isRegistered: function(userId, testName) {
        const userRegistrations = this.getUserRegistrations(userId);
        return userRegistrations.some(reg => reg.testName === testName);
    }
};

// Form validation utilities
const FormValidator = {
    // Validate required fields
    validateRequired: function(fields) {
        const errors = [];
        
        fields.forEach(field => {
            const element = document.getElementById(field.id) || document.querySelector(`[name="${field.name}"]`);
            if (!element || !element.value.trim()) {
                errors.push(field.message || `${field.name} is required`);
            }
        });
        
        return errors;
    },
    
    // Validate email
    validateEmail: function(email) {
        return isValidEmail(email);
    },
    
    // Show validation errors
    showErrors: function(errors) {
        if (errors.length > 0) {
            showErrorMessage(errors.join(', '));
            return false;
        }
        return true;
    }
};

// Initialize common functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Update login state
    UserManager.updateLoginState();
    
    // Add logout functionality if logout button exists
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            UserManager.logout();
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states to buttons on form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;
                
                // Re-enable after 2 seconds (in case form doesn't redirect)
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.dashboard-card, .feature-card, .rules-card, .result-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Utility functions for animations
const AnimationUtils = {
    // Fade in element
    fadeIn: function(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    },
    
    // Fade out element
    fadeOut: function(element, duration = 300) {
        let start = performance.now();
        const startOpacity = parseFloat(getComputedStyle(element).opacity);
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = startOpacity * (1 - progress);
            
            if (progress >= 1) {
                element.style.display = 'none';
            } else {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    },
    
    // Slide up element
    slideUp: function(element, duration = 300) {
        const height = element.offsetHeight;
        element.style.height = height + 'px';
        element.style.overflow = 'hidden';
        
        let start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.height = (height * (1 - progress)) + 'px';
            
            if (progress >= 1) {
                element.style.display = 'none';
                element.style.height = '';
                element.style.overflow = '';
            } else {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
};

// Performance monitoring
const PerformanceMonitor = {
    // Log page load time
    logPageLoad: function() {
        window.addEventListener('load', function() {
            const loadTime = performance.now();
            console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        });
    },
    
    // Log function execution time
    timeFunction: function(fn, name) {
        return function(...args) {
            const start = performance.now();
            const result = fn.apply(this, args);
            const end = performance.now();
            console.log(`${name} executed in ${Math.round(end - start)}ms`);
            return result;
        };
    }
};

// Initialize performance monitoring
PerformanceMonitor.logPageLoad();

// Export functions for use in other scripts
window.ExamPortal = {
    UserManager,
    TestManager,
    RegistrationManager,
    FormValidator,
    Storage,
    AnimationUtils,
    showSuccessMessage,
    showErrorMessage,
    formatDate,
    formatTime,
    isValidEmail,
    generateId
};