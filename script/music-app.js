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
        story: "Đoạn kết đầy nước mắt của anime Cyberpunk: Edgerunners. Bản remix của Samuel Kim bớt đi sự kịch tính dồn dập nhưng lại thêm many phần sâu lắng, xúc động. Nhớ phân cảnh Lucy hôn David lúc cậu đang phát điên vì cyberpsycho, phục hồi lý trí mà chẳng cần thuốc an thần... Cuối phim David ra đi dưới tay Adam Smasher, còn Lucy chỉ biết ôm ký ức đau thương trên Mặt Trăng."
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
    },
    {
        title: "Bury the Light",
        artist: "Casey Edwards (ft. Victor Borba)",
        source: "Devil May Cry 5",
        category: "gaming",
        tags: ["Game OST", "Cyber Metal", "Symphonic Metal", "Power Metal"],
        cover: "../assets/musics-materials/music-cover/vergil.webp",
        audioSrc: "../assets/musics-materials/Bury_The_Light.mp3",
        story: "I NEED MORE POWER! I NEED MOTIVATION! Nếu mà không nghe bài này thì tôi đã chẳng biết đến dòng game huyền thoại Devil May Cry. Nhân vật Vergil - anh trai Dante - lúc nào cũng cool ngầu, tràn ngập hắc khí đen tối và lạnh lùng. Anh sẵn sàng giết không nương tay, xuống địa ngục hay chia đôi linh hồn bản thân để tìm thêm sức mạnh. Dù gặp em trai là xiên, nhưng sâu xa, Vergil làm vậy vì không muốn bất lực một lần nữa, để bảo vệ những gì mình có. Mỗi lần nghe bài này là cảm thấy sức mạnh tiềm ẩn dâng trào, chực chờ phun trào như một Villain thực thụ!"
    },
    {
        title: "IRAS 17514",
        artist: "Li Jinghao x TetraCalyx",
        source: "Thus Spoke Apocalypse (Honkai Impact 3)",
        category: "gaming",
        tags: ["Vocaloid", "Orchestral", "Ballad", "Game OST"],
        cover: "../assets/musics-materials/music-cover/otto-fire.webp",
        audioSrc: "../assets/musics-materials/Iras17514.mp3",
        story: "Mặc dù là bài hát lời Tiếng Anh nhưng nghe cứ ra tiếng Trung hay cái gì đó lạ lắm. Đây là soundtrack làm nền cho cuộc chiến của Otto với quân đoàn nô lệ do Imaginary Tree tạo ra. Trận chiến vốn mãn nhãn, nay càng kịch tính nhờ có nhạc này. Vô cùng đau xót cảnh Otto bị đâm để anh cảm nhận được nỗi đau Kallen từng trải qua nhằm trả giá cho lỗi lầm. Và đoạn kết thật đau lòng, Otto viết lại số mệnh của Kallen, đổi lại linh hồn anh tan biến đúng như anh nói: 'This is the most selfish thing one can do'."
    },
    {
        title: "Regression",
        artist: "Lin Yifan x TetraCalyx (ft. Ayanga)",
        source: "Thus Spoke Apocalypse (Honkai Impact 3)",
        category: "gaming",
        tags: ["Pop", "Soundtrack", "Game OST"],
        cover: "../assets/musics-materials/music-cover/ottokallen.webp",
        audioSrc: "../assets/musics-materials/Regression.mp3",
        story: "Honkai Impact 3 mặc dù có cơ chế gacha hút máu và dàn nhân vật toàn nữ, nhưng sau khi xem AMV 'Thus Spoke Apocalypse' kể về cuộc đời đầy mâu thuẫn và hành trình chuộc lỗi, tái sinh của phản diện chính Otto Apocalypse, tôi phải công nhận plot game này đỉnh vãi. Tôi cứ bị mê các nhân vật phản diện với những mối tình tan vỡ, bị đè bẹp bởi duyên số. Otto mất Kallen, anh mất chính mình..."
    },
    {
        title: "Ichizu (One Way)",
        artist: "King Gnu",
        source: "Jujutsu Kaisen (Movie 0)",
        category: "anime-rock",
        tags: ["J-Rock", "J-Pop", "Art Rock"],
        cover: "../assets/musics-materials/music-cover/yuta.webp",
        audioSrc: "../assets/musics-materials/Ichizu.mp3",
        story: "Biết đến bài này khi xem Movie 0 của JJK. Quả nhạc thổi lửa cho trận chiến giữa Yuta (cậu bé bị Nữ hoàng chú nguyền Rika - người cậu từng yêu - ám theo) và Geto. Đọc dịch lyrics mới thấm thía từng lời, đây là lời cầu xin của Yuta cho cậu toàn bộ sức mạnh, thừa nhận tình yêu của hai người là trái độc để đánh bại số mệnh, bảo vệ những người cậu yêu thương và chuộc lỗi vì chính cậu mới là kẻ nguyền rủa cô. Cũng có người nói bài hát là về Gojo và Geto, cũng đúng, thật mong chờ những phần tiếp theo."
    }
];

// ========================================================
// 🛠️ HÀM KHỞI CHẠY VÀ HIỂN THỊ GIAO DIỆN
// ========================================================
document.addEventListener('DOMContentLoaded', function () {

    let currentSongIndex = 0;

    // ── [1] Xóa trắng cover khi mới vào trang ──────────────
    document.getElementById('playerCover').src = '';

    // ── [2] Setup Story Panel Toggle ─────────
    const storyPanel = document.getElementById('storyPanel'); 
    const storyCloseBtn = document.getElementById('storyCloseBtn');
    const storyText = document.getElementById('storyText'); // Khai báo chuẩn để tránh lỗi crash script

    // Gán sự kiện mở panel cho toàn bộ nút mang class .story-toggle-btn
    document.querySelectorAll('.story-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (storyPanel) {
                storyPanel.classList.toggle('visible');
            }
        });
    });

    // Sự kiện nút X để đóng panel
    if (storyCloseBtn) {
        storyCloseBtn.addEventListener('click', () => {
            if (storyPanel) {
                storyPanel.classList.remove('visible');
            }
        });
    }

    // --- [3] Render nhạc ra màn hình ---
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

    // --- [4] Phát bài hát & Đổi dữ liệu nội dung ---
    function playTrack(song) {
        currentSongIndex = songDatabase.findIndex(s => s.title === song.title);

        // Gán dữ liệu lên thanh điều khiển dưới bottom
        document.getElementById('playerCover').src = song.cover;
        document.getElementById('playerTitle').innerText = song.title;
        document.getElementById('playerArtist').innerText = song.artist;

        // Tiến hành phát âm thanh
        const audio = document.getElementById('mainAudio');
        audio.src = song.audioSrc;
        document.getElementById('masterPlayBtn').innerText = "⏸";
        audio.play().catch(err => console.log("Chờ người dùng tương tác để phát nhạc..."));

        // Đồng bộ hóa nội dung câu chuyện vào Story Panel tương ứng với bài hát đang chạy
        if (storyText) {
            storyText.innerHTML = song.story 
                ? song.story 
                : `Bài hát này hiện chưa có câu chuyện trải lòng nào...`;
        }
    }

    // --- Hàm định dạng thời gian bài hát ---
    function formatTime(time) {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // --- Khởi tạo các thành phần giao diện Player ---
    const audio = document.getElementById('mainAudio');
    const masterPlayBtn = document.getElementById('masterPlayBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const totalDurationEl = document.getElementById('totalDuration');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!audio || !masterPlayBtn) return;

    // 1. Logic nút Phát/Tạm dừng (Play/Pause)
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

    // 2. Đồng bộ hóa chuyển động thanh thời gian chạy nhạc
    audio.addEventListener('timeupdate', () => {
        const { duration, currentTime } = audio;
        if (!duration) return;
        progressBar.style.width = `${(currentTime / duration) * 100}%`;
        currentTimeEl.innerText = formatTime(currentTime);
    });

    // 3. Hiển thị tổng thời lượng khi tải xong file âm thanh
    audio.addEventListener('loadeddata', () => {
        totalDurationEl.innerText = formatTime(audio.duration);
    });

    // 4. Cơ chế tua nhạc trực tiếp trên thanh Progress Bar
    progressContainer.addEventListener('click', (e) => {
        const duration = audio.duration;
        if (duration) {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const newTime = (clickX / width) * duration;
            audio.currentTime = Math.max(0, Math.min(newTime, duration));
        }
    });

    // 5. Logic chuyển bài kế tiếp (Next)
    nextBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songDatabase.length;
        playTrack(songDatabase[currentSongIndex]);
    });

    // 6. Logic quay về bài trước đó (Prev)
    prevBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songDatabase.length) % songDatabase.length;
        playTrack(songDatabase[currentSongIndex]);
    });

    // 7. Tự động chuyển tiếp bài hát khi nhạc kết thúc
    audio.addEventListener('ended', () => {
        nextBtn.click();
    });

    // --- Xử lý bộ lọc danh mục bài hát trên Sidebar ---
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelector('.filter-btn.active')?.classList.remove('active');
            e.target.classList.add('active');
            renderSongs(e.target.getAttribute('data-category'));
        });
    });

    // Gọi hiển thị danh sách bài hát ngay khi nạp trang thành công
    renderSongs('all');
});