let loc = document.querySelector("#loc");
let stop = document.querySelector("#stop");
let frame = document.querySelector("#frame");
let userName = document.querySelector("#userName");
let age = document.querySelector("#age");
let table = document.querySelector("#table");
let signUp = document.querySelector("#signUp");
let signIn = document.querySelector("#signIn");
let mon;
let arr=[];

function locat() {
    mon = navigator.geolocation.watchPosition(showloc, showError, Option);
}
function showloc(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    window.open("https://maps.google.com/maps?q=" + lat + ',+' + long ,"","width = 400 , height = 400");
    
    
}
function showError(error) {
    console.log(error.message);
}
let Option = {
    enableHighAccuracy: true,
    timeout:Infinity
}
function clear() {
    navigator.geolocation.clearWatch(mon);
}


function sign() { 
    if (JSON.parse(localStorage.getItem("users")) == null) {
        alert("please sign up")
        signUp.classList.remove("hide");
        signIn.classList.add("hide");
    }
    else {
        arr = JSON.parse(localStorage.getItem("users"));
        let x = 0;
        for (let i = 0; i < arr.length; i++){
            if (arr[i].name == userName.value && arr[i].age==age.value) {
                window.open("../done.html", '_parent');
                x = 1;
                return;
            }
        }
        if (x == 0) {
            alert("please sign up");
            signUp.classList.remove("hide");
            signIn.classList.add("hide");
            return;
        }
        
    }
}
function register() {
    let obj = {
        name: userName.value,
        age:age.value
    }
    arr.push(obj);
    if (JSON.parse(localStorage.getItem("users")) == null) {
        console.log("null");
        localStorage.setItem("users", JSON.stringify(arr));
        alert("Signup Done");
        signIn.classList.remove("hide");
        signUp.classList.add("hide");
    }
    else {
        arr = JSON.parse(localStorage.getItem("users"));
        arr.push(obj);
        localStorage.setItem("users", JSON.stringify(arr));
        alert("Signup Done");
        signIn.classList.remove("hide");
        signUp.classList.add("hide");
    }
}


if (localStorage.getItem("users") != null) {
    arr = JSON.parse(localStorage.getItem("users"));
    displayElement(arr);
}

console.log(arr);
function displayElement() {
    for (let i = 0; i < arr.length; i++){
        let row1 = document.createElement("tr");
        let td1row1 = document.createElement("td");
        let userText = document.createTextNode(arr[i].name);
        td1row1.append(userText);
        row1.append(td1row1);
        let td2row1 = document.createElement("td");
        let userag = document.createTextNode(arr[i].age);
        td2row1.append(userag);
        row1.append(td2row1);
        let td3row1 = document.createElement("td");
        let deleBT = document.createElement("button");
        let textbtn = document.createTextNode("Delete");
        deleBT.append(textbtn);
        td3row1.append(deleBT);
        row1.append(td3row1);
        row1.setAttribute("num", i);
    
        deleBT.onclick = function () {
            row1.remove();
            let index=row1.getAttribute("num");
            deleteElement(index);
        }
        
        table.append(row1);
    }
}

function deleteElement(elementDelete) {
    arr.splice(elementDelete, 1);
    localStorage.setItem("users", JSON.stringify(arr));
    table.innerHTML = "";
    displayElement();
    console.log(arr);
    
}