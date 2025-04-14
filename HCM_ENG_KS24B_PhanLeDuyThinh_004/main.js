let acount = [
    { nameProjetc: "lập trình ứng dụng web", dob: "2026-11-20", nameLeder: "Hồ Xuân Hùng", status: 1 },
    { nameProjetc: "lập trình AI", dob: "2026-11-30", nameLeder: "Nguyễn Quốc Tuấn", status: 2 },
    { nameProjetc: "Game", dob: "2026-11-09", nameLeder: "Mai Nhật Tân", status: 1 }
];

let statusName = ["Đang làm", "Hoàn Thành", "Trễ Hạn"];
let editingIndex = -1; // -1 nghĩa là đang thêm mới

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
    editingIndex = index;
}
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // chặn reload

    const name = document.getElementById("tenCongViec").value.trim();
    const dob = document.getElementById("hanChot").value;
    const leader = document.getElementById("nguoiPhuTrach").value.trim();
    const status = parseInt(document.getElementById("trangThai").value);

    if (!name || !dob || !leader || isNaN(status)) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    const newProject = { nameProjetc: name, dob, nameLeder: leader, status };
    if (editingIndex === -1) {
        acount.push(newProject);
    } else {
        acount[editingIndex] = newProject;
        editingIndex = -1;
    }

    document.querySelector("form").reset();// để hàm tự reset ko cần phải xoá tay
    renderAcount();
    
});

renderAcount();
function handleSearch(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // tránh reload trang
        const keyword = document.getElementById("searchInput").value.toLowerCase();
        const result = acount.filter(project => project.nameProjetc.toLowerCase().includes(keyword));
        renderAcount(result);
    }
}
document.getElementById("searchInput").addEventListener("keydown", handleSearch);
