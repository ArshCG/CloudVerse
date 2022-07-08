async function createfile() {
  try {
    var file = document.getElementById("fileout1").files[0];

    var abc = new Date();

    var formData = new FormData();
    formData.append("file", file);

    var requestOptions = {
      method: "POST",
      body: formData,
    };

    await fetch(
      "http://localhost:58604/api/files/upload/" +
        sessionStorage.getItem("userid") +
        "/" +
        abc.toISOString() +
        "/" +
        sessionStorage.getItem("folderid"),
      requestOptions
    ).then((fileCreateResponse) => {
      console.log(fileCreateResponse);
      ListFiles();
    });
  } catch (err) {
    console.log(err);
  }
}

function ListFiles() {
  try {
    document.getElementById("user1234").innerHTML =
      "Hi " + sessionStorage.getItem("Name") + "!";
    var create = document.getElementById("createfile");
    create.innerHTML = "";
    fetch(
      "http://localhost:58604/api/files/" + sessionStorage.getItem("folderid"),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((files) => {
        files.forEach((file) => {
          var create = document.getElementById("createfile");

          var folderbox = document.createElement("div");
          folderbox.setAttribute("id", "fBox");
          var headericons = document.createElement("div");
          headericons.setAttribute("id", "headerIcons");

          folderbox.innerHTML = `<div class="headericons">
  <div class="dropdownBox">
  <div class="dropdown">
  
    <button class="btn btn-light " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  
        <i class="bi bi-three-dots-vertical" ></i>
  
    </button>
  
  
   
  
   <div class="dropdown-menu " aria-labelledby="dropdownMenuButton">
  
      <a class="dropdown-item" href="#" onclick='open3(${file.docId},"${file.dName}","${file.contentType}",${file.size},${file.createdBy},"${file.createdAt}",${file.folderId})'><i class="fas fa-info-circle"></i>&nbsp;&nbsp;View Details</a>
      
      <a class="dropdown-item" href="#" onclick="filefav(${file.docId})"><i class="fas fa-star"></i>&nbsp;&nbsp;Add To Favourites</a>

      <a class="dropdown-item" href="#" onclick="popupfile(${file.docId})"><i class="fas fa-trash"></i>&nbsp;&nbsp;Delete</a>
      
      
  
    </div>
  
  </div>
  </div>
  
  
  
  </div><div id="imagefolderBox"><div id="folderBoxImage" style="display: flex;margin-bottom: 9px; justify-content: center">
   <img class="folderIcon" onclick="download1(${file.docId})" id="folderImage" style="height: 6rem;width: 6rem;cursor:pointer;" src='document1.jpg'></div><div id="folderImageText">${file.dName}</div> 
   
   <div class="favIcon">
  <button class="star" id="${file.docId}">
        <i class='fa fa-star'></i>
       </button>
  </div>
  </div>`;

          folderbox.appendChild(headericons);
          create.appendChild(folderbox);
        });
      });
  } catch (err) {
    console.log(err);
  }
}

function download1(fileid) {
  try {
    fetch("http://localhost:58604/api/files/download/" + fileid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        var text = "hello world",
          blob = new Blob([text], { type: "text/plain" }),
          anchor = document.createElement("a");

        anchor.download = data.filePath;
        anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = anchor.download;
        anchor.click();
      });
  } catch (err) {
    console.log(err);
  }
}

function popupfile(fileid) {
  Swal.fire({
    title: "Are you sure?",

    text: "You won't be able to revert this!",

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#3085d6",

    cancelButtonColor: "#d33",

    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Deleted!",

        "Your file has been deleted.",

        "success",

        deletefile(fileid)
      );
    }
  });
}

function deletefile(fileid) {
  var raw = "";

  var requestOptions = {
    method: "PUT",

    body: raw,

    redirect: "follow",
  };

  let del = "http://localhost:58604/api/files/del/" + fileid;

  fetch(del, requestOptions)
    .then((response) => response.text())

    .then((result) => console.log(ListFiles()))

    .catch((error) => console.log("error", error));
}

function onLoad2() {
  ListFiles();
}
function cloud() {
  var x = document.getElementById("cloudverse");
  if (x.style.display === "none") {
    x.style.display = "inline";
    x.style.marginLeft = "45px";
  } else {
    x.style.display = "none";
  }
}

function logout() {
  sessionStorage.clear();
  window.location.href = "index1.html";
}

function searchfile() {
  try {
    var id = document.getElementById("searchfile");
    if (id.value == "") {
      ListFiles();
    } else {
      var create = document.getElementById("createfile");
      create.innerHTML = "";
      fetch(
        "http://localhost:58604/api/files/files/" +
          sessionStorage.getItem("folderid") +
          "/" +
          id.value,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((files) => {
          files.forEach((file) => {
            var create = document.getElementById("createfile");

            var folderbox = document.createElement("div");
            folderbox.setAttribute("id", "fBox");
            var headericons = document.createElement("div");
            headericons.setAttribute("id", "headerIcons");

            folderbox.innerHTML = `<div class="headericons">
      <div class="dropdownBox">
      <div class="dropdown">
      
        <button class="btn btn-light " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      
            <i class="bi bi-three-dots-vertical" ></i>
      
        </button>
      
      
       
      
       <div class="dropdown-menu " aria-labelledby="dropdownMenuButton">
      
          <a class="dropdown-item" href="#" onclick='open3(${file.docId},"${file.dName}","${file.contentType}",${file.size},${file.createdBy},"${file.createdAt}",${file.folderId})'><i class="fas fa-info-circle"></i>&nbsp;&nbsp;View Details</a>
          
          <a class="dropdown-item" href="#" onclick="filefav(${file.docId})"><i class="fas fa-star"></i>&nbsp;&nbsp;Add To Favourites</a>
    
          <a class="dropdown-item" href="#" onclick="popupfile(${file.docId})"><i class="fas fa-trash"></i>&nbsp;&nbsp;Delete</a>
          
          
      
        </div>
      
      </div>
      </div>
      
      
      
      </div><div id="imagefolderBox"><div id="folderBoxImage" style="display: flex;margin-bottom: 9px; justify-content: center">
       <img class="folderIcon" onclick="download1(${file.docId})" id="folderImage" style="height: 6rem;width: 6rem;cursor:pointer;" src='document1.jpg'></div><div id="folderImageText">${file.dName}</div> 
       
       <div class="favIcon">
      <button class="star" id="${file.docId}">
            <i class='fa fa-star'></i>
           </button>
      </div>
      </div>`;

            folderbox.appendChild(headericons);
            create.appendChild(folderbox);
          });
        });
    }
  } catch (err) {
    console.log(err);
  }
}

function open3(
  fileid,
  filename,
  contenttype,
  size,
  createdby,
  createdat,
  folderid
) {
  var folderdetails = "";
  folderdetails +=
    `<p class='folderdetails'>File Name :  <span class='folderdetailstext'>` +
    filename +
    `</span></p>`;
  folderdetails +=
    `<p class='folderdetails'>File content type :  <span class='folderdetailstext'>` +
    contenttype +
    `</span></p>`;
  folderdetails +=
    `<p class='folderdetails'>File size :  <span class='folderdetailstext'>` +
    size +
    `</span></p>`;
  folderdetails +=
    `<p class='folderdetails'>File Created By :  <span class='folderdetailstext'>` +
    sessionStorage.getItem("Name") +
    `</span></p>`;
  folderdetails +=
    `<p class='folderdetails'>File Created At :  <span class='folderdetailstext'>` +
    createdat +
    `</span></p>`;

  Swal.fire({
    title: "General Info",
    html: folderdetails,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    confirmButtonColor: "green",
  });
}

function support() {
  Swal.fire({
    title: "Your query is submitted",

    text: "We will revert back to you shortly!",

    icon: "success",

    confirmButtonColor: "green",

    confirmButtonText: "OK",
  });
}
function filefav(fileid) {
  document.getElementById(fileid).style.display = "block";

  var raw = "";

  var requestOptions = {
    method: "PUT",

    body: raw,

    redirect: "follow",
  };

  let fav = "http://localhost:58604/api/files/filefav/" + fileid;

  fetch(fav, requestOptions)
    .then((response) => response.text())

    .then((result) => ListFiles())

    .catch((error) => console.log("error", error));
}
