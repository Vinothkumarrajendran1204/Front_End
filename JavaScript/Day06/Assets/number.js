console.log("Fibo");

let num1 = 20;

let value1=0;

let value2 = 1;

for (let i = 1 ; i <=num1 ; i++){

    console.log(value1);

    let sum = value1 + value2;

    value1 = value2;

    value2 = sum;
    
}





console.log("Prime");


let a = 100;


for(i = 2; i<= a; i++){
    
    let count = 0;

    for (j = 1; j<=a;j++){

        if( i % j === 0){

            count++;

        }
    }

    if(count === 2){

    console.log(i);
    
    }

}





console.log("Fact");

 let x = 10 ;

 let fact = 1;

 for(let i = 1; i<= x; i++){

    fact = fact*i
 }
 console.log(fact);
 