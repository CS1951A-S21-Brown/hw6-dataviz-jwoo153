// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = {top: 40, right: 100, bottom: 40, left: 175};
//const NUM_EXAMPLES = 20;
// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 650;
let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 850;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 900;

//GRAPH1
let svg = d3.select("#graph1")
.append("svg")
    .attr("width", graph_1_width)     // HINT: width
    .attr("height", graph_1_height)     // HINT: height
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);   

// Set up reference to count SVG group
let countRef = svg.append("g");

//GRAPH2
let svg2 = d3.select("#graph2")
.append("svg")
    .attr("width", graph_2_width)     // HINT: width
    .attr("height", graph_2_height)     // HINT: height
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`); 

let countRef2 = svg2.append("g");

//GRAPH3
let svg3 = d3.select("#graph3")
.append("svg")
    .attr("width", graph_3_width)     // HINT: width
    .attr("height", graph_3_height)     // HINT: height
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`); 

let countRef3 = svg3.append("g");


d3.select('#graph1')
    .style('border','1px solid red')
//loading csv file



d3.csv("./data/netflix.csv").then(function(data) {
    // TODO: Clean and strip desired amount of data for barplot
    //console.log(data);
    //console.log("hello")
    
    //genre dictionary corresponding to its number 
    genre = parseGenre(data);
    //data = filterData(data, artist);
    keys = Object.keys(genre)
    //console.log(keys)
    vals = Object.values(genre)
    //maxval = 0;
    ordered_vals = vals.sort(function(a,b) {return b-a});
    //console.log(ordered_vals)

    let x = d3.scaleLinear()
        .domain([0,vals[0]])
        .range([0,graph_1_width-margin.left-margin.right]);
        // TODO: Nest the data into groups, where a group is a given song by the artist
    
    let y = d3.scaleBand()
        .domain(keys)
        .range([0, graph_1_height - margin.top - margin.bottom])
        .padding(0.1);
    
    svg.append("g")
        .call(d3.axisLeft(y).tickSize(0).tickPadding(10));
    
    let bars = svg.selectAll("rect").data(keys);
    bars.enter()
        .append("rect")
        .merge(bars)
        //.attr("fill", function(d) { return color(d['artists']) }) // Here, we are using functin(d) { ... } to return fill colors based on the data point d
        .attr("x", x(0))
        .attr("y", function(d){return y(d)})               // HINT: Use function(d) { return ...; } to apply styles based on the data point (d)
        .attr("width", function(d){return x(parseInt(genre[d]))})
        .attr("height",  y.bandwidth()); 

    let counts = countRef.selectAll("text").data(keys);

    counts.enter()
        .append("text")
        .merge(counts)
        .attr("x", function(d){return x(parseInt(genre[d]))+10;})       // HINT: Add a small offset to the right edge of the bar, found by x(d.count)
        .attr("y", function(d){return y(d)+10})       // HINT: Add a small offset to the top edge of the bar, found by y(d.artist)
        .style("text-anchor", "start")
        .text(function(d){return parseInt(genre[d])});  

    svg.append("text")
        .attr("transform", `translate(${(graph_1_width - margin.left - margin.right) / 2},
        ${(graph_1_height - margin.top - margin.bottom) + 15})`)       // HINT: Place this at the bottom middle edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .text("COUNT (Number of Movies)");

    svg.append("text")
        .attr("transform", `translate(-120, ${(graph_1_height - margin.top - margin.bottom) / 2})`)       // HINT: Place this at the center left edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .text("GENRE");

    svg.append("text")
        .attr("transform", `translate(${(graph_1_width  - margin.left - margin.right) / 2}, ${-10})`)       // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .text("Titles per Genre");


    //GRAPH2//////////////////////
    avg = avgRelease(data);
    //key = year
    //val = avg hours

    avgKeys = Object.keys(avg)
    //console.log(keys)
    avgVals = Object.values(avg)
    //maxval = 0;
    ordered_avgVals = avgVals.sort(function(a,b) {return b-a});
    //console.log(ordered_vals)

    let avgx = d3.scaleLinear()
        .domain([0,ordered_avgVals[0]])
        .range([0,graph_2_width-margin.left-margin.right]);
        // TODO: Nest the data into groups, where a group is a given song by the artist
    
    let avgy = d3.scaleBand()
        .domain(avgKeys)
        .range([0, graph_2_height - margin.top - margin.bottom])
        .padding(0.1);
    
    svg2.append("g")
        .call(d3.axisLeft(avgy).tickSize(0).tickPadding(10));
    
    let avgbars = svg2.selectAll("rect").data(avgKeys);
    avgbars.enter()
        .append("rect")
        .merge(bars)
        //.attr("fill", function(d) { return color(d['artists']) }) // Here, we are using functin(d) { ... } to return fill colors based on the data point d
        .attr("x", avgx(0))
        .attr("y", function(d){return avgy(d)})               // HINT: Use function(d) { return ...; } to apply styles based on the data point (d)
        .attr("width", function(d){return avgx(avg[d])})
        .attr("height",  avgy.bandwidth()); 

    let avgcounts = countRef2.selectAll("text").data(avgKeys);

    avgcounts.enter()
        .append("text")
        .merge(avgcounts)
        .attr("x", function(d){return avgx(avg[d])+10;})       // HINT: Add a small offset to the right edge of the bar, found by x(d.count)
        .attr("y", function(d){return avgy(d)+10})       // HINT: Add a small offset to the top edge of the bar, found by y(d.artist)
        .style("text-anchor", "start")
        .text(function(d){return avg[d]});  

    svg2.append("text")
        .attr("transform", `translate(${(graph_2_width - margin.left - margin.right) / 2},
        ${(graph_2_height - margin.top - margin.bottom) + 15})`)       // HINT: Place this at the bottom middle edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .text("AVG DURATION (Min)");

    svg2.append("text")
        .attr("transform", `translate(-120, ${(graph_2_height - margin.top - margin.bottom) / 2})`)       // HINT: Place this at the center left edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .text("YEAR");

    svg2.append("text")
        .attr("transform", `translate(${(graph_2_width  - margin.left - margin.right) / 2}, ${-10})`)       // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .text("Avg Movie Duration by Year");

    
    
    //GRAPH3///////////////
    /*





    */
    pairs = topPairs2(data);
    //data = filterData(data, artist);
   
    // Create items array
    var topitems = Object.keys(pairs).map(function(key) {
        return [key, pairs[key]];
    });
    
    // Sort the array based on the second element
    topitems.sort(function(first, second) {
        return second[1] - first[1];
    });
    /*
    var topTen = {}
    for (i = 0; i<10;i++){
        toAdd = topitems[i][0];
        topTen[toAdd]=topitems[i][1];
    }
    */
    var topTen = []
    for (i = 0; i<10;i++){
        toAdd = topitems[i][0];
        topTen.push(toAdd)
    }
  
    // Create a new array with only the first 5 items
    console.log(topitems.slice(0, 5));
    
    dirAct = Object.keys(pairs)
    //console.log(keys)
    collabs = Object.values(pairs)
    //maxval = 0;
    ordered_col = collabs.sort(function(a,b) {return b-a});
    //console.log(ordered_vals)

    let x3 = d3.scaleLinear()
        .domain([0,ordered_col[0]])
        .range([0,graph_3_width-margin.left-margin.right]);
        // TODO: Nest the data into groups, where a group is a given song by the artist
    
    let y3 = d3.scaleBand()
        .domain(topTen)
        .range([0, graph_3_height - margin.top - margin.bottom])
        .padding(0.1);
    
    svg3.append("g")
        .call(d3.axisLeft(y3).tickSize(0).tickPadding(10));
    
    let bars3 = svg3.selectAll("rect").data(dirAct);
    bars3.enter()
        .append("rect")
        .merge(bars3)
        //.attr("fill", function(d) { return color(d['artists']) }) // Here, we are using functin(d) { ... } to return fill colors based on the data point d
        .attr("x", x3(0))
        .attr("y", function(d){return y3(d)})               // HINT: Use function(d) { return ...; } to apply styles based on the data point (d)
        .attr("width", function(d){return x3(parseInt(pairs[d]))})
        .attr("height",  y3.bandwidth()); 

    let counts3 = countRef3.selectAll("text").data(dirAct);

    counts3.enter()
        .append("text")
        .merge(counts3)
        .attr("x", function(d){return x3(parseInt(pairs[d]))+10;})       // HINT: Add a small offset to the right edge of the bar, found by x(d.count)
        .attr("y", function(d){return y3(d)+10})       // HINT: Add a small offset to the top edge of the bar, found by y(d.artist)
        .style("text-anchor", "start")
        .text(function(d){return parseInt(pairs[d])});  

    svg3.append("text")
        .attr("transform", `translate(${(graph_3_width - margin.left - margin.right) / 2},
        ${(graph_3_height - margin.top - margin.bottom) + 15})`)       // HINT: Place this at the bottom middle edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .text("COUNT (NUM OF MOVIES COLLABORATED)");

    svg3.append("text")
        .attr("transform", `translate(-120, ${(graph_3_height - margin.top - margin.bottom) / 2})`)       // HINT: Place this at the center left edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .text(" (DIRECTOR/ACTOR)");

    svg3.append("text")
        .attr("transform", `translate(${(graph_3_width  - margin.left - margin.right) / 2}, ${-10})`)       // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .text("Most Frequent Director/Actor Combination");
    


    


    
   function topPairs2(data){
    var numData = data.length;
    var dirDict = {};//will map a directoractor: num occurences 
    var i;
    for (i=0; i<numData;i++){
        t = data[i].type.trim();
        
        if(t == "Movie"){
        dir = data[i].director.split(',')//list of directors
        act = data[i].cast.split(',') //list of actors 
        //console.log(dir)
        //console.log(act)
        var x;
        for (x=0;x<dir.length;x++){ //iterates each director
            dstring=dir[x].trim();
            var j;
            for (j=0;j<act.length;j++){
                astring=act[j].trim();
                if (astring!=="" && dstring!=="" ){
                combString = dstring + " and "+ astring;
                if (combString in dirDict){
                    dirDict[combString]+=1;

                }else{
                    dirDict[combString]=1;
                }
            }
            }

            
        }
        }
        

        /*
        var x;
        for (x=0;x<dir.length;x++){
            //movie_genres[x]= movie_genres[x].trim();
        }
        //console.log(movie_genres)
        //trim and retrieve appropriate genres
        var j;
        for (j=0; j<data[i].listed_in.length;j++){
            //this checks to see if any of the currently examined movies 
            //matches a currently listed genre
            if (movie_genres[j] in genre){
                genre[movie_genres[j]]+=1;
            }else{
                genre[movie_genres[j]]=1;
            }

        }*/
    }
    //console.log(dirDict)
    return dirDict

}



    function topPairs(data){
        var numData = data.length;
        var dirDict = {};//will map a director to a dictionary corresponding to actors: num movies 
        var i;
        for (i=0; i<numData;i++){
            t = data[i].type.trim();
            
            if(t == "Movie"){
            dir = data[i].director.split(',')//list of directors
            act = data[i].cast.split(',') //list of actors 
            //console.log(dir)
            //console.log(act)
            var x;
            for (x=0;x<dir.length;x++){ //iterates each director
                dir[x]=dir[x].trim();
                if(dir[x]in dirDict){ //{dir:{} ,dir2:{}...}
                    for (j=0;j<act.length;x++){ //iterate through actors
                        act[j]=act[j].trim();
                        
                        if(act[j] in dirDict[dir[x]]){
                            dirDict[dir[x]][act[j]] +=1;
                        } else{
                            dirDict[dir[x]][act[j]] =0;
                            dirDict[dir[x]][act[j]] +=1;
                        }

                    }

                }else{    
                    dirDict[dir[x]] = {};
                    //console.log(dirDict)
                    for (j=0;j<act.length;x++){ //iterate through actors
                        act[j]=act[j].trim();
                        
                        if(act[j] in dirDict[dir[x]]){
                            dirDict[dir[x]][act[j]] +=1;
                        } else{
                            dirDict[dir[x]][act[j]] =0;
                            dirDict[dir[x]][act[j]] +=1;
                        }

                    }
                }
            }
            }
            //console.log(dirDict)

            /*
            var x;
            for (x=0;x<dir.length;x++){
                //movie_genres[x]= movie_genres[x].trim();
            }
            //console.log(movie_genres)
            //trim and retrieve appropriate genres
            var j;
            for (j=0; j<data[i].listed_in.length;j++){
                //this checks to see if any of the currently examined movies 
                //matches a currently listed genre
                if (movie_genres[j] in genre){
                    genre[movie_genres[j]]+=1;
                }else{
                    genre[movie_genres[j]]=1;
                }

            }*/
        }

    }
    function avgRelease(data){
        var total = {}
        var toDiv = {}
        var avg = {}
        
        var numData = data.length;
        var i;
        for (i=0; i<numData;i++){ //iterate through all and get year, then add hours into that dictionary spot
            t = data[i].type.trim();
            
            if(t == "Movie"){
            //console.log(t)

            year = data[i].release_year.trim();
            
            toAdd = data[i].duration.trim();
            min = toAdd.split(" min");
            dur = min[0].trim();
            newdur = parseInt(dur);
            if ( year in total){ //if its in dictionary
                total[year]+= newdur
                toDiv[year]+=1
            }else{
                total[year] = 0
                toDiv[year]=1
                total[year]+= newdur

            }
        }
        allYears = Object.keys(total);
        for (j=0;j<allYears.length;j++){
            yr = allYears[j];
            s = total[yr]
            d = toDiv[yr]
            result = s/d 
            avg[yr]= result;
        }
        

        }
        //console.log(toDiv);
        //console.log(total)
        //console.log(avg)
        return avg

    }
    function parseGenre(data){
        var genre = {} //use dictionary to take advantage of unique key 
        var numData = data.length;
        //iterate through each of the data rows
        //console.log(numData)
        var i;
        for (i=0; i<numData;i++){
            movie_genres = data[i].listed_in.split(',')
            var x;
            for (x=0;x<movie_genres.length;x++){
                movie_genres[x]= movie_genres[x].trim();
            }
            //console.log(movie_genres)
            //trim and retrieve appropriate genres
            var j;
            for (j=0; j<data[i].listed_in.length;j++){
                //this checks to see if any of the currently examined movies 
                //matches a currently listed genre
                if (movie_genres[j] in genre){
                    genre[movie_genres[j]]+=1;
                }else{
                    genre[movie_genres[j]]=1;
                }

            }
        }
        //console.log(genre)
        genre['undefined']=0;
        return genre

    }
});



