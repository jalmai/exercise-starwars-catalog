let chars = [];
let charList = document.querySelector(".char-list");
let charInfo = document.querySelector(".char-detail");
let homeWorldsUrl = ["unknown"];
let planets = [];
let currentActive = 0;

charList.classList.add("loader");
makeRequest("GET", "https://swapi.dev/api/people/", function (error, data) {
  getAllChars(error, data);
});

function getAllChars(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data.next);
    // !Temporary commented out to avoid unecessary calls from api
    // if (data.next) {
    //   makeRequest("GET", data.next, function (error, data) {
    //     getAllChars(error, data);
    //   });
    // } else {
    //   console.log("gathered all character data");
    //   console.log(chars);
    // }

    data.results.forEach((element) => {
      let char = new StarWarsCharacter(element);
      chars.push(char);
    });
    let htmlList = document.createElement("ul");
    chars.forEach((char, i) => {
      let li = document.createElement("li");
      li.addEventListener("click", function () {
        activeTab(i);
        charDetails(currentActive);
      });
      li.innerText = char.name;
      htmlList.appendChild(li);
    });
    charList.innerHTML = "";
    charList.classList.remove("loader");
    charList.appendChild(htmlList);
    let button = document.createElement("button");
    button.innerHTML = "next character";
    button.addEventListener("click", function () {
      if (currentActive != null) {
        if (currentActive === charList.getElementsByTagName("li").length - 1) {
          currentActive = 0;
        } else {
          currentActive += 1;
        }
      } else {
        currentActive = 0;
      }
      charDetails(currentActive);
      activeTab(currentActive);
    });
    charList.appendChild(button);
    activeTab(currentActive);
  }
}

function makeRequest(method, url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const responseData = JSON.parse(xhr.responseText);
        callback(null, responseData);
      } else {
        callback(new Error(`Request failed with status ${xhr.status}`), null);
      }
    }
  };
  xhr.onerror = function () {
    callback(new Error("Request failed"), null);
  };
  xhr.send();
}
function charDetails(index) {
  let info = chars[index].getInfoAsList();
  let currPlanet = chars[index].homeworld;
  let planInfo = planets[currPlanet - 1].getInfoAsList();
  charInfo.innerHTML = "";
  charInfo.appendChild(info);
  let planetDetails = document.querySelector(".planet-detail");
  planetDetails.innerHTML = "";
  planetDetails.appendChild(planInfo);
  if (chars[index].species === "Human") {
    // TODO: Move to variable
    charInfo.querySelector("#species").innerHTML = "Human";
  } else {
    // TODO: Add proper loading animation
    charInfo.querySelector("#species").innerHTML = "loading";

    makeRequest("GET", chars[index].species, function (error, data) {
      if (data) {
        let speciesName = data.name;
        charInfo.querySelector("#species").innerHTML = speciesName;
      } else {
        console.log(error);
      }
    });
  }
}
function activeTab(i) {
  let li = charList.getElementsByTagName("li");
  Array.from(li).forEach((element) => {
    element.classList.remove("active");
  });
  li[i].classList.add("active");
  currentActive = i;
}
