var GRAPH = document.getElementById('graph');
Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/3d-line1.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) 
        { return row[key]; }); 
    }

    function unpack2(rows, key) {
        return rows.map(function(row) 
        { return row[key]*0.5; }); 
    }
        
        
    var x = unpack(rows , 'x');
    var y = unpack(rows , 'y');
    var z = unpack(rows , 'z'); 
    var c = unpack(rows , 'color');

    var x2 = unpack2(rows , 'x');
    var y2 = unpack2(rows , 'y');
    var z2 = unpack2(rows , 'z'); 

    var data = [{
        type: 'scatter3d',
        mode: 'lines',
        x: x,
        y: y,
        z: z, 
        opacity: 1,
        line: {
            width: 6,
            color: c,
            reversescale: false
          }
    },{
        type: 'scatter3d',
        mode: 'lines',
        x: x2,
        y: y2,
        z: z2,
        opacity: 1,
        line: {
            width: 6,
            color: c,
            reversescale: false
          }
    }];

    var layout = {
        xaxis: {
            title: 'Time'
        },
        yaxis: {
            title: 'Frequency'
        },
        zaxis: {
            title: 'Amplitude'
        }
    };

    Plotly.plot( 'graph', data, layout, {responsive: true});
});