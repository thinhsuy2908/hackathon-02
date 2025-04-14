let acount = [
    { nameProjetc: "lập trình ứng dụng web", dob: "2026-11-20", nameLeder: "Hồ Xuân Hùng", status: 1 },
    { nameProjetc: "lập trình AI", dob: "2026-11-30", nameLeder: "Nguyễn Quốc Tuấn", status: 2 },
    { nameProjetc: "Game", dob: "2026-11-09", nameLeder: "Mai Nhật Tân", status: 1 }
];
let statusName = ["Đang làm", "Hoàn Thành", "Trễ Hạn"];
// Biến lưu vị trí đang sửa. Nếu = -1 tức là đang thêm mới
let editingIndex = -1;
const getStatusByIndex = (index) => {
    return statusName[index - 1] || "Không xác định";
};
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${year}-${month}-${day}`;
}
function renderAcount(list = acount) {
    const tbody = document.getElementById("taskList");
    tbody.innerHTML = "";

    list.forEach((project, index) => {
        const row = `
            <tr>
                <td>${project.nameProjetc}</td>
                <td>${formatDate(project.dob)}</td>
                <td>${project.nameLeder}</td>
                <td>${getStatusByIndex(project.status)}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="editProject(${index})">Sửa</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProject(${index})">Xoá</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}
function deleteProject(index) {
    if (confirm("Bạn có chắc muốn xoá công việc này không?")) {
        acount.splice(index, 1);
        renderAcount();
    }
}
function editProject(index) {
    const project = acount[index];
    document.getElementById("tenCongViec").value = project.nameProjetc;
    document.getElementById("hanChot").value = project.dob;
    document.getElementById("nguoiPhuTrach").value = project.nameLeder;
    document.getElementById("trangThai").value = project.status;
    editingIndex = index; // ghi lại vị trí đang sửa
}
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // chặn reload trang
    const nameInput = document.getElementById("tenCongViec");
    const dobInput = document.getElementById("hanChot");
    const leaderInput = document.getElementById("nguoiPhuTrach");
    const statusInput = document.getElementById("trangThai");
    const name = nameInput.value.trim();
    const dob = dobInput.value;
    const leader = leaderInput.value.trim();
    const status = parseInt(statusInput.value);

    let isValid = true;
    //kiểm ttra lỗi
    if (!name) {
        nameInput.classList.add("is-invalid");
        isValid = false;
    } else {
        nameInput.classList.remove("is-invalid");
    }

    if (!dob) {
        dobInput.classList.add("is-invalid");
        isValid = false;
    } else {
        dobInput.classList.remove("is-invalid");
    }

    if (!leader) {
        leaderInput.classList.add("is-invalid");
        isValid = false;
    } else {
        leaderInput.classList.remove("is-invalid");
    }

    if (isNaN(status)) {
        statusInput.classList.add("is-invalid");
        isValid = false;
    } else {
        statusInput.classList.remove("is-invalid");
    }

    if (!isValid) return;

    // Tạo object mới
    const newProject = { nameProjetc: name, dob, nameLeder: leader, status };

    if (editingIndex === -1) {
        acount.push(newProject);
    } else {
        acount[editingIndex] = newProject;
        editingIndex = -1;
    }
    // Reset form sau khi thêm/cập nhật
    document.querySelector("form").reset();
    [nameInput, dobInput, leaderInput, statusInput].forEach(input => {
        input.classList.remove("is-invalid");
    });

    renderAcount();
});

function handleSearch(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const keyword = document.getElementById("searchInput").value.toLowerCase();
        const result = acount.filter(project => project.nameProjetc.toLowerCase().includes(keyword));
        renderAcount(result);
    }
}
// Gán sự kiện tìm kiếm
document.getElementById("searchInput").addEventListener("keydown", handleSearch);

// Gọi lần đầu để hiển thị danh sách
renderAcount();
