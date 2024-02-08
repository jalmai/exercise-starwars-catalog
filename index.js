let chars = [];
peopleBring();

function peopleBring() {
  const peopleReq = new XMLHttpRequest();
  peopleReq.open("get", "https://swapi.dev/api/people/", true);
  peopleReq.addEventListener("readystatechange", () => {
    if (peopleReq.readyState === 4) {
      console.log("received from api");
      let people = JSON.parse(peopleReq.responseText);
      people.results.forEach((element) => {
        let char = new StarWarsCharacter(element);
        chars.push(char);
      });
    } else if (peopleReq.status === 200) {
      console.log("loading");
    } else {
      console.error("Error: ", peopleReq.status);
    }
    chars.forEach((element) => {
      console.log(element.getInfo());
    });
  });
  peopleReq.send();
}
class StarWarsCharacter {
  constructor(data) {
    this.name = data.name || "Unknown";
    this.birthYear = data.birth_year || "Unknown";
    this.created = data.created || "Unknown";
    this.edited = data.edited || "Unknown";
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
      `Created: ${this.created}`,
      `Edited: ${this.edited}`,
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
