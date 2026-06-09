// ==========================================
// 🛠️ HÀM HỖ TRỢ TOÀN CỤC (GLOBAL FUNCTIONS)
// ==========================================

// Hàm hỗ trợ kiểm tra độ dài dữ liệu
function validateInputLength(str, min, max) {
    return str.length >= min && str.length <= max;
}

// Bắt sự kiện cuộn trang
window.addEventListener('scroll', function() {
    // Lấy vị trí đang cuộn hiện tại
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    
    // Lấy tổng chiều cao của trang trừ đi chiều cao của màn hình hiển thị
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Tính toán tỷ lệ phần trăm
    let scrolled = (winScroll / height) * 100;
    
    // Cập nhật độ rộng (width) cho thanh tiến trình
    document.getElementById("readingProgressBar").style.width = scrolled + "%";
});

// Xử lý sự kiện click sao chép link bài viết
function copyArticleLink() {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
        const btn = document.getElementById('copyLinkBtn');
        const btnText = document.getElementById('btnText');
        
        if (!btn || !btnText) return;

        // Thêm class biến đổi style và đổi text
        btn.classList.add('copied');
        btnText.innerText = 'Copied to Clipboard!';
        
        // Sau 2 giây quay về trạng thái cũ
        setTimeout(() => {
            btn.classList.remove('copied');
            btnText.innerText = 'Copy Article Link';
        }, 2000);
    }).catch(err => {
        console.error('Không thể copy link: ', err);
    });
}

// Hàm chống mã độc XSS bảo vệ an toàn cho bình luận
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// ==========================================
// 🚀 KHỞI CHẠY KHI GIAO DIỆN (DOM) ĐÃ SẴN SÀNG
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    
    /* --------------------------------------
       ☀️ PHẦN 1: THEME TOGGLE (LIGHT / DARK MODE)
       -------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const currentTheme = localStorage.getItem('theme');

    // Kiểm tra và áp dụng theme đã lưu từ lần trước
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggleBtn) themeToggleBtn.innerText = '☀️';
    } else {
        if (themeToggleBtn) themeToggleBtn.innerText = '🌙';
    }

    // Lắng nghe sự kiện click đổi giao diện
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            let theme = 'light';
            if (document.body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeToggleBtn.innerText = '☀️'; 
            } else {
                themeToggleBtn.innerText = '🌙'; 
            }
            
            // Lưu trạng thái vào localStorage
            localStorage.setItem('theme', theme);
        });
    }

    /* --------------------------------------
       💬 PHẦN 2: HỆ THỐNG BÌNH LUẬN LOCALSTORAGE
       -------------------------------------- */
    const commentForm = document.getElementById("commentForm");
    
    // Nếu trang hiện tại không có form comment (ví dụ: trang chủ) thì không chạy đoạn dưới
    if (!commentForm) return;

    const blogId = window.location.pathname.split("/").pop() || "default-blog";
    const commentsList = document.getElementById("commentsList");
    const commentCount = document.getElementById("commentCount");

    // Hàm load và hiển thị bình luận
    function loadComments() {
        let comments = JSON.parse(localStorage.getItem(`comments_${blogId}`)) || [];
        if (!commentsList || !commentCount) return;

        commentsList.innerHTML = "";
        commentCount.innerText = comments.length;

        if (comments.length === 0) {
            commentsList.innerHTML = `<p style="color: #9ca3af; font-style: italic;">Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm nghĩ!</p>`;
            return;
        }

        // Hiện những bình luận mới nhất lên đầu tiên
        comments.reverse().forEach(comment => {
            const card = document.createElement("div");
            card.className = "comment-card";
            card.innerHTML = `
                <div class="comment-card-header">
                    <span class="comment-author">👤 ${escapeHTML(comment.name)}</span>
                    <span class="comment-time">${comment.date}</span>
                </div>
                <div class="comment-body">${escapeHTML(comment.content)}</div>
            `;
            commentsList.appendChild(card);
        });
    }

    // Xử lý gửi bình luận
    commentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("commentName");
        const emailInput = document.getElementById("commentEmail");
        const contentInput = document.getElementById("commentContent");
        const apiKeyInput = document.getElementById("web3FormsKey");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const content = contentInput.value.trim();
        const dateStr = new Date().toLocaleString("vi-VN", { hour: '2-digit', minute:'2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });

        // Kiểm tra độ dài
        if (!validateInputLength(content, 10, 5000)) {
            alert("Lời nhắn quá ngắn (dưới 10 ký tự) hoặc quá dài (trên 5000 ký tự)!");
            return; 
        }

        // Kiểm tra mã xác thực hCaptcha
        const hCaptchaInput = commentForm.querySelector('[name="h-captcha-response"]');
        const hCaptchaToken = hCaptchaInput ? hCaptchaInput.value : "";

        if (!hCaptchaToken) {
            alert("Vui lòng tích chọn ô xác thực 'Tôi không phải là robot' trước khi gửi!");
            return; 
        }

        // Lưu vào LocalStorage
        const newComment = { name, email, content, date: dateStr };
        let comments = JSON.parse(localStorage.getItem(`comments_${blogId}`)) || [];
        comments.push(newComment);
        localStorage.setItem(`comments_${blogId}`, JSON.stringify(comments));

        // Bắn email thông báo qua Web3Forms
        if (apiKeyInput && apiKeyInput.value.trim() !== "") {
            const formData = new FormData();
            formData.append("access_key", apiKeyInput.value);
            formData.append("from_name", "Dong's Blog Notifier");
            formData.append("subject", `💬 Bình luận mới từ bài viết: ${blogId}`);
            formData.append("h-captcha-response", hCaptchaToken);
            formData.append("Nguoi_Gui", `${name} (${email || 'Không để lại email'})`);
            formData.append("Noi_Dung_Cam_Nhan", content);
            formData.append("Thoi_Gian", dateStr);

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    console.log("Email thông báo đã gửi thành công!");
                } else {
                    console.error("Web3Forms báo lỗi:", data.message);
                }
            })
            .catch(error => console.error("Lỗi kết nối mạng:", error));
        }

        // Reset form & hCaptcha
        commentForm.reset();
        if (typeof hcaptcha !== 'undefined') {
            hcaptcha.reset(); 
        }

        loadComments();
    });

    // Tự động tải bình luận khi vào trang bài viết
    loadComments();
});

// ========================================================
// 🎵 PHẦN 3: ĐIỀU KHIỂN TRÌNH PHÁT NHẠC (CÓ BỌC CHỐNG LỖI)
// ========================================================
const musicToggleBtn = document.getElementById('musicToggleBtn');
const musicPlayerBox = document.getElementById('musicPlayerBox');
const minimizeMusicBtn = document.getElementById('minimizeMusicBtn');

// Chỉ chạy nếu trang đó có tồn tại khung nhạc (Tránh lỗi sập script ở trang chủ)
if (musicToggleBtn && musicPlayerBox && minimizeMusicBtn) {
    musicToggleBtn.addEventListener('click', function() {
        musicPlayerBox.classList.remove('hidden');
        musicToggleBtn.style.display = 'none';
    });

    minimizeMusicBtn.addEventListener('click', function() {
        musicPlayerBox.classList.add('hidden');
        musicToggleBtn.style.display = 'flex';
    });
}

/* ========================================================
   ⏱️ HÀM TỰ ĐỘNG TÍNH THỜI GIAN ĐỌC BÀI (READING TIME)
======================================================== */
document.addEventListener('DOMContentLoaded', function() {
    
    const WORDS_PER_MINUTE = 230;
    // ĐỒNG NHẤT: Hãy chắc chắn các trang con dùng class này để bọc nội dung bài viết
    const CONTENT_CLASS = '.article-content'; 

    // --- TRƯỜNG HỢP 1: NGƯỜI DÙNG ĐANG Ở TRANG CON ---
    const blogContent = document.querySelector(CONTENT_CLASS);
    const localReadTime = document.querySelector('.article-header .read-time'); 

    if (blogContent && localReadTime) {
        const text = blogContent.innerText || blogContent.textContent;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        const readingTime = Math.ceil(words / WORDS_PER_MINUTE);
        
        localReadTime.innerHTML = `⏱️ ${readingTime} min read`;
    }


    // --- TRƯỜNG HỢP 2: NGƯỜI DÙNG ĐANG Ở TRANG CHÍNH ---
    // Gộp cả bài viết nổi bật (.featured-content) và bài viết thường (.post-data)
    const blogCards = document.querySelectorAll('.post-data, .featured-content'); 

    if (blogCards.length > 0) {
        blogCards.forEach(async (card) => {
            const linkElement = card.querySelector('a'); 
            const timeTarget = card.querySelector('.read-time'); 

            if (linkElement && timeTarget) {
                const postLink = linkElement.getAttribute('href');
                
                // Bỏ qua nếu là link trống hoặc link hashtag tránh lỗi loop fetch
                if (!postLink || postLink === '#' || postLink === '') {
                    timeTarget.innerHTML = `⏱️ -- min read`;
                    return;
                }
                
                try {
                    const response = await fetch(postLink);
                    if (!response.ok) throw new Error("Không tải được trang");
                    const htmlText = await response.text();
                    
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlText, 'text/html');
                    
                    // Tìm chính xác theo CONTENT_CLASS đã đồng nhất ở trên
                    const article = doc.querySelector(CONTENT_CLASS);
                    if (article) {
                        const text = article.innerText || article.textContent;
                        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
                        const readingTime = Math.ceil(words / WORDS_PER_MINUTE);
                        
                        timeTarget.innerHTML = `⏱️ ${readingTime} min read`;
                    } else {
                        // Nếu trang con chưa đổi class hoặc trống chữ
                        timeTarget.innerHTML = `⏱️ 2 phút đọc`; 
                    }
                } catch (error) {
                    console.error("Lỗi tính thời gian cho bài: " + postLink);
                }
            }
        });
    }
});

// Chống tấn công Clickjacking
if (window.self !== window.top) {
    window.top.location = window.self.location;
}