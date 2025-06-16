var SiteName = document.getElementById("SiteName");
var SiteURL = document.getElementById("SiteURL");
var row = document.getElementById("row");
var SiteList


if(localStorage.getItem("SiteList")){
    SiteList=JSON.parse(localStorage.getItem("SiteList"))
    displaySite(SiteList)
}else{
    SiteList=[]
}

// Function to Add Websites 

function addsite(){
  if (!validateInputs()) {
    return;
  }
  var url = SiteURL.value.trim();
  if (!!url && !/^https?:\/\//i.test(url)) {
  url = 'http://' + url;
  }
  var sites = {
    name:SiteName.value,
    url: url
  }
  SiteList.push(sites);
  displaySite(SiteList);
  inputClear();
  SaveToLocalStorage();

}

// Function to Display Added Websites 

function displaySite(Slist){
  var cartoona = "";
  for(i=0 ; i < Slist.length ; i ++){
    cartoona += `<tr>
    <td>${i+1}</td>
    <td style="font-family: 'PT Sans Caption', sans-serif;">${Slist[i].name}</td>
    <td><button class="btn btn-success"><a href="${Slist[i].url}" target="_blank" class="text-white text-decoration-none"> <i class="fa-solid fa-eye pe-2"></i>Visit</a></button></td>
    <td><button onclick="SiteBtnDelete(${i})" class="btn btn-danger"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
    </tr>`;
  }
  row.innerHTML = cartoona;
   
}

// Function to clear input fields 
  
function inputClear(){
  SiteName.value = null;
  SiteURL.value = null;
}

// Function to clear Delete recorded Sites Using Delete Button

function SiteBtnDelete(index){
  SiteList.splice(index,1);
  displaySite(SiteList);
  SaveToLocalStorage();
}

//  Function to save in the local storage

function SaveToLocalStorage(){
  localStorage.setItem("SiteList",JSON.stringify(SiteList))
}

// Function to Validate the Inputs

function validateInputs() {
  var name = SiteName.value.trim();
  var url = SiteURL.value.trim();

  var urlPattern = /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+([\/#?]?.*)$/i;

  var isNameValid = name.length >= 3;
  var isUrlValid = urlPattern.test(url);

  var errorBox = document.querySelector('.box-info');

  if (!isNameValid || !isUrlValid) {
    errorBox.classList.remove('d-none');
    return false; // Invalid
  } else {
    errorBox.classList.add('d-none');
    return true; // Valid
  }
}

document.getElementById('closeBtn').onclick = function() {
  document.querySelector('.box-info').classList.add('d-none');
};
