// Solution to the 99 Bottles Challenge--Section_10_135

/** let numberOfBottles = 99;
while (numberOfBottles >= 0) {
    let bottleWord = "bottle";
    if(numberOfBottles === 1){
        bottleWord ="bottle";
    }
    console.log(numberOfBottles + " " + bottleWord + " of beer on the wall");
    console.log(numberOfBottles + " " + bottleWord + " of beer,");
    console.log("Take one down, pass it around,");
	numberOfBottles--;
    console.log(numberOfBottles + " " + bottleWord + " of beer on the wall.");
    numberOfBottles--;
} --*/

//Solution for Fibonacci Array 

function fibonacciGenerator (n) {

    let output = [];
    if (n === 1) {
        output = [0];
    } else if(n === 2) {
        output = [0,1];
    } else {
        output = [0,1];
        for(let i = 2; i < n; i++) {
            output.push(output[output.length - 2] + output[output.length - 1]);
        }
    }
    return output;
}

