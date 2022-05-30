let container = document.getElementById("arr-container");
let num_of_elements = 8;//remember to adjust the time accordingly
let cGap = 4;
let arr = [];
// container.style.backgroundColor = "#6b5b95";






//creates new list
async function newList(){

    //empties container
    document.getElementById("arr-container").innerHTML = "";


    for (let i = 0; i < num_of_elements; i++){

        let value = Math.ceil(Math.random() * 15);
        arr.push(value);


        let elem = document.createElement("div");

        elem.classList.add("elems");

        elem.style.height = `2.5rem`;
        elem.style.width = `2.5rem`;
        elem.style.borderRadius = `50%`;
        elem.style.backgroundColor = `white`;
        elem.style.opacity = `.65`;
        elem.style.boxShadow = `10px 0px 38px var(--primary-color), 0px 0px 50px var(--neutral-color)
        `;
        elem.style.textAlign = `center`;
        container.style.columnGap = `${cGap * 0.1}rem`


        let elem_label = document.createElement("p");
        elem_label.classList.add("elem_id");
        elem_label.innerText = value;


        elem.appendChild(elem_label);
        container.appendChild(elem);
    }
    
}

newList()
// ------------------------------------------------






let swapped_indices = [];//array of arrays that has all the swapped indices of all rounds.
let round_indices = [];//array that temporarily stores the swapped indices of each round.
let all_indices = [];//array to compare the indices of the swapped ones with.
let no_of_rounds = 0;
let elements = document.querySelectorAll(".elems");


function createArrayToCompare(){
    for(i = 0; i < num_of_elements-1; i++){
        all_indices.push(i);
        all_indices.push(i+1);
    }
}
createArrayToCompare();


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
// console.log(swapped_indices);
// console.log(all_indices);
// ----------------------------------------------------------







let a = b = 0;
let ctr = 8;


function sort(index){
    if(index < (no_of_rounds)){
        a = index;
        b = 0;
        // console.log("I am still running.");
        round_sort(0);
    }
    else{
        for(let i in elements){
            elements[i].style.backgroundColor = `var(--action-color)`;
        }
        return;
    };

    setTimeout(function() {

        ctr--;
        sort((index+1));
    
    }, ((ctr -1) * 2500));
};



let t = t2 = 0;
let temp;

async function round_sort(i){
    if(i < ((num_of_elements- 1)*2)){

        b = i;
        let s = false;
        if(swapped_indices[a][b] == all_indices[b] && swapped_indices[a][b+1] == all_indices[b+1]){
            s = true;
        }

        t = all_indices[b];
        t2 = all_indices[b+1];

        if (s == true){
            // animate
            // console.log(t +","+ t2);
            elements[t].style.backgroundColor = `red`;
            elements[t2].style.backgroundColor = `red`;

            elements[t].style.animation = `swap-right 1s`;
            elements[t2].style.animation = `swap-left 1s`;

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 1000)
            ); 



            temp = elements[t].firstChild.innerText;
            elements[t].firstChild.innerText = elements[t2].firstChild.innerText;
            elements[t2].firstChild.innerText = temp;

            elements[t].style.animation = `none`;
            elements[t2].style.animation = `none`;

            elements[t].style.backgroundColor = `white`;
            elements[t2].style.backgroundColor = `white`;

        }
        else if (t2 != ctr){
            //animate
            // console.log(ctr);
            // console.log(t +","+ t2);
            elements[t].style.backgroundColor = `var(--primary-color)`;
            elements[t2].style.backgroundColor = `var(--primary-color)`;

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 1000)
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
    setTimeout(function() {

        round_sort((i+2));
    
    }, 1100);
    
};

sort(0);

// let width = window.innerWidth;

// function bubbleRandomizer(){

//     let bubbles = document.querySelectorAll(".bubbles");
//     let v = 0;


//     for(let i = 1; i <= bubbles.length; i++){
//         v = Math.ceil(Math.random() * width);
//         document.getElementById("bubble-" + i).style.left = `${v}px`;
//     };

    
// }

// function repeater(){
//     setTimeout(function() {

//         bubbleRandomizer();
//         repeater();
    
//     }, 10000);
// }

// repeater();