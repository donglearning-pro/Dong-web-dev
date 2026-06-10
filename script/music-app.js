// ========================================================
// 📦 KHO DỮ LIỆU NHẠC ĐA VŨ TRỤ CỦA DONGDEV
// ========================================================
const songDatabase = [
    {
        title: "Memory Reboot",
        artist: "VØJ, Narvent",
        source: "Inspired by Blade Runner 2049",
        category: "cyberpunk",
        tags: ["Synthwave", "Retrowave", "Cyberpunk", "Phonk", "Cinematic"],
        cover: "../assets/musics-materials/music-cover/bladerunner.webp",
        audioSrc: "../assets/musics-materials/Memory_Reboot.mp3",
        story: "Trời sinh một cặp với siêu phẩm điện ảnh Blade Runner 2049. Giai điệu này tôn lên trọn vẹn vẻ đẹp công nghệ cô độc cùng sự u ám, ngột ngạt của một thế giới phát triển quá mức."
    },
    {
        title: "I Really Want to Stay at Your House (Samuel Kim Remix)",
        artist: "Rosa Walton & Samuel Kim",
        source: "Cyberpunk: Edgerunners OST",
        category: "cyberpunk",
        tags: ["Synth-Pop", "Indie Electro", "Anime OST"],
        cover: "../assets/musics-materials/music-cover/edgerunner.webp",
        audioSrc: "../assets/musics-materials/Samuel_Kim_Lorien_-_I_Really_Want_to_Stay_at_Your_House_(mp3.pm).mp3",
        story: "Đoạn kết đầy nước mắt của anime Cyberpunk: Edgerunners. Bản remix của Samuel Kim bớt đi sự kịch tính dồn dập nhưng lại thêm nhiều phần sâu lắng, xúc động. Nhớ phân cảnh Lucy hôn David lúc cậu đang phát điên vì cyberpsycho, phục hồi lý trí mà chẳng cần thuốc an thần... Cuối phim David ra đi dưới tay Adam Smasher, còn Lucy chỉ biết ôm ký ức đau thương trên Mặt Trăng."
    },
    {
        title: "Wildfire",
        artist: "HOYO-MiX (ft. Jonathan Steingard)",
        source: "Honkai Star Rail (Cocolia Boss Fight)",
        category: "gaming",
        tags: ["Progressive Metal", "Hard Rock", "Electronic", "Game OST"],
        cover: "../assets/musics-materials/music-cover/wildfire.webp",
        audioSrc: "../assets/musics-materials/Wildfire.mp3",
        story: "Quả nhạc cực cháy trong màn đấu boss Cocolia! Là một dân cày F2P chính hiệu, lúc tuyệt vọng nhất trước con boss máu trâu dame cao thì giai điệu này vang lên làm sôi sục ý chí: 'Còn thở là còn gỡ!'. Dù giờ đã bỏ gacha nhưng vẫn nghiện giọng hát đỉnh cao của Jonathan Steingard."
    },
    {
        title: "Out of Control",
        artist: "Zebrahead x MAN WITH A MISSION",
        source: "Jujutsu Kaisen (Culling Game AMV)",
        category: "anime-rock",
        tags: ["Pop Punk", "Alternative Rock", "Rap Rock", "J-Rock"],
        cover: "../assets/musics-materials/music-cover/okkotsu-yuta.webp",
        audioSrc: "../assets/musics-materials/Zebrahead_MAN_WITH_A_MISSION_-_Out_of_Control_(mp3.pm).mp3",
        story: "Bài này phải nói là bá cháy bọ chét! Sự kết hợp hoàn hảo giữa năng lượng Pop-Punk Mỹ và Rock Nhật Bản. Đặc biệt khi lồng vào video AMV trận chiến Culling Game của YouTuber NinjaristicNinja thì độ mãn nhãn xX10 lần. Không xem AMV đó thì đúng là bỏ lỡ một siêu phẩm."
    }
];

// ========================================================
// 🛠️ HÀM KHỞI CHẠY VÀ HIỂN THỊ GIAO DIỆN
// ========================================================
document.addEventListener('DOMContentLoaded', function () {

    let currentSongIndex = 0;

    // ── [1] Xóa trắng cover khi mới vào trang ──────────────
    // ✅ Đúng chỗ: nằm ở đây, chạy 1 lần duy nhất khi tải trang
    document.getElementById('playerCover').src = '';

    // ── [2] Setup Story Panel Toggle ───────────────────────
    // ✅ Đúng chỗ: nằm ở đây, đăng ký event 1 lần duy nhất
    const storySlidePanel = document.getElementById('storySlidePanel');
    const storyPanelContent = document.getElementById('storyPanelContent');
    const storyToggleBtn = document.getElementById('storyToggleBtn');
    const storyCloseBtn = document.getElementById('storyCloseBtn');

    storyToggleBtn?.addEventListener('click', () => {
        storySlidePanel.classList.toggle('visible');
    });
    storyCloseBtn?.addEventListener('click', () => {
        storySlidePanel.classList.remove('visible');
    });

    // --- Render nhạc ra màn hình ---
    function renderSongs(categoryFilter = "all") {
        const musicGrid = document.getElementById('musicGrid');
        if (!musicGrid) return;
        musicGrid.innerHTML = "";

        songDatabase.forEach(song => {
            if (categoryFilter !== "all" && song.category !== categoryFilter) return;

            const tagsHTML = song.tags.map(tag => `<span class="card-tag">#${tag}</span>`).join('');
            const card = document.createElement('div');
            card.className = 'music-card';
            card.innerHTML = `
                <div class="card-img-wrap">
                    <img src="${song.cover}" alt="${song.title}" loading="lazy">
                    <div class="play-overlay">▶</div>
                </div>
                <h3>${song.title}</h3>
                <p class="card-artist">${song.artist}</p>
                <p class="card-source">💿 ${song.source}</p>
                <div class="tags-container">${tagsHTML}</div>
            `;
            card.addEventListener('click', () => playTrack(song));
            musicGrid.appendChild(card);
        });
    }

    // --- [3] Phát bài hát (1 hàm duy nhất, không lồng) ---
    function playTrack(song) {
        currentSongIndex = songDatabase.findIndex(s => s.title === song.title);

        // Gán cover, title, artist
        document.getElementById('playerCover').src = song.cover;
        document.getElementById('playerTitle').innerText = song.title;
        document.getElementById('playerArtist').innerText = song.artist;

        // Phát nhạc
        const audio = document.getElementById('mainAudio');
        audio.src = song.audioSrc;
        document.getElementById('masterPlayBtn').innerText = "⏸";
        audio.play().catch(err => console.log("Chờ kích hoạt phát nhạc..."));

        // Cập nhật story trên desktop
        const storyBox = document.getElementById('playerStory');
        if (storyBox) {
            storyBox.style.opacity = 0;
            setTimeout(() => {
                storyBox.innerHTML = `<blockquote>"${song.story}"</blockquote>`;
                storyBox.style.opacity = 1;
            }, 200);
        }

        // ✅ Cập nhật story cho mobile panel (dùng biến đã khai báo ở trên)
        if (storyPanelContent) {
            storyPanelContent.innerHTML = `<blockquote>"${song.story}"</blockquote>`;
        }
    }

    // --- Hàm format thời gian ---
    function formatTime(time) {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // --- Lấy các phần tử Player ---
    const audio = document.getElementById('mainAudio');
    const masterPlayBtn = document.getElementById('masterPlayBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const totalDurationEl = document.getElementById('totalDuration');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!audio || !masterPlayBtn) return;

    // 1. Nút Play/Pause
    masterPlayBtn.addEventListener('click', () => {
        if (!audio.src || audio.src === window.location.href) {
            playTrack(songDatabase[0]);
            return;
        }
        if (audio.paused) {
            audio.play();
            masterPlayBtn.innerText = "⏸";
        } else {
            audio.pause();
            masterPlayBtn.innerText = "▶";
        }
    });

    // 2. Cập nhật thanh tiến trình
    audio.addEventListener('timeupdate', () => {
        const { duration, currentTime } = audio;
        if (!duration) return;
        progressBar.style.width = `${(currentTime / duration) * 100}%`;
        currentTimeEl.innerText = formatTime(currentTime);
    });

    // 3. Hiển thị tổng thời gian
    audio.addEventListener('loadeddata', () => {
        totalDurationEl.innerText = formatTime(audio.duration);
    });

    // 4. Tua nhạc khi click vào progress bar
    progressContainer.addEventListener('click', (e) => {
        const duration = audio.duration;
        if (duration) {
            audio.currentTime = (e.offsetX / progressContainer.clientWidth) * duration;
        }
    });

    // 5. Nút Next
    nextBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songDatabase.length;
        playTrack(songDatabase[currentSongIndex]);
    });

    // 6. Nút Prev
    prevBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songDatabase.length) % songDatabase.length;
        playTrack(songDatabase[currentSongIndex]);
    });

    // 7. Tự chuyển bài khi hết
    audio.addEventListener('ended', () => {
        nextBtn.click();
    });

    // --- Filter tab Sidebar ---
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelector('.filter-btn.active')?.classList.remove('active');
            e.target.classList.add('active');
            renderSongs(e.target.getAttribute('data-category'));
        });
    });

    // Mặc định tải tất cả bài hát
    renderSongs('all');
});