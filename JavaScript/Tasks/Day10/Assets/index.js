function calculateMarks(...markValues) {

    let totalMarks = 0;

    for (let i = 0; i < markValues.length; i++) {
        totalMarks = totalMarks + markValues[i];
    }

    return totalMarks;
}

console.log(calculateMarks(80, 85, 90));





const firstSet = [10, 20, 30];

const secondSet = [...firstSet, 40, 50];

console.log(secondSet);




