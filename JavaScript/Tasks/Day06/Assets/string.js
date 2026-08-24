let a = 20;

let result1 = "";

for (let i = 1; i <= a; i++){

    result1 += i + " ";
    
}
console.log(result1);


let b= 50;

let result2 = "";

for (let i = 1; i <= b; i++){

    if (i%2===0) {
        result2 += i + " ";
    }
    
}
console.log(result2);



let c= 50;

let sum= 0;

for (i=1;i<=c;i++){

    if(i%2===0){
        sum=sum+i
    }
}
console.log(sum);



let d  = 100;

let count = 0;

for (i=1;i<=d;i++){

    if(i%2===0){
        count =count +1
    }
}

console.log(count);



for (i=1;i<=d;i++){

    if (i === 73){

        console.log("Fount",i);
        break;
        
    }    
}


let number = 12345;

