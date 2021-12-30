// MIT License
// Copyright (c) 2020 Luis Espino
let statesMemory = [0,0,0,0,0,0,0,0];

function missing_states() {
    for (let i = 0; i < 8; i++) {
        if (statesMemory[i] < 2)
            return true
    }

    return false;
}

function reflex_agent(location, state) {
  if (state == "DIRTY") return "CLEAN";
  else if (location == "A") return "RIGHT";
  else if (location == "B") return "LEFT";
}

function unclean(states) {
    let location = states[0];
    let sideA = states[1];
    let sideB = states[2];

    let numRandom = Math.random() * (10 - 1) + 1;
    if (sideA === "CLEAN" && numRandom > 6) {
        states[1] = "DIRTY";
        document.getElementById("tableBodyLog").innerHTML += `<tr><td></td><td>${location}</td><td>DIRTY</td></tr>`;
    }
    numRandom = Math.random() * (10 - 1) + 1;
    if (sideB == "CLEAN" && numRandom > 6) {
        states[2] = "DIRTY";
        document.getElementById("tableBodyLog").innerHTML += `<tr><td></td><td>${location}</td><td>DIRTY</td></tr>`;
    }
    return states;
}

function swape_states(states) {
    let location = states[0];
    let sideA = states[1];
    let sideB = states[2];
    let position;

    if (sideA == "DIRTY" && sideB == "DIRTY")
        position = 1;
    else if (sideA == "DIRTY" && sideB == "CLEAN")
        position = 3;
    else if (sideA == "CLEAN" && sideB == "DIRTY")
        position = 5;
    else
        position = 7;

    if (location != "A") {
        position += 1;
    }

    statesMemory[position-1] = statesMemory[position - 1] + 1;
    console.log(statesMemory);

    document.getElementById("tableBodyLog").innerHTML += `<tr><td>${position}</td></tr>`;
}

function test(states) {
    swape_states(states);
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    document.getElementById("tableBodyLog").innerHTML += `<tr><td></td><td>${location}</td><td>${action_result}</td></tr>`;
    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    } else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";

    states = unclean(states);

    let missing = missing_states();
    if (missing) {
        setTimeout(function () {
        test(states);
        }, 2000);
    } else
        alert("Cada estado ha sido visitado, simulacion terminada");
}

var states = ["A", "DIRTY", "DIRTY"];
test(states);