// ===============================
// PAGE LOADING
// ===============================

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});




// ===============================
// MOBILE MENU
// ===============================

const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");


if(menuIcon){

menuIcon.addEventListener("click",()=>{

navLinks.classList.toggle("show");

});

}




// ===============================
// STICKY HEADER
// ===============================


const header = document.querySelector(".header");


window.addEventListener("scroll",()=>{


if(window.scrollY > 50){

header.classList.add("sticky");


}else{

header.classList.remove("sticky");

}


});






// ===============================
// SCROLL REVEAL
// ===============================


const sections =
document.querySelectorAll(
"section,.coffee-card,.why-card,.stat-box"
);



window.addEventListener("scroll",()=>{


sections.forEach(section=>{


const top =
section.getBoundingClientRect().top;


if(top < window.innerHeight - 100){


section.classList.add("show");


}


});


});



// ===============================
// STATISTICS COUNTER
// ===============================


const counters = document.querySelectorAll(".stat-box h2");

let counterStarted = false;


function counterAnimation(){


    if(counterStarted) return;



    counters.forEach(counter=>{


        let text = counter.innerText;


        let target = parseFloat(
            text.replace(/,/g,"").replace("+","")
        );



        let count = 0;


        let speed = target / 100;



        function update(){


            count += speed;



            if(count < target){


                if(target % 1 !== 0){

                    counter.innerText =
                    count.toFixed(1);


                }else{


                    counter.innerText =
                    Math.floor(count).toLocaleString() + "+";


                }



                requestAnimationFrame(update);



            }else{


                if(target % 1 !== 0){


                    counter.innerText =
                    target;


                }else{


                    counter.innerText =
                    target.toLocaleString() + "+";


                }


            }


        }



        update();



    });



    counterStarted = true;


}





// Scroll marka la gaaro

window.addEventListener("scroll",()=>{


    const statistics =
    document.querySelector(".statistics");


    if(statistics){


        const top =
        statistics.getBoundingClientRect().top;



        if(top < window.innerHeight - 100){


            counterAnimation();


        }


    }


});







// =================================
// FUNCTION SOO HELAYA COFFEE-GA MAANTA UGU BADAN LA IIBIYAY
// =================================


async function getCoffeeOfDay(){


    // JSON file-ka kasoo akhri xogta coffee-yada

    const response = await fetch("json.js");



    // JSON xogtiisa u beddel Array JavaScript ah

    const coffees = await response.json();




    // Ka dhex raadi coffee-ga leh tirada iibka ugu badan

    const mostSold = coffees.reduce((max, coffee)=>{


        // Haddii coffee-ga hadda la eegayo uu ka iib badan yahay kii hore
        // soo qaado isaga, haddii kale kii hore hayso


        return coffee.sold > max.sold 
        ? coffee 
        : max;



    });







    // Sawirka coffee-ga ugu iibka badan ku shub HTML-ka

    document.getElementById("dayImage").src =
    mostSold.image;





    // Magaca coffee-ga ku soo bandhig HTML-ka

    document.getElementById("dayName").innerText =
    mostSold.name;






    // Qiimaha iyo tirada la iibiyay ku soo bandhig HTML-ka

    document.getElementById("dayPrice").innerHTML =
    `
    ${mostSold.price}
    <br>
    🔥 ${mostSold.sold} koob ayaa maanta la iibiyay
    `;



}




// Marka website-ka la furo function-ka shaqee

getCoffeeOfDay();


//qaybta menu pageka




// MENU SEARCH & FILTER



const searchInput = document.getElementById("searchInput");

const filterButtons = document.querySelectorAll(".filter-btn");

const coffeeCards = document.querySelectorAll(".coffee-card");



// SEARCH FUNCTION

if(searchInput){


searchInput.addEventListener("keyup",()=>{


    let searchValue =
    searchInput.value.toLowerCase();



    coffeeCards.forEach(card=>{


        let name =
        card.querySelector("h3")
        .innerText
        .toLowerCase();



        if(name.includes(searchValue)){


            card.style.display="block";


        }else{


            card.style.display="none";


        }



    });



});


}






// FILTER FUNCTION


filterButtons.forEach(button=>{


button.addEventListener("click",()=>{


    // active button

    filterButtons.forEach(btn=>{

        btn.classList.remove("active");

    });


    button.classList.add("active");




    let filter =
    button.dataset.filter;




    coffeeCards.forEach(card=>{


        let category =
        card.dataset.category;



        if(filter==="all"){


            card.style.display="block";


        }

        else if(category===filter){


            card.style.display="block";


        }

        else{


            card.style.display="none";


        }



    });



});

});









// FAVORITES LOCAL STORAGE




const favoriteButtons =
document.querySelectorAll(".add-btn");



// xogta hore kasoo qaado

let favorites =
JSON.parse(localStorage.getItem("favorites"))
|| [];





favoriteButtons.forEach((button,index)=>{


button.addEventListener("click",()=>{


let card =
coffeeCards[index];


let coffeeName =
card.querySelector("h3").innerText;



// haddii uu jiro ka saar

if(favorites.includes(coffeeName)){


favorites =
favorites.filter(item=>item !== coffeeName);


button.innerHTML="Add to Favorites";

button.style.background="#3b1f0e";



}

// haddii uusan jirin ku dar

else{


favorites.push(coffeeName);


button.innerHTML="❤️ Added";


button.style.background="#c47a35";


}



// kaydi

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);



});



});




// marka page-ka la furo favorites muujin

favoriteButtons.forEach((button,index)=>{


let card =
coffeeCards[index];


let name =
card.querySelector("h3").innerText;



if(favorites.includes(name)){


button.innerHTML="❤️ Added";

button.style.background="#c47a35";


}


});

// ADVANCED CONTACT FORM VALIDATION



const contactForm = document.querySelector(".contact-form");


if(contactForm){



contactForm.addEventListener("submit",(e)=>{


e.preventDefault();



// Inputs


const nameInput =
contactForm.querySelector(
'input[type="text"]'
);


const emailInput =
contactForm.querySelector(
'input[type="email"]'
);


const subjectInput =
contactForm.querySelectorAll(
'input[type="text"]'
)[1];


const messageInput =
contactForm.querySelector(
"textarea"
);





const name =
nameInput.value.trim();


const email =
emailInput.value.trim();


const subject =
subjectInput.value.trim();


const message =
messageInput.value.trim();




// Clear old errors


clearErrors();





let isValid=true;





// =======================
// NAME VALIDATION
// =======================


if(name===""){


showError(
nameInput,
"Magaca waa lagama maarmaan"
);


isValid=false;


}

else if(name.length < 3){


showError(
nameInput,
"Magacu waa inuu ka badan yahay 3 xaraf"
);


isValid=false;


}

else if(!/^[a-zA-Z\s]+$/.test(name)){


showError(
nameInput,
"Magaca tirooyin ma yeelan karo"
);


isValid=false;


}







// =======================
// EMAIL VALIDATION
// =======================


const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;



if(email===""){


showError(
emailInput,
"Email-ka waa lagama maarmaan"
);


isValid=false;


}

else if(!emailPattern.test(email)){


showError(
emailInput,
"Email sax ah geli tusaale: user@gmail.com"
);


isValid=false;


}






// =======================
// SUBJECT VALIDATION
// =======================



if(subject===""){


showError(
subjectInput,
"Subject-ka geli"
);


isValid=false;


}

else if(subject.length < 5){


showError(
subjectInput,
"Subject-ku waa inuu ka badan yahay 5 xaraf"
);


isValid=false;


}







// =======================
// MESSAGE VALIDATION
// =======================



if(message===""){


showError(
messageInput,
"Fariinta geli"
);


isValid=false;


}

else if(message.length < 10){


showError(
messageInput,
"Fariintu waa inay ka badan tahay 10 xaraf"
);


isValid=false;


}







// Haddii qalad jiro jooji


if(!isValid){

return;

}






// =======================
// SAVE LOCAL STORAGE
// =======================



const contactData={


name:name,

email:email,

subject:subject,

message:message,

date:new Date()
.toLocaleString()


};





let messages =
JSON.parse(
localStorage.getItem("messages")
) || [];



messages.push(contactData);



localStorage.setItem(
"messages",
JSON.stringify(messages)
);






showSuccess(
"✅ Fariintaada si guul ah ayaa loo diray"
);




contactForm.reset();



});



}







// =======================
// SHOW ERROR
// =======================


function showError(input,message){



const parent =
input.parentElement;



const error =
document.createElement("small");



error.className="error-text";


error.innerText=message;



parent.appendChild(error);



input.classList.add("error-input");



}








// =======================
// CLEAR ERRORS
// =======================


function clearErrors(){


const errors =
document.querySelectorAll(
".error-text"
);


errors.forEach(error=>{

error.remove();

});



const inputs =
document.querySelectorAll(
".error-input"
);



inputs.forEach(input=>{

input.classList.remove(
"error-input"
);

});


}







// =======================
// SUCCESS MESSAGE
// =======================


function showSuccess(message){



const success =
document.createElement("div");



success.className=
"success-message";



success.innerText=message;



contactForm.prepend(success);




setTimeout(()=>{


success.remove();


},4000);



}