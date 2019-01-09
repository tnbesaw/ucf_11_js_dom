// Select the submit button
let filterBtn = d3.select("#filter-btn");

// create an event handler for the filter button
filterBtn.on("click", function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    let inputElementDate = d3.select("#datetime");
    let inputElementCity = d3.select("#city");
    let inputElementState = d3.select("#state");
    let inputElementCountry = d3.select("#country");
    let inputElementShape = d3.select("#shape");

    // Get the value property of the input element
    let inputValueDate = inputElementDate.property("value");
    let inputValueCity = inputElementCity.property("value");
    let inputValueState = inputElementState.property("value");
    let inputValueCountry = inputElementCountry.property("value");
    let inputValueShape = inputElementShape.property("value");

    // log input value to console for debugging purposes
    console.log(inputValueDate);
    console.log(inputValueCity);
    console.log(inputValueState);
    console.log(inputValueCountry);
    console.log(inputValueShape);
    
    // create a new variable to represent the data variable from data.js
    let tableData = data;

    // apply filter on the raw data
    let filteredData = tableData.filter(sighting => {
        let ok = true;
        
        if (inputValueDate !== '') {
            ok = (sighting.datetime === inputValueDate && ok === true);
            inputElementDate.style("background", "yellow");
        }
        else {
            inputElementDate.style("background", "");    
        }

        if (inputValueCity !== '') {
            ok = (sighting.city === inputValueCity && ok === true);
            inputElementCity.style("background", "yellow");
        }
        else {
            inputElementCity.style("background", "");    
        }  

        if (inputValueState !== '') {
            ok = (sighting.state === inputValueState && ok === true);
            inputElementState.style("background", "yellow");
        }
        else {
            inputElementState.style("background", "");    
        }

        if (inputValueCountry !== '') {
            ok = (sighting.country === inputValueCountry && ok === true);
            inputElementCountry.style("background", "yellow");
        }
        else {
            inputElementCountry.style("background", "");    
        }

        if (inputValueShape !== '') {
            ok = (sighting.shape === inputValueShape && ok === true);
            inputElementShape.style("background", "yellow");
        }
        else {
            inputElementShape.style("background", "");    
        }

        return ok;
    });

    // log filtered results to console
    console.log(filteredData);


    // clear any rows from prior search
    let tbodyRows = d3.selectAll("tbody>tr");
    tbodyRows.remove();


    // display the data in the table
    let tbody = d3.select("tbody");
    let cnt = 0;

    filteredData.forEach((sighting) => {
        let row = tbody.append("tr");
        cnt += 1;
        Object.entries(sighting).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });

    d3.select("#cnt").text("Results: " + cnt);
    d3.select("#cnt").style("color", "yellow");

    console.log(cnt);
});


// Select the clear button
let clearBtn = d3.select("#clear-btn");

// create an event handler for the filter button
clearBtn.on("click", function() {
    // allowing the page to refresh would eliminate the need for the js code ... but doing it just for fun!!!
    d3.event.preventDefault();
    
    // clear all input values 
    document.getElementById('datetime').value = "";
    document.getElementById('city').value = "";
    document.getElementById('state').value = "";
    document.getElementById('country').value = "";
    document.getElementById('shape').value = "";

    // clear all input sytles 
    document.getElementById('datetime').style.backgroundColor = "";    
    document.getElementById('city').style.backgroundColor = "";    
    document.getElementById('state').style.backgroundColor = "";    
    document.getElementById('country').style.backgroundColor = "";    
    document.getElementById('shape').style.backgroundColor = "";    


    // clear any rows from prior search
    let tbodyRows = d3.selectAll("tbody>tr");
    tbodyRows.remove();    

    // clear results counter
    d3.select("#cnt").text("");
    
});
