let array = [];//array holding a copy of the values shown on screen.
let animation = [];//array to restart animation.

//assigns the values of the passed array on the bubbles on screen.
function setValues(arr){
    for(let i = 0; i < 10; i++){
        document.getElementById("elem-" + i).innerHTML = arr[i];
        array.push(arr[i]);
        // console.log(array);
    }
}

//creates a new list and calls the setValues function.
function newList(){
    let arr = [];
    array = [];
    for (let i = 0; i < 10; i++){

        arr.push(Math.floor(Math.random() * 15));

    }
    setValues(arr);
    
}
function sort(){
    console.log(sortFunction(array));
}

//sorting function to sort the values seen on screen.
function sortFunction(a){
    stopAnimation();
    let temp = 0;
    let isSorted = false;
    while(!isSorted){
        isSorted = true;
        for(let i = 0; i < 9; i++){     
            if(a[i] > a[i+1]){
                temp = a[i];
                a[i] = a[i+1]
                a[i+1] = temp;
                isSorted = false;
            }
        }
    }
    return a;

}

//function to stop animation.
function stopAnimation(){
    for(let i = 0; i < 10; i++){
        document.getElementById("elem-" + i).style.animation = "none";
    }
    // console.log(animation);
}

// newList();
// console.log (sort())