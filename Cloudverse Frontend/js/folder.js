function createfolder() {
  try {
    var fname = document.getElementById("foldername");
    var abc = new Date();
    fetch("http://localhost:58604/api/folder", {
      body: JSON.stringify({
        fName: fname.value,
        createdBy: sessionStorage.getItem("userid"),
        createdAt: abc.toISOString(),
        isDeleted: 0,
        isFavourite: 0,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((folderCreateResponse) => {
      console.log(folderCreateResponse);
      ListFolders();
    });
  } catch (err) {
    console.log(err);
  }
}

function ListFolders() {
  try {
    document.getElementById("user123").innerHTML =
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

function popup(folderid) {
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

        delete1(folderid)
      );
    }
  });
}

function delete1(folderid) {
  var raw = "";

  var requestOptions = {
    method: "PUT",

    body: raw,

    redirect: "follow",
  };

  let del = "http://localhost:58604/api/folder/del/" + folderid;

  fetch(del, requestOptions)
    .then((response) => response.text())

    .then((result) => console.log(ListFolders()))

    .catch((error) => console.log("error", error));
}

function onLoad() {
  ListFolders();
}
function search() {
  try {
    var id = document.getElementById("search");
    if (id.value == "") {
      ListFolders();
    } else {
      var create = document.getElementById("create");
      create.innerHTML = "";
      fetch(
        "http://localhost:58604/api/folder/folder/" +
          sessionStorage.getItem("userid") +
          "/" +
          id.value,
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
    }
  } catch (err) {
    console.log(err);
  }
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
function logout() {
  sessionStorage.clear();
  window.location.href = "index1.html";
}

function favourites(folderid) {
  var starc = folderid;
  console.log(starc);

  document.getElementById(folderid).style.display = "block";

  var raw = "";

  var requestOptions = {
    method: "PUT",

    body: raw,

    redirect: "follow",
  };

  let fav = "http://localhost:58604/api/folder/folderfav/" + folderid;

  fetch(fav, requestOptions)
    .then((response) => response.text())

    .then((result) => ListFolders())

    .catch((error) => console.log("error", error));
}
function openfile(folderid) {
  sessionStorage.setItem("folderid", folderid);
  window.location.href = "file.html";
}
