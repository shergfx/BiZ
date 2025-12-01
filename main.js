let currentUser = null;
let discussions = [];
let courses = [];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    checkUserLogin();
    loadUserData();
});

// Initialize application
function initializeApp() {
    console.log('BIZ Platform initialized');
    
    // Initialize animations
    initAnimations();
    
    // Initialize charts if ECharts is available
    if (typeof echarts !== 'undefined') {
        initCharts();
    }
    
    // Initialize local storage
    initLocalStorage();
}

// Check if user is logged in
function checkUserLogin() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (!userLoggedIn && window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
        window.location.href = 'index.html';
    }
}

// Initialize local storage data
function initLocalStorage() {
    // Initialize user data if not exists
    if (!localStorage.getItem('userProgress')) {
        const defaultProgress = {
            videoEditing: { progress: 23, completedLessons: 3, totalLessons: 25 },
            graphicDesign: { progress: 45, completedLessons: 9, totalLessons: 30 },
            trading: { progress: 67, completedLessons: 8, totalLessons: 20 },
            smm: { progress: 78, completedLessons: 14, totalLessons: 35 }
        };
        localStorage.setItem('userProgress', JSON.stringify(defaultProgress));
    }
    
    // Initialize forum discussions if not exists
    if (!localStorage.getItem('forumDiscussions')) {
        const defaultDiscussions = [
            {
                id: 1,
                title: "Qaysi video montaj dasturi boshlang'ichlar uchun optimal?",
                author: "Ali Shermatov",
                category: "Video montaj",
                time: "2 soat oldin",
                content: "Video montajni o'rganishni boshlamoqchiman, lekin qaysi dasturni tanlashni bilmayapman...",
                likes: 15,
                dislikes: 2,
                replies: 23,
                repliesData: [
                    {
                        author: "Diyorbek Kurbanov",
                        time: "1 soat oldin",
                        content: "Men boshlaganlarida DaVinci Resolve tanlaganman. Bepul va professional imkoniyatlarga ega."
                    }
                ]
            }
        ];
        localStorage.setItem('forumDiscussions', JSON.stringify(defaultDiscussions));
    }
}

// Load user data
function loadUserData() {
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    const userDiscussions = JSON.parse(localStorage.getItem('forumDiscussions') || '[]');
    
    // Update progress bars
    updateProgressBars(userProgress);
    
    // Update discussion counts
    updateDiscussionCounts(userDiscussions);
}

// Initialize animations
function initAnimations() {
    // AOS (Animate On Scroll) initialization
    if (typeof anime !== 'undefined') {
        // Animate elements on page load
        anime({
            targets: '.hero-title',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutQuad',
            delay: 200
        });
        
        // Animate cards
        anime({
            targets: '.lesson-card, .direction-card, .discussion-card',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutQuad',
            delay: anime.stagger(100)
        });
    }
}

// Initialize charts
function initCharts() {
    // Initialize progress chart if container exists
    const progressChart = document.getElementById('progress-chart');
    if (progressChart) {
        initProgressChart();
    }
    
    // Initialize analytics chart if container exists
    const analyticsChart = document.getElementById('analytics-chart');
    if (analyticsChart) {
        initAnalyticsChart();
    }
}

// Initialize progress chart
function initProgressChart() {
    const chart = echarts.init(document.getElementById('progress-chart'));
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Video Montaj', 'Grafik Dizayn', 'Treyding', 'SMM']
        },
        series: [
            {
                name: 'Progress',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: { show: false },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                data: [
                    {value: userProgress.videoEditing?.progress || 23, name: 'Video Montaj', itemStyle: {color: '#EF4444'}},
                    {value: userProgress.graphicDesign?.progress || 45, name: 'Grafik Dizayn', itemStyle: {color: '#8B5CF6'}},
                    {value: userProgress.trading?.progress || 67, name: 'Treyding', itemStyle: {color: '#10B981'}},
                    {value: userProgress.smm?.progress || 78, name: 'SMM', itemStyle: {color: '#3B82F6'}}
                ]
            }
        ]
    };
    
    chart.setOption(option);
}

// Initialize analytics chart
function initAnalyticsChart() {
    const chart = echarts.init(document.getElementById('analytics-chart'));
    
    const option = {
        title: {
            text: 'SMM Trenderi 2025',
            left: 'center',
            textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' }
        },
        legend: {
            data: ['Instagram', 'TikTok', 'YouTube', 'Telegram'],
            bottom: 10
        },
        xAxis: {
            type: 'category',
            data: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun']
        },
        yAxis: {
            type: 'value',
            name: 'Engagement Rate (%)'
        },
        series: [
            {
                name: 'Instagram',
                type: 'line',
                data: [4.2, 4.5, 4.8, 5.1, 5.3, 5.6],
                smooth: true,
                lineStyle: { color: '#8B5CF6' }
            },
            {
                name: 'TikTok',
                type: 'line',
                data: [6.8, 7.2, 7.5, 8.1, 8.4, 8.9],
                smooth: true,
                lineStyle: { color: '#3B82F6' }
            },
            {
                name: 'YouTube',
                type: 'line',
                data: [2.1, 2.3, 2.4, 2.6, 2.8, 3.0],
                smooth: true,
                lineStyle: { color: '#EF4444' }
            },
            {
                name: 'Telegram',
                type: 'line',
                data: [3.5, 3.7, 3.9, 4.0, 4.2, 4.4],
                smooth: true,
                lineStyle: { color: '#10B981' }
            }
        ]
    };
    
    chart.setOption(option);
}

// Update progress bars
function updateProgressBars(progress) {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        if (width) {
            anime({
                targets: bar,
                width: width,
                duration: 1000,
                easing: 'easeOutQuad'
            });
        }
    });
}

// Update discussion counts
function updateDiscussionCounts(discussions) {
    // Update discussion counts in the UI
    const discussionElements = document.querySelectorAll('[data-discussion-count]');
    discussionElements.forEach(element => {
        element.textContent = discussions.length;
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-black' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Noto\'g\'ri email formati');
    }
    
    if (!formData.password || formData.password.length < 6) {
        errors.push('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
    }
    
    return errors;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Local storage helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('LocalStorage saqlashda xatolik:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('LocalStorage o\'qishda xatolik:', error);
        return null;
    }
}

// API simulation functions
function simulateLogin(email, password) {
    if (!email || !password) {
        alert('Iltimos, email va parolni kiriting.');
        return Promise.reject(new Error('Email yoki parol kiritilmagan.'));
    }

    // Haqiqiy API chaqiruvi (login.php ga)
    return new Promise((resolve, reject) => {
        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // PHPdan kelgan muvaffaqiyatli javob
                localStorage.setItem('userData', JSON.stringify({ email, password }));
                resolve(data);
            } else {
                // PHPdan kelgan xatolik haqidagi xabar
                reject(new Error(data.message));
            }
        })
        .catch(error => {
            // Tarmoq xatoligi yoki fetch muvaffaqiyatsizligi
            reject(new Error('Server bilan aloqada xatolik yuz berdi.'));
        });
    });
}

function simulateRegistration(userData) {
    // Simulate API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userData.email && userData.password.length >= 6) {
                resolve({
                    success: true,
                    user: {
                        id: Date.now(),
                        email: userData.email,
                        name: userData.name || 'Foydalanuvchi'
                    },
                    token: 'fake-jwt-token'
                });
            } else {
                reject(new Error('Registratsiyada xatolik'));
            }
        }, 1000);
    });
}

// Export functions for global use
window.BIZ = {
    showNotification,
    validateForm,
    isValidEmail,
    saveToLocalStorage,
    getFromLocalStorage,
    simulateLogin,
    simulateRegistration
};

// Global functions for HTML onclick handlers
window.logout = function() {
    localStorage.removeItem('userLoggedIn');
    window.location.href = 'index.html';
};

window.continueLearning = function() {
    showNotification('Keyingi darsga o\'tish!', 'success');
};

window.viewCertificates = function() {
    showNotification('Sertifikatlar sahifasiga o\'tish!', 'info');
};

window.viewAllCertificates = function() {
    showNotification('Barcha sertifikatlarni ko\'rish!', 'info');
};

window.calculateRisk = function() {
    const accountBalance = parseFloat(document.getElementById('accountBalance')?.value) || 10000;
    const riskPercent = parseFloat(document.getElementById('riskPercent')?.value) || 2;
    const stopLoss = parseFloat(document.getElementById('stopLoss')?.value) || 50;

    const riskAmount = accountBalance * (riskPercent / 100);
    const lotSize = riskAmount / (stopLoss * 10);
    const pipValue = riskAmount / stopLoss;

    const riskAmountEl = document.getElementById('riskAmount');
    const lotSizeEl = document.getElementById('lotSize');
    const pipValueEl = document.getElementById('pipValue');

    if (riskAmountEl) riskAmountEl.textContent = `$${riskAmount.toFixed(0)}`;
    if (lotSizeEl) lotSizeEl.textContent = lotSize.toFixed(2);
    if (pipValueEl) pipValueEl.textContent = `$${pipValue.toFixed(2)}`;
};

console.log('BIZ Platform JavaScript loaded successfully!');