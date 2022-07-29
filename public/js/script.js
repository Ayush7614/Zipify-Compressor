const submit = document.getElementById("submit");
const file = document.getElementById("file");
const cancel = document.getElementById("cancel");
const BtnBox = document.getElementById("btnBox");
const FormLabel = document.getElementById("label");
const FileInfo = document.getElementById("FileInfo");
const Container = document.getElementById("form");
const b_btn = document.querySelectorAll(".b-btn");

b_btn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    index == 0
      ? b_btn[1].classList.remove("active")
      : b_btn[0].classList.remove("active");
    btn.classList.add("active");
  });
});

// UPLOADED FILES
let AllFiles = JSON.parse(localStorage.getItem("Files")) || [];
// UPDATE UI
const updateUI = (is) => {
  if (is) {
    BtnBox.style.display = "flex";
    FormLabel.innerHTML = `<i class="fas fa-plus"></i> Upload More`;
    FileInfo.textContent = `Total ${
      JSON.parse(localStorage.getItem("Files")).length
    } files uploaded`;
  } else {
    BtnBox.style.display = "none";
    FormLabel.style.innerHTML = `<i class="fas fa-plus"></i> Upload files to Compress`;
    FileInfo.textContent = `Total 0 files uploaded`;
  }
};

// Clear Files
const ClearFiles = async () => {
  await fetch("http://localhost/unlink", {
    method: "DELETE",
  });
  localStorage.clear();
  updateUI(false);
  AllFiles = [];
};

// UPLOAD FILES TO THE SERVER
const uploadFiles = async (file) => {
  if (file) {
    const data = new FormData();
    data.append("FileName", file.name);
    data.append("file", file);
    await fetch("http://localhost/Upload", {
      method: "POST",
      body: data,
    });
  }
};

// UPLOAD FILE ON THE USER INPUT
file.addEventListener("change", (event) => {
  const Files = event.target.files;
  const len = Object.keys(Files).length;
  for (let i = 0; i < len; i++) {
    AllFiles.push(Files[i].name);
    uploadFiles(Files[i]);
  }
  localStorage.setItem("Files", JSON.stringify(AllFiles));
  updateUI(true);
});

submit.addEventListener("click", () => {
  let target = "http://localhost/compress/error";
  if (b_btn[0].classList.contains("active")) {
    target = "http://localhost/compress/zipper";
  } else {
    target = "http://localhost/compress/File";
  }
  fetch(target, {
    method: "POST",
    body: JSON.stringify({
      file: JSON.parse(localStorage.getItem("Files")),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.status === "Success") {
        document.querySelector("body").classList.remove("error");
        document.querySelector("body").classList.add("success");
        window.location.href = `/success/${res.file}`;
      } else {
        document.querySelector("body").classList.remove("success");
        document.querySelector("body").classList.add("error");
      }
    });
  ClearFiles();
  updateUI(false);
});

cancel.addEventListener("click", ClearFiles);

localStorage.getItem("Files") === null ? updateUI(false) : updateUI(true);
