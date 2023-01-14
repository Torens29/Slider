const slider = document.querySelector(".slider")
const urlImg=[
    "url(img/1.jpeg)",
    "url(img/2.jpg)",
    "url(img/3.jpg)",
    "url(img/4.jpg)",
    "url(img/5.png)",
    "url(img/6.jpg)",
    
]
const nav = document.querySelectorAll(".nav");

let slide = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
slide.forEach(item =>{
    item.className='item';
})

let circle = []
for(let i = 0; i<urlImg.length; i++){
    circle[i]= document.createElement("div");
    circle[i].className='circle';
    circle[i].id=i+1;
    circle[i].style.left = 200+i*15+1+"px";
    circle[i].addEventListener("click", e => goToSlide(e.target.id))
    slider.append(circle[i]);
}


nav[0].addEventListener("click",()=> back(slide[0].id));
nav[1].addEventListener("click", ()=> next(slide[2].id));



function back(goToId){
    console.log(goToId);

    slide[0].style.right = "100%"
    anim("toRight", 0);
    setTimeout(()=> initImg(goToId),1000)
    
}

function next(goToId){
    console.log(goToId);

    slide[2].style.right = "-100%"
    anim("toLeft", 2)
    setTimeout(()=>initImg(goToId),1000);
    
}

function anim(direction, nextSlide){
    console.log(nextSlide,"nextSlide");

    slide[nextSlide].style.zIndex=1;
    slide[nextSlide].classList.add(direction);
    slide[1].classList.add(direction);
    setTimeout(()=>{
        slide[nextSlide].classList.remove(direction);
        slide[1].classList.remove(direction);
    },1000)
}

function goToSlide(goToId){
    if(Number(slide[1].id) < goToId){
        slide[2].style.backgroundImage = urlImg[goToId-1];
        setTimeout(()=>next(goToId),500) 
    }else
    if(slide[1].id > goToId){
        slide[0].style.backgroundImage =urlImg[goToId-1];
        setTimeout(()=>back(goToId),500) 
       
    }

}


function initImg(n){
    n--;
    slide.forEach((item, i) =>{ 
        switch(n+i){
            case urlImg.length+1:
                    item.style.backgroundImage = urlImg[0];
                    slide[i].id = 1;  
                    break;
            case urlImg.length+2:
                    item.style.backgroundImage = urlImg[1];
                    slide[i].id = 2; 
                    break;
            case 0: 
                    item.style.backgroundImage = urlImg[urlImg.length-1];
                    slide[i].id = urlImg.length;
                    break;
            case -1: 
                    item.style.backgroundImage = urlImg[urlImg.length-2];
                    slide[i].id = urlImg.length-1;
                    break;
            default: 
                    item.style.backgroundImage = urlImg[n+i-1];
                    slide[i].id = n+i;
                    break;
        }
        slider.append(slide[i]);
    })
    slide[1].style.zIndex=1;
    circel= circle.map(item => {
        item.classList.remove("circleSelect");
    });
    circle[Number(slide[1].id-1)].classList.add("circleSelect");

}

initImg(3);