//login창 여닫단
document.getElementById("loginBtn").addEventListener("click", () => {
    document.getElementById("loginDialog").showModal();
});
document.getElementById("login나가기").addEventListener("click", () => {
    document.getElementById("loginDialog").close();
});

// ===== 커뮤니티 게시글 =====
const postList = document.getElementById("postList");
const postForm = document.getElementById("postForm");
const catBtns = document.querySelectorAll(".catBtn");

let posts = JSON.parse(localStorage.getItem("posts") || "[]");
let currentCat = "전체";

function renderPosts() {
    postList.innerHTML = "";

    const filtered = posts.filter(p => currentCat === "전체" || p.category === currentCat);

    if (filtered.length === 0) {
        const empty = document.createElement("li");
        empty.className = "emptyPost";
        empty.textContent = "아직 게시된 글이 없어요.";
        postList.appendChild(empty);
        return;
    }

    // 최신 글 5개만 표시
    filtered.slice(0, 5).forEach(p => {
        const li = document.createElement("li");

        const tag = document.createElement("span");
        tag.className = "postTag";
        tag.textContent = p.category;

        const title = document.createElement("span");
        title.className = "postTitle";
        title.textContent = p.title;

        const date = document.createElement("span");
        date.className = "postDate";
        date.textContent = p.date;

        li.append(tag, title, date);
        postList.appendChild(li);
    });
}

// 카테고리 클릭
catBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        catBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCat = btn.dataset.cat;
        renderPosts();
    });
});

// 글쓰기
postForm.addEventListener("submit", e => {
    e.preventDefault();

    const title = document.getElementById("postTitle").value.trim();
    const category = document.getElementById("postCategory").value;
    if (!title) return;

    posts.unshift({
        category,
        title,
        date: new Date().toLocaleDateString("ko-KR")
    });
    localStorage.setItem("posts", JSON.stringify(posts));

    postForm.reset();
    renderPosts();
});

renderPosts();
