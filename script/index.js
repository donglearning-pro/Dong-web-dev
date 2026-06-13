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
// 🤖 CẤU HÌNH MINI AI CHATBOT (BẢN SỬA LỖI FINAL)
// ==========================================

const NETLIFY_FUNCTION_URL = "/.netlify/functions/gemini";
const MODEL_FALLBACK_CHAIN = ["gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-3.5-flash"];

// 1. Khai báo các biến ở phạm vi TOÀN CỤC để mọi hàm đều gọi được
let chatbotHistory = [];
let chatbotMessages, chatbotInput, chatbotSendBtn;

// 2. ÉP JS CHỜ HTML LOAD XONG MỚI CHẠY
document.addEventListener('DOMContentLoaded', () => {
    console.log("🧱 DOM đã tải xong! Bắt đầu khởi tạo Chatbot...");

    const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
    
    // Gán giá trị cho các biến toàn cục
    chatbotMessages = document.getElementById('chatbot-messages');
    chatbotInput = document.getElementById('chatbot-input');
    chatbotSendBtn = document.getElementById('chatbot-send-btn');

    if (!chatbotInput || !chatbotSendBtn || !chatbotMessages) {
        console.error("❌ LỖI: Không tìm thấy phần tử Chatbot trong HTML!");
        return;
    }

    // 1. Bật / Ẩn cửa sổ chat bằng nút chính (Hỏi về Đông?)
    if (chatbotToggleBtn && chatbotWindow) {
        chatbotToggleBtn.addEventListener('click', () => {
            chatbotWindow.classList.toggle('hidden');
            
            // 🚀 NẾU MỞ HỘP CHAT: Tiến hành render Turnstile ngay tại thời điểm này
            if (!chatbotWindow.classList.contains('hidden')) {
                const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
                updateTurnstileTheme(currentTheme);
            }
        });
    }

    // 2. 🚀 BỔ SUNG: Đóng cửa sổ chat khi bấm vào nút X (chatbot-close-btn)
    if (chatbotCloseBtn && chatbotWindow) {
        chatbotCloseBtn.addEventListener('click', () => {
            chatbotWindow.classList.add('hidden'); // Thêm class hidden để ẩn hộp chat đi
            console.log("🔒 Đã đóng hộp chat bằng nút X.");
        });
    }
        // Gắn sự kiện click và enter
    chatbotSendBtn.addEventListener('click', handleChatSubmit);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSubmit();
    });

    console.log("✅ Khởi tạo Chatbot thành công!");
});

// 3. Hàm in tin nhắn ra màn hình
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-msg' : 'bot-msg');
    msgDiv.innerText = text;
    
    if (chatbotMessages) {
        chatbotMessages.appendChild(msgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    return msgDiv;
}

// 4. Hàm gọi API Gemini
async function askGemini() {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'loading-msg');
    loadingDiv.innerText = "Trợ lý đang gõ... ⏳";
    chatbotMessages.appendChild(loadingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Lấy token Turnstile một cách an toàn
    let turnstileToken = "";
    try {
        turnstileToken = turnstile.getResponse(); 
    } catch (e) {
        console.warn("⚠️ Turnstile chưa sẵn sàng.");
    }

    if (!turnstileToken) {
        loadingDiv.remove();
        appendMessage("Vui lòng tích vào ô xác thực bảo mật trước khi chat nhé!", "bot");
        chatbotHistory.pop(); // Xóa câu vừa hỏi lỗi khỏi bộ nhớ AI
        return;
    }

    let finalReply = null;

    for (const modelName of MODEL_FALLBACK_CHAIN) {
        try {
            console.log(`🤖 Đang thử kết nối: ${modelName}`);
            
            const response = await fetch(NETLIFY_FUNCTION_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    contents: chatbotHistory,
                    model: modelName,
                    token: turnstileToken
                }) 
            });

            if (!response.ok) continue;

            const data = await response.json();
            if (data.candidates && data.candidates[0].content.parts[0].text) {
                finalReply = data.candidates[0].content.parts[0].text;
                break; 
            }
        } catch (error) {
            console.error(`❌ Lỗi ở model ${modelName}:`, error);
        }
    }

    loadingDiv.remove();
    
    // Reset Turnstile cho lần chat kế tiếp
    try { turnstile.reset(); } catch(e) {}

    if (finalReply) {
        appendMessage(finalReply, 'bot');
        chatbotHistory.push({ role: "model", parts: [{ text: finalReply }] });
    } else {
        appendMessage("Huhu, server AI của DongDev hiện đang quá tải. Bạn thử lại sau nhé!", 'bot');
        chatbotHistory.pop();
    }
}

// 5. Hàm xử lý khi người dùng bấm gửi
function handleChatSubmit() {
    try {
        const text = chatbotInput.value.trim();
        if (!text) return;

        const MAX_CHATS_PER_DAY = 5; 
        const todayStr = new Date().toDateString(); 
        let savedDate = localStorage.getItem('chatbot_chat_date');
        let currentChatCount = parseInt(localStorage.getItem('chatbot_chat_count')) || 0;

        if (savedDate !== todayStr) {
            localStorage.setItem('chatbot_chat_date', todayStr);
            currentChatCount = 0;
            localStorage.setItem('chatbot_chat_count', currentChatCount);
        }

        if (currentChatCount >= MAX_CHATS_PER_DAY) {
            alert("Bạn đã dùng hết lượt hỏi hôm nay. Nếu bạn muốn nói chuyện trực tiếp với Đông, hãy điền vào form feedback ở cuối trang chủ hoặc liên hệ qua email johnyduong.vn@gmail.com nhé!"); 
            return; 
        }

        localStorage.setItem('chatbot_chat_count', currentChatCount + 1);

        appendMessage(text, 'user'); 
        chatbotHistory.push({ role: "user", parts: [{ text: text }] });

        chatbotInput.value = ''; 
        askGemini();

    } catch (error) {
        console.error("❌ LỖI Ở HÀM XỬ LÝ CLICK GỬI:", error);
    }
}

// ==========================================
// ☀️ THEME TOGGLE & CLOUDFLARE TURNSTILE (BẢN DEBUG)
// ==========================================

const themeToggleBtn = document.getElementById('theme-toggle-btn');
const currentTheme = localStorage.getItem('theme') || 'light';

// Tự động kiểm tra môi trường
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const siteKey = isLocalhost ? "1x00000000000000000000AA" : "0x4AAAAAADjcauBl2brzvv7d"; 

let turnstileWidgetId = null;

console.log(`🤖 Môi trường: ${isLocalhost ? "Localhost (Dùng Key Test)" : "Web thật (Dùng Key Thật)"}`);

// 1. Khôi phục giao diện ban đầu khi load trang
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.innerText = '☀️';
}

// 2. Hàm render Turnstile thông minh
function updateTurnstileTheme(theme) {
    const chatbotWindow = document.getElementById('chatbot-window');
    
    // Kiểm tra xem hộp chat có đang bị ẩn không
    if (!chatbotWindow || chatbotWindow.classList.contains('hidden')) {
        console.log("⚠️ Kháng lệnh render: Hộp chat đang đóng.");
        return;
    }

    // Kiểm tra xem Script của Cloudflare đã tải thành công vào web chưa
    if (typeof turnstile === 'undefined') {
        console.error("❌ LỖI NGHIÊM TRỌNG: Không tìm thấy đối tượng 'turnstile'. Script của Cloudflare chưa được tải về máy (Do mất mạng hoặc sai vị trí thẻ script)!");
        return;
    }

    console.log("🔄 Đang tiến hành vẽ Widget Turnstile...");
    
    if (turnstileWidgetId !== null) {
        try { turnstile.remove(turnstileWidgetId); } catch (e) {}
    }
    
    try {
        turnstileWidgetId = turnstile.render('#turnstile-widget', {
            sitekey: siteKey,
            theme: theme
        });
        console.log(`✅ Đã nạp Turnstile thành công với giao diện: ${theme}`);
    } catch (error) {
        console.error("❌ Lỗi xảy ra trong lúc render:", error);
    }
}

// 3. Callback khi API script tải xong
window.onloadTurnstileCallback = function () {
    console.log("📡 Script Cloudflare Turnstile đã tải xong và sẵn sàng kích hoạt!");
};

// 4. Lắng nghe sự kiện click vào nút đổi giao diện
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let targetTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        themeToggleBtn.innerText = targetTheme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', targetTheme);
        updateTurnstileTheme(targetTheme);
    });
}