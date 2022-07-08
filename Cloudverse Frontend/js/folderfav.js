function ListFolders() {
  try {
    document.getElementById("user1237").innerHTML =
      "Hi " + sessionStorage.getItem("Name") + "!";

    var create = document.getElementById("create");
    create.innerHTML = "";
    fetch(
      "http://localhost:58604/api/folder/" + sessionStorage.getItem("userid"),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((folders) => {
        console.log(folders);
        folders.forEach((folder) => {
          var create = document.getElementById("create");

          var folderbox = document.createElement("div");
          folderbox.setAttribute("id", "fBox");
          var headericons = document.createElement("div");
          headericons.setAttribute("id", "headerIcons");

          var k = "Add to favourites";

          folderbox.innerHTML = `<div class="headericons">
<div class="dropdownBox">
<div class="dropdown">

  <button class="btn btn-light " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

      <i class="bi bi-three-dots-vertical" ></i>

  </button>


 

 <div class="dropdown-menu " aria-labelledby="dropdownMenuButton">

    <a class="dropdown-item" href="#" onclick='open2(${folder.id},"${folder.fName}",${folder.createdBy},"${folder.createdAt}")'><i class="fas fa-info-circle"></i>&nbsp;&nbsp;View Details</a>
    
    <a class="dropdown-item" href="#" onclick="favourites(${folder.id})"><i class="fas fa-star"></i>&nbsp;&nbsp;${k}</a>
    
    <a class="dropdown-item" href="#" onclick='popup(${folder.id})'><i class="fas fa-trash"></i>&nbsp;&nbsp;Delete</a>

  </div>

</div>
</div>



</div><div id="imagefolderBox"><div id="folderBoxImage" style="display: flex;margin-bottom: 9px; justify-content: center">
 <img class="folderIcon" onclick="openfile(${folder.id})" id="folderImage" style="height: 6rem;width: 6rem;cursor:pointer;" src='dark_blue_folder.png'></div><div id="folderImageText">${folder.fName}</div> 
 
 <div class="favIcon">
<button class="star" id="${folder.id}">
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

function Removefavourites(folderid) {
  var raw = "";

  var requestOptions = {
    method: "PUT",

    body: raw,

    redirect: "follow",
  };

  let fav = "http://localhost:58604/api/folder/folderremfav/" + folderid;

  fetch(fav, requestOptions)
    .then((response) => response.text())

    .then((result) => onLoadfolderfavourites())

    .catch((error) => console.log("error", error));
}

function listfolderfavourite() {
  try {
    document.getElementById("user1237").innerHTML =
      "Hi " + sessionStorage.getItem("Name") + "!";

    var create = document.getElementById("createfolderfav");
    create.innerHTML = "";
    fetch(
      "http://localhost:58604/api/favourites/fol/" +
        sessionStorage.getItem("userid"),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((folders) => {
        console.log(folders);
        folders.forEach((folder) => {
          var create = document.getElementById("createfolderfav");

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
  
      <a class="dropdown-item" href="#" onclick='open2(${folder.id},"${folder.fName}",${folder.createdBy},"${folder.createdAt}")'><i class="fas fa-info-circle"></i>&nbsp;&nbsp;View Details</a>
      
      <a class="dropdown-item" href="#" onclick="Removefavourites(${folder.id})"><i class="fas fa-star"></i>&nbsp;&nbsp;Remove from favourites</a>
      
      
  
    </div>
  
  </div>
  </div>
  
  
  
  </div><div id="imagefolderBox"><div id="folderBoxImage" style="display: flex;margin-bottom: 9px; justify-content: center">
   <img class="folderIcon" onclick="openfile(${folder.id})" id="folderImage" style="height: 6rem;width: 6rem;cursor:pointer;" src='dark_blue_folder.png'></div><div id="folderImageText">${folder.fName}</div> 
   
   <div class="favIcon">
  <button class="star" id="${folder.id}">
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

function onLoadfolderfavourites() {
  listfolderfavourite();
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
function open2(folderid, foldername, createdby, createdat) {
  var folderdetails = "";
  folderdetails +=
    `<p class='folderdetails'>Folder Name :  <span class='folderdetailstext'>` +
    foldername +
    `</span></p>`;
  folderdetails +=
    `<p class='folderdetails'>Folder Created By :  <span class='folderdetailstext'>` +
    sessionStorage.getItem("Name") +
    `</span></p>`;
  folderdetails +=
    `<p class='folderdetails'>Folder Created At :  <span class='folderdetailstext'>` +
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
function openfile(folderid) {
  sessionStorage.setItem("folderid", folderid);
  window.location.href = "file.html";
}
