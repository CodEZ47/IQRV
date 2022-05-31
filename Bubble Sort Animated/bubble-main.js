let container = document.getElementById("arr-container");//gets the main container that holds the elements
let num_of_elements = 8;//remember to adjust the time accordingly
let cGap = 4;//decides the gap between the elements
let arr = [];//array used to generate keys while it is sorted.







//creates new list
async function newList(){

    //empties container
    document.getElementById("arr-container").innerHTML = "";

    //empties array
    arr = [];

    for (let i = 0; i < num_of_elements; i++){


        //random value generator 1-15
        let value = Math.ceil(Math.random() * 15);

        //arr to be sorted
        arr.push(value);

        //creates a single element for each iteration
        let elem = document.createElement("div");

        //defines element class and style
        elem.classList.add("elems");
        elem.style.height = `2.5rem`;
        elem.style.width = `2.5rem`;
        elem.style.borderRadius = `50%`;
        elem.style.backgroundColor = `white`;
        elem.style.opacity = `.65`;
        elem.style.boxShadow = `10px 0px 38px var(--primary-color), 0px 0px 50px var(--neutral-color)
        `;
        elem.style.textAlign = `center`;

        //decides the amount of gap between elements
        container.style.columnGap = `${cGap * 0.1}rem`

        //creates the inner text for the bubble elements to be display on screen
        let elem_label = document.createElement("p");
        elem_label.classList.add("elem_id");
        elem_label.innerText = value;

        //appends the p tag in the element and appends elem in the container div
        elem.appendChild(elem_label);
        container.appendChild(elem);
    }
    
}
newList();
// async function generate(){
//     await new Promise((resolve) =>
//         setTimeout(() => {
//             resolve();
//         }, 1000)
//     );

//     newList();
// }

// ------------------------------------------------






let swapped_indices = [];//array of arrays that has all the swapped indices of all rounds.
let round_indices = [];//array that temporarily stores the swapped indices of each round.
let all_indices = [];//array to compare the indices of the swapped ones with.
let no_of_rounds = 0;//counts how many rounds it took the algorithm to solve the problem.
let elements = document.querySelectorAll(".elems");//all the created bubble elements.


//pushes all the indices to use for comparision in swapped indices
function createArrayToCompare(){
    for(i = 0; i < num_of_elements-1; i++){
        all_indices.push(i);
        all_indices.push(i+1);
    }
}
createArrayToCompare();


//sorts the passed array and pushes the swapped indices to swapped_indices
function solve(a){
    let temp = 0;
    let isSorted = false;
    while(!isSorted){
        isSorted = true;
        for(let i = 0; i < (num_of_elements-1); i++){     
            if(a[i] > a[i+1]){
                temp = a[i];
                a[i] = a[i+1]
                a[i+1] = temp;

                round_indices.push(i);
                round_indices.push(i+1);
                isSorted = false;
            }
            else{
                round_indices.push(-1);
                round_indices.push(-1);
            }
        }
        swapped_indices.push(round_indices);
        round_indices = [];
        no_of_rounds +=1;
    }
};

solve(arr);
// ----------------------------------------------------------







let a = b = 0;
let ctr = num_of_elements;//decrements everytime the sort function runs used to stop the animation checking the last elements for every round.
let delay = 100;//delay for everything except animations
let animateDelay = delay/1000;//delay for animation





//function runs the total number of times the solve function above looped, aka rounds
function sort(index){

    if(index < (no_of_rounds)){
        a = index;
        b = 0;
        round_sort(0);
    }
    else{
        
        //sorting done green color assigned to all elements
        for(let i = 0; i < ctr; i++){
            elements[i].style.backgroundColor = `var(--action-color)`;
        }
        return;
    };

    setTimeout(function() {

        //last elements for each round locked in.
        elements[ctr-1].style.backgroundColor = `var(--action-color)`;


        ctr--;
        sort((index+1));
    
    }, ((ctr -1) * delay*1.6));
};



let t = t2 = 0;
let temp;

async function round_sort(i){

    //since the array increments by two and has 2X the num_of_elements
    if(i < ((num_of_elements- 1)*2)){

        b = i;
        let s = false;

        if(swapped_indices[a][b] == all_indices[b] && swapped_indices[a][b+1] == all_indices[b+1]){
            s = true;
        }

        t = all_indices[b];
        t2 = all_indices[b+1];

        if (s == true){
            
            
            // animate when numbers are in the wrong order
            elements[t].style.backgroundColor = `red`;
            elements[t2].style.backgroundColor = `red`;

            elements[t].style.animation = `swap-right ${animateDelay}s`;
            elements[t2].style.animation = `swap-left ${animateDelay}s`;

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            ); 


            //swap innerTexts of compared elements
            temp = elements[t].firstChild.innerText;
            elements[t].firstChild.innerText = elements[t2].firstChild.innerText;
            elements[t2].firstChild.innerText = temp;
            
            //take away animations
            elements[t].style.animation = `none`;
            elements[t2].style.animation = `none`;

            //original color given
            elements[t].style.backgroundColor = `white`;
            elements[t2].style.backgroundColor = `white`;

        }
        else if (t2 != ctr){


            //animate when numbers are in correct order
            elements[t].style.backgroundColor = `var(--primary-color)`;
            elements[t2].style.backgroundColor = `var(--primary-color)`;

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
            elements[t].style.backgroundColor = `white`;
            elements[t2].style.backgroundColor = `white`;
        }
        else{
            return;
        };
    }
    else{
        return;
    };
    //delay inbetween individual comparision animations
    setTimeout(function() {

        round_sort((i+2));
    
    }, (delay*.3));
    
};

sort(0);
