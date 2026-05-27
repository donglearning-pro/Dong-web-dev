function copyArticleLink() {
                const currentUrl = window.location.href;
                navigator.clipboard.writeText(currentUrl).then(() => {
                    const btn = document.getElementById('copyLinkBtn');
                    const btnText = document.getElementById('btnText');
                    
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

// --- XỬ LÝ HỆ THỐNG BÌNH LUẬN LOCALSTORAGE TỰ ĐỘNG ---
document.addEventListener("DOMContentLoaded", function () {
    const commentForm = document.getElementById("commentForm");
    
    // Nếu trang hiện tại không có form comment (trang chủ chẳng hạn) thì dừng script
    if (!commentForm) return;

    // Lấy ID duy nhất của bài viết dựa vào tên file HTML trên URL để tránh lẫn lộn comment giữa các bài
    const blogId = window.location.pathname.split("/").pop() || "default-blog";
    
    const commentsList = document.getElementById("commentsList");
    const commentCount = document.getElementById("commentCount");

    // Hàm load và hiển thị bình luận
    function loadComments() {
        let comments = JSON.parse(localStorage.getItem(`comments_${blogId}`)) || [];
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

    // Xử lý sự kiện gửi form
    commentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("commentName");
        const emailInput = document.getElementById("commentEmail");
        const contentInput = document.getElementById("commentContent");
        const apiKeyInput = document.getElementById("web3FormsKey"); // Lấy token ẩn

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const content = contentInput.value.trim();
        const blogId = window.location.pathname.split("/").pop() || "default-blog";
        const dateStr = new Date().toLocaleString("vi-VN", { hour: '2-digit', minute:'2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });

        // 1. VẪN LƯU VÀO LOCALSTORAGE ĐỂ HIỂN THỊ TRÊN WEB NHƯ CŨ
        const newComment = { name, email, content, date: dateStr };
        let comments = JSON.parse(localStorage.getItem(`comments_${blogId}`)) || [];
        comments.push(newComment);
        localStorage.setItem(`comments_${blogId}`, JSON.stringify(comments));

        // 2. 🚀 BẮN EMAIL THẦN TỐC VỀ ĐIỆN THOẠI CỦA ÔNG VỚI FETCH API
        // SỬA LẠI DÒNG NÀY: Chỉ cần check xem apiKeyInput có giá trị là gửi luôn
        if (apiKeyInput && apiKeyInput.value.trim() !== "") {
            // Tạo payload chuẩn cấu trúc của Web3Forms
            // Thay thế đoạn formData cũ bằng đoạn này cho khỏi lỗi font email:
            const formData = new FormData();
            formData.append("access_key", apiKeyInput.value);
            formData.append("from_name", "Dong's Blog Notifier");
            formData.append("subject", `💬 Bình luận mới từ bài viết: ${blogId}`);

            // Sửa Key thành không dấu để Web3Forms render chuẩn format
            formData.append("Nguoi_Gui", `${name} (${email || 'Không để lại email'})`);
            formData.append("Noi_Dung_Cam_Nhan", content);
            formData.append("Thoi_Gian", dateStr);
            // Gửi ngầm qua API
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

        // Reset form và cập nhật lại giao diện hiển thị ngay tức thì
        commentForm.reset();
        loadComments();
    });

    // Hàm chống mã độc XSS bảo vệ an toàn cho trang web
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    // Chạy tải bình luận ngay khi vào trang
    loadComments();
});