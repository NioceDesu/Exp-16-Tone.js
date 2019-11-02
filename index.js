var synth = new Tone.Synth().toMaster();
var startIndex = 0;
const notes = ["A3", "C4", "D4", "E3", "G4"];

window.onload = () => {
    const DATA = {
        lines: 5,
        columns: 15,
        speed: 400
    };

    // 
    document.getElementById('btnC').addEventListener('click', () => {
        createTimeLine(DATA);
        // 
        /*setInterval(() => {
            console.log('f');
            synth.triggerAttackRelease('C2', '8n');
        }, 600);*/
    });
    document.getElementById('btnP').addEventListener('click', () => {
        if (document.getElementById('innerCont')) {
            console.log('Started!');
            // 
            TimeLineLooper(DATA);
        }
    });
    document.getElementById('btnS').addEventListener('click', () => {
        if (document.getElementById('innerCont')) {
            if (document.getElementsByClassName('tones')) {
                startIndex = 0;
                AnimationStart(DATA);
            }
        }
    });
    // 
    // 
    // 
}

function createTimeLine(DATA) {
    // 
    let innerCont = document.createElement('div');
    innerCont.id = "innerCont";
    // 
    for (let x = 0; x < DATA.lines; x++) {
        let innerLine = document.createElement('div');
        innerLine.setAttribute('class', 'lines');
        for (let y = 0; y < DATA.columns; y++) {
            let innerColumn = document.createElement('div');
            innerColumn.setAttribute('class', "columns");
            // innerColumn.innerText = (y + 1);
            // 
            innerLine.appendChild(innerColumn);
        }
        innerCont.appendChild(innerLine);
    }
    // 
    document.getElementById('cont').appendChild(innerCont);
}
// 
function TimeLineLooper(DATA) {
    var randomValues = [];
    const MaxTonesNB = 7;
    for (let i = 0; i < DATA.lines; i++) {
        randomValues.push(Math.floor(Math.random() * MaxTonesNB));
    }
    // console.log(randomValues);
    makePieces(DATA, randomValues);
}
// 
function makePieces(DATA, randomValues) {
    // Random Indexes
    var indexes = [];
    for (let i = 0; i < DATA.lines; i++) {
        var lines = [];
        let exist = false;
        for (let y = 0; y < randomValues[i]; y++) {
            do {
                var index = Math.floor(Math.random() * DATA.columns);
                for (let j = 0; j < lines.length; j++) {
                    if (lines[j] == index) {
                        exist = true;
                        j = lines.length;
                    } else
                        exist = false;
                }
                if (!exist) {
                    lines.push(index);
                    exist = false;
                }
            } while (exist);
        }
        indexes.push(lines);
    }
    console.log(indexes);
    TonesVisualizer(DATA, indexes);
}
// 
function TonesVisualizer(DATA, indexes) {
    // 
    let linesCount = 0,
        columnsCount = 0;
    var cols = document.getElementsByClassName('columns');
    // 
    clearShape();
    // 
    var txtArray = [];
    for (let i = 0; i < DATA.lines; i++) {
        var txt = "";
        for (let j = 0; j < DATA.columns; j++) {
            let res = false;
            indexes[i].forEach(element => {
                if (j == element)
                    res = true;
            });
            if (res) {
                txt += "#";
                // 
                var bPoint = document.createElement('div');
                bPoint.setAttribute('class', "tones");
                cols[columnsCount].appendChild(bPoint);
            } else
                txt += "-";
            columnsCount++;
        }
        txtArray.push(txt);
    }
    console.log(txtArray);
}
// 
function clearShape() {
    var cols = document.getElementsByClassName('columns');
    for (let i = 0; i < cols.length; i++) {
        cols[i].innerHTML = "";
    }
}
// 
function AnimationStart(DATA) {
    timeout(DATA);
    /*var cols = document.getElementsByClassName('columns');
    var lines = document.getElementsByClassName('lines');
    for (let i = 0; i < DATA.columns; i++) {
        for (let j = 0; j < DATA.lines; j++) {
            var lineCols = lines[j].children;
            // console.log(lineCols[i]);
            if (lineCols[i].children.length > 0) {
                console.log([i, j] + "| Filled");
                synth.triggerAttackRelease('C4', '8n');
            }
        }
    }*/
}
// 

function timeout(DATA) {
    setTimeout(function () {
        var lines = document.getElementsByClassName('lines');
        for (let j = 0; j < DATA.lines; j++) {
            var lineCols = lines[j].children;
            // console.log(lineCols[i]);
            if (lineCols[startIndex].children.length > 0) {
                console.log([startIndex, j] + "| Filled");
                synth.triggerAttackRelease(notes[j], '15n');
            }
        }
        startIndex++;
        if (startIndex < 15)
            timeout(DATA);

    }, 200);

}