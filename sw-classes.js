class StarWarsCharacter {
  // TODO: Do not set data as URL, instead set as null until data is gathered
  //TODO: Separate into different functions in construct
  constructor(data) {
    this.name = data.name || "Unknown";
    this.birthYear = data.birth_year || "Unknown";
    this.eyeColor = data.eye_color || "Unknown";
    this.gender = data.gender || "Unknown";
    this.hairColor = data.hair_color || "Unknown";
    this.height = data.height || "Unknown";
    if (!homeWorldsUrl.includes(data.homeworld)) {
      makeRequest("GET", data.homeworld, function (error, data) {
        if (data) {
          let plan = new Planet(data);
          planets.push(plan);
          charDetails(currentActive);
        } else {
          console.error(error);
        }
      });
      homeWorldsUrl.push(data.homeworld);
    }
    this.homeworld = homeWorldsUrl.indexOf(data.homeworld) || "Unknown";
    this.species = data.species[0] || "Human";
    this.mass = data.mass || "Unknown";
    this.skinColor = data.skin_color || "Unknown";
    this.films = data.films || [];
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
        Species: ${this.species}
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
      `Homeworld: ${planets[this.homeworld - 1].name}`,
      `Species: <span id=species></span>`,
    ];

    const ul = document.createElement("ul");
    properties.forEach((property) => {
      const li = document.createElement("li");
      li.innerHTML = property;
      ul.appendChild(li);
    });
    return ul;
  }
}
class Planet {
  constructor(data) {
    this.name = data.name || "Unknown";
    this.rotationPeriod = data.rotation_period || "Unknown";
    this.orbitalPeriod = data.orbital_period || "Unknown";
    this.diameter = data.diameter || "Unknown";
    this.climate = data.climate || "Unknown";
    this.gravity = data.gravity || "Unknown";
    this.terrain = data.terrain || "Unknown";
    this.surfaceWater = data.surface_water || "Unknown";
    this.population = data.population || "Unknown";
    this.residents = data.residents || "Unknown";
    this.films = data.films || "Unknown";
    this.created = data.created || "Unknown";
    this.edited = data.edited || "Unknown";
    this.url = data.url || "Unknown";
  }
  getInfoAsList() {
    const properties = [
      `Name: ${this.name}`,
      `Rotation Period: ${this.rotationPeriod} hours`,
      `Orbital Period: ${this.orbitalPeriod} days`,
      `Diameter: ${this.diameter}`,
      `Climate: ${this.climate}`,
      `Gravity: ${this.gravity}`,
      `Terrain: ${this.terrain}`,
      `Population: ${this.population}`,
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
