// Hàm hỗ trợ kiểm tra độ dài dữ liệu (Đặt bên ngoài)
function validateInputLength(str, min, max) {
    return str.length >= min && str.length <= max;
}

// Xử lý sự kiện click sao chép Email
document.getElementById('email-btn').addEventListener('click', function(e) {
    e.preventDefault(); 
    const emailAddress = 'johnyduong.vn@gmail.com';
    
    navigator.clipboard.writeText(emailAddress).then(() => {
        const originalText = this.innerText;
        this.innerText = 'Copied! ✓';
        this.style.backgroundColor = '#10b981'; 
        this.style.borderColor = '#10b981';
        this.style.color = '#ffffff';
        
        setTimeout(() => {
            this.innerText = originalText;
            this.style.backgroundColor = ''; 
            this.style.borderColor = '';
            this.style.color = '';
        }, 2000);
    }).catch(err => {
        alert('My email: ' + emailAddress);
    });
});

// Xử lý sự kiện Slider di chuyển bài viết Blog
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const container = document.querySelector('.carousel-container');
    
    let currentIndex = 0;
    let autoPlayTimer;

    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function moveToNextSlide() {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateSlidePosition();
    }

    function moveToPrevSlide() {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateSlidePosition();
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(moveToNextSlide, 8000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    if(nextButton) nextButton.addEventListener('click', () => { stopAutoPlay(); moveToNextSlide(); startAutoPlay(); });
    if(prevButton) prevButton.addEventListener('click', () => { stopAutoPlay(); moveToPrevSlide(); startAutoPlay(); });
    if(container) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
});

// Xử lý sự kiện gửi Form liên hệ (Contact Form)
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Lấy các ô nhập liệu
        const nameInput = contactForm.querySelector('[name="name"]');
        const emailInput = contactForm.querySelector('[name="email"]');
        const messageInput = contactForm.querySelector('[name="message"]');
        const apiKeyInput = contactForm.querySelector('[name="access_key"]');
        const submitBtn = contactForm.querySelector('.btn-submit');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        const dateStr = new Date().toLocaleString("vi-VN", { hour: '2-digit', minute:'2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });

        // === 1. KIỂM TRA ĐỘ DÀI DỮ LIỆU TRƯỚC TIÊN ===
        if (!validateInputLength(message, 10, 5000)) {
            alert("Lời nhắn quá ngắn (dưới 10 ký tự) hoặc quá dài (trên 5000 ký tự)! Vui lòng bổ sung thêm thông tin.");
            return; // Dừng lại tại đây khi nút gửi CHƯA bị khóa
        }

        // === 2. KIỂM TRA TOKEN HCAPTCHA ===
        const hCaptchaInput = contactForm.querySelector('[name="h-captcha-response"]');
        const hCaptchaToken = hCaptchaInput ? hCaptchaInput.value : "";

        if (hCaptchaInput && !hCaptchaToken) {
            alert("Vui lòng tích chọn ô xác thực 'Tôi không phải là robot' trước khi gửi tin nhắn!");
            return; 
        }

        // === 3. KIỂM TRA ACCESS KEY ===
        if (!apiKeyInput || apiKeyInput.value.trim() === "") {
            alert("Lỗi hệ thống: Vui lòng cấu hình Access Key Web3Forms chính xác!");
            return;
        }

        // === 4. KHÓA NÚT BẤM VÀ ĐỔI TRẠNG THÁI ===
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "Đang gửi đi... ⏳";
        submitBtn.disabled = true;

        // === 5. ĐÓNG GÓI VÀ BẮN EMAIL ===
        const formData = new FormData();
        formData.append("access_key", apiKeyInput.value);
        formData.append("from_name", "DongDev Portfolio");
        formData.append("subject", `📩 Tin nhắn mới từ khách xem Web: ${name}`);
        
        if (hCaptchaToken) {
            formData.append("h-captcha-response", hCaptchaToken);
        }

        formData.append("Ten nguoi gui", name);
        formData.append("Email lien he", email || 'Không để lại email');
        formData.append("Loi nhan", message);
        formData.append("Thoi gian gui", dateStr);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Cảm ơn bạn! Tin nhắn đã được gửi thành công đến DongDev. 🚀");
                contactForm.reset();
                if (typeof hcaptcha !== 'undefined') {
                    hcaptcha.reset(); 
                }
            } else {
                alert("Gửi tin nhắn thất bại: " + data.message);
            }
        })
        .catch(error => {
            alert("Không thể kết nối internet. Vui lòng kiểm tra lại mạng!");
        })
        .finally(() => {
            // Luôn mở khóa nút bấm khi có kết quả trả về từ server
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

// Chống Clickjacking
if (window.self !== window.top) {
    window.top.location = window.self.location;
}

// ==========================================
// 🤖 CẤU HÌNH MINI AI CHATBOT (GEMINI API)
// ==========================================

const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSendBtn = document.getElementById('chatbot-send-btn');

// Bật / Ẩn cửa sổ chat
if (chatbotToggleBtn) {
    chatbotToggleBtn.addEventListener('click', () => chatbotWindow.classList.toggle('hidden'));
}
if (chatbotCloseBtn) {
    chatbotCloseBtn.addEventListener('click', () => chatbotWindow.classList.add('hidden'));
}

// Hàm thêm tin nhắn vào màn hình chat
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-msg' : 'bot-msg');
    msgDiv.innerText = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Tự cuộn xuống cuối
    return msgDiv;
}

// Hàm gọi API Gemini
// script/index.js

// URL nội bộ của Netlify tự động nhận diện khi deploy
const NETLIFY_FUNCTION_URL = "/.netlify/functions/gemini";

async function askGemini(userMessage) {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'loading-msg');
    loadingDiv.innerText = "Trợ lý đang gõ... ⏳";
    chatbotMessages.appendChild(loadingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    try {
        // Gọi lên Serverless Function của bạn thay vì gọi trực tiếp Google
        const response = await fetch(NETLIFY_FUNCTION_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }) // Chỉ bắn tin nhắn lên, không kèm Key
        });

        const data = await response.json();
        loadingDiv.remove();

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let reply = data.candidates[0].content.parts[0].text;
            appendMessage(reply, 'bot');
        } else {
            appendMessage("Huhu, hệ thống đang bận một chút, bạn thử lại sau giây lát nhé!", 'bot');
        }
    } catch (error) {
        console.error("Lỗi Chatbot:", error);
        loadingDiv.remove();
        appendMessage("Không thể kết nối với trí tuệ nhân tạo. Hãy kiểm tra mạng mạng nè!", 'bot');
    }
}

// Xử lý gửi tin nhắn
function handleChatSubmit() {
    const text = chatbotInput.value.trim();
    if (!text) return;

    // ========================================================
    // 🛡️ CHẶN RATE LIMIT: GIỚI HẠN 10 CÂU CHAT / NGÀY TẠI LOCAL
    // ========================================================
    const MAX_CHATS_PER_DAY = 10;
    const todayStr = new Date().toDateString(); // Định dạng chuỗi ngày cố định (VD: "Tue Jun 09 2026")
    
    let savedDate = localStorage.getItem('chatbot_chat_date');
    let currentChatCount = parseInt(localStorage.getItem('chatbot_chat_count')) || 0;

    // Kiểm tra xem có phải ngày mới hoàn toàn không
    if (savedDate !== todayStr) {
        // Nếu qua ngày mới, đặt lại ngày hôm nay và reset bộ đếm về 0
        localStorage.setItem('chatbot_chat_date', todayStr);
        currentChatCount = 0;
        localStorage.setItem('chatbot_chat_count', currentChatCount);
    }

    // Nếu đã chạm hoặc vượt ngưỡng giới hạn trong ngày
    if (currentChatCount >= MAX_CHATS_PER_DAY) {
        appendMessage("Trợ lý của DongDev tạm thời bận rồi. Hãy quay lại vào ngày mai, hoặc liên hệ trực tiếp với DongDev qua email johnyduong.vn@gmail.com nhé! 🚀", 'bot');
        chatbotInput.value = ''; // Xóa sạch dữ liệu trong ô nhập
        return; // Ngăn chặn không cho thực thi tiếp
    }

    // Cập nhật tăng số lượt chat lên 1 đơn vị và lưu lại
    localStorage.setItem('chatbot_chat_count', currentChatCount + 1);
    // ========================================================

    appendMessage(text, 'user');
    chatbotInput.value = ''; // Xóa ô nhập
    
    askGemini(text); // Gửi sang AI xử lý
}

if (chatbotSendBtn && chatbotInput) {
    chatbotSendBtn.addEventListener('click', handleChatSubmit);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSubmit();
    });
}

// ==========================================
// ☀️ THEME TOGGLE (LIGHT / DARK MODE)
// ==========================================

const themeToggleBtn = document.getElementById('theme-toggle-btn');
const currentTheme = localStorage.getItem('theme');

// 1. Kiểm tra xem lần trước người dùng có chọn Dark Mode không
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.innerText = '☀️'; // Đổi icon sang mặt trời nếu là chế độ tối
}

// 2. Lắng nghe sự kiện click vào nút đổi giao diện
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        // Toggle class "dark-mode" ở thẻ <body>
        document.body.classList.toggle('dark-mode');
        
        let theme = 'light';
        // Nếu body đang có class dark-mode
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
            themeToggleBtn.innerText = '☀️'; // Gợi ý bấm để chuyển sang Sáng
        } else {
            themeToggleBtn.innerText = '🌙'; // Gợi ý bấm để chuyển sang Tối
        }
        
        // Lưu lựa chọn vào localStorage để lần sau vào web không bị mất
        localStorage.setItem('theme', theme);
    });
}