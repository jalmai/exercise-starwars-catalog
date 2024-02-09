let chars = [];
makeRequest("GET", "https://swapi.dev/api/people/", function (error, data) {
  getAllChars(error, data);
});
function getCharData() {}
function getAllChars(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data.next);
    if (data.next) {
      makeRequest("GET", data.next, function (error, data) {
        getAllChars(error, data);
      });
    } else {
      console.log("gathered all character data");
      console.log(chars);
    }

    data.results.forEach((element) => {
      let char = new StarWarsCharacter(element);
      chars.push(char);
    });
  }
}
class StarWarsCharacter {
  constructor(data) {
    this.name = data.name || "Unknown";
    this.birthYear = data.birth_year || "Unknown";
    this.eyeColor = data.eye_color || "Unknown";
    this.gender = data.gender || "Unknown";
    this.hairColor = data.hair_color || "Unknown";
    this.height = data.height || "Unknown";
    this.homeworld = data.homeworld || "Unknown";
    this.mass = data.mass || "Unknown";
    this.skinColor = data.skin_color || "Unknown";
    this.films = data.films || [];
    this.species = data.species || [];
    this.starships = data.starships || [];
    this.vehicles = data.vehicles || [];
    this.url = data.url || "Unknown";
  }

  getInfo() {
    return `
        Name: ${this.name}
        Birth Year: ${this.birthYear}
        Created: ${this.created}
        Edited: ${this.edited}
        Eye Color: ${this.eyeColor}
        Gender: ${this.gender}
        Hair Color: ${this.hairColor}
        Height: ${this.height}
        Homeworld: ${this.homeworld}
        Mass: ${this.mass}
        Skin Color: ${this.skinColor}
        Films: ${this.films.join(", ")}
        Species: ${this.species.join(", ")}
        Starships: ${this.starships.join(", ")}
        Vehicles: ${this.vehicles.join(", ")}
        URL: ${this.url}
        `;
  }
  getInfoAsList() {
    const properties = [
      `Name: ${this.name}`,
      `Birth Year: ${this.birthYear}`,
      `Eye Color: ${this.eyeColor}`,
      `Gender: ${this.gender}`,
      `Hair Color: ${this.hairColor}`,
      `Height: ${this.height}`,
      `Mass: ${this.mass}`,
      `Skin Color: ${this.skinColor}`,
      `Species: ${this.species.join(", ")}`,
    ];

    const ul = document.createElement("ul");
    properties.forEach((property) => {
      const li = document.createElement("li");
      li.textContent = property;
      ul.appendChild(li);
    });
    return ul;
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
