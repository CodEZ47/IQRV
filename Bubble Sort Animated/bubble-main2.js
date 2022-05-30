let array = [];//array holding a copy of the values shown on screen.
let arrayCopy = [];//copy of array.
let animation = [];//array to restart animation.
let elements;//array to store elements to be compared.
//assigns the values of the passed array on the bubbles on screen creating a copy of the array in the global variable.
function setValues(arr){
    for(let i = 0; i < 10; i++){
        document.getElementById("elem-" + i).innerHTML = arr[i];
        array.push(arr[i]);
        arrayCopy.push(arr[i]);
        // console.log(array);
    }

    elements = document.querySelectorAll(".arr");
}

//creates a new list and calls the setValues function.
function newList(){
    let arr = [];
    array = [];//empties the array for its next use
    arrayCopy = [];
    for (let i = 0; i < 10; i++){

        arr.push(Math.floor(Math.random() * 15));

    }
    setValues(arr);
    stopAnimation();
    
}
function sort(){
    console.log(sortFunction(array));
    animateUp(0);
}

//sorting function to sort the values seen on screen.
function sortFunction(a){
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
        elements.style.animation = "none";
    
    // console.log(animation);
}
//function to stop animation at a specific index and the next index
function stopAnimationByIndex(index){
    document.getElementById("elem-" + index).style.animation = "none";
    
}

let ctr = 5;
//function to animate the floating animation before comparision.
function animateUp(index){
    if(index < 9){
        document.getElementById("elem-" + index).style.animation = "bounce 2s";
        document.getElementById("elem-" + (index+1)).style.animation = "bounce 2s";
        elements[index].style.backgroundColor = "#FF4949";
        elements[index + 1].style.backgroundColor = "#FF4949";
        console.log("animation given to both");
        setTimeout(function() {

            stopAnimationByIndex(index);
            console.log("animation taken from first");
            elements[index].style.backgroundColor = "white";
            elements[index + 1].style.backgroundColor = "white";
        
        }, 2100);
        // ctr+=5;
        setTimeout(function() {

            stopAnimationByIndex((index+1));
            console.log("animation taken from second");
        
        }, 2100);
    }
    else{
        return;
    }
    
    setTimeout(function() {

        animateUp((index+1));
        console.log("next animation");
    
    }, 2500);
}

// newList();
// console.log (sort())

