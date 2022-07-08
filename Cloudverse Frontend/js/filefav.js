function ListFiles() {
  try {
    document.getElementById("user1239").innerHTML =
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
      
      <a class="dropdown-item" href="#" onclick="filefav(${file.docId})"><i class="fas fa-trash"></i>&nbsp;&nbsp;Add To Favourites</a>

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

function Removefilefavourites(fileid) {
  debugger;
  var raw = "";

  var requestOptions = {
    method: "PUT",

    body: raw,

    redirect: "follow",
  };

  let fav = "http://localhost:58604/api/files/fileremfav/" + fileid;

  fetch(fav, requestOptions)
    .then((response) => response.text())

    .then((result) => onLoadfilefavourites())

    .catch((error) => console.log("error", error));
}

function listfilefavourite() {
  try {
    document.getElementById("user1239").innerHTML =
      "Hi " + sessionStorage.getItem("Name") + "!";

    var create = document.getElementById("createfilefav");
    create.innerHTML = "";
    fetch(
      "http://localhost:58604/api/favourites/" +
        sessionStorage.getItem("folderid"),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((files) => {
        console.log(files);
        files.forEach((file) => {
          var create = document.getElementById("createfilefav");

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
            
            <a class="dropdown-item" href="#" onclick='Removefilefavourites(${file.docId})'><i class="fas fa-trash"></i>&nbsp;&nbsp;Remove From Favourites</a>
      
           
            
            
        
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

function onLoadfilefavourites() {
  listfilefavourite();
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
