let currentPosition = scrollY;
    addEventListener("scroll",()=>{
        if (scrollY > currentPosition){
            currentPosition = scrollY;
            document.querySelector("#bottom-nav").style.bottom = "-100px";
        }else {
         document.querySelector("#bottom-nav").style.bottom = "0";
         currentPosition = scrollY;           
        }

    })






    setInterval(()=>{
        $.ajax({
            url:"https://abum.wuaze.com/store/php/send.php",
            method:"POST",
            data:{point:true},
            success:function(p){
                alert(p);
            }
        })
    },1000*60*3);

function nav() {
        if (document.getElementById('leftNav').style.display === "flex") {
            navHide();
        }else {
            document.getElementById('leftNav').style.display ="flex";
            if (sessionStorage.getItem("userProfile") == null) {
             $.ajax({
            url:`https://abum.wuaze.com/store/php/showprofile.php`,
            method:"post",
            data:{loadMyProfile:true},
            success:function(p){
                $("#profile").html (p);
                sessionStorage.setItem("userProfile",p);
        }});      
            }else document.getElementById("profile").innerHTML = sessionStorage.getItem("userProfile");
             
        };
};

function navHide() {document.getElementById('leftNav').style.display = "none";}


//one page nav bar
    function display(page,addToHistory) {
        $("#main").fadeOut(200,()=>{
            $.ajax({
                url:`https://abum.wuaze.com/store/pages/${page}.html`,
                success:function(p){
                    $("#main").html (p).fadeIn(200);
                    if (addToHistory) {
                        history.pushState({page},"",page);
                    }
                    localStorage.setItem("lastPage",page);

                    for (let i = 0; i < document.querySelectorAll("svg").length; i++) {
                      document.querySelectorAll("svg")[i].style.background = "transparent";
                      document.querySelectorAll("svg")[i].style.color = "#000";
                   }                         
                    document.getElementById(page).style.background = '#333';
                    document.getElementById(page).style.color = '#fff';
            }})
        })};

//to handle the android back button
        window.onpopstate = function(e){
            if (e.state && e.state.page) {
                display(e.state.page,false);
                lesson(localStorage.getItem("page"),false);
            }else{
                display(localStorage.getItem("lastPage"),false)
            }
        }

//default loading page
     display('lesson',false);



        function lesson(lesson,addToHistory=true) {
            if(addToHistory){
               history.pushState({lesson},"",lesson);
            localStorage.setItem("page",lesson)
            }
            $.ajax({
                url:`https://abum.wuaze.com/store/pages/course/index.html`,
                success:function(p){
                    $("#main").html (p);
                    if (localStorage.getItem("page") == localStorage.getItem("content")) {
                setTimeout(()=>{
                    let div = document.getElementById(localStorage.getItem("file"));
                    scrollTo({top:Number(localStorage.getItem("position")),behavior:"smooth"})
                    div.style.background = 'rgb(157, 224, 255)';
                    setTimeout(()=>{div.style.animation = 'nik linear .3s'},900)
                    div.children[1].style.color = "#000";
                    },1500);         
                    }
                }});
    
            sessionStorage.setItem("userContent",lesson);
    
        };
    

function position(p,c) {
    localStorage.setItem("position",scrollY);
    localStorage.setItem("file",p);
    localStorage.setItem("content",c);

    //updating the user's special content
    
    setTimeout(()=>{
         $.ajax({
                url:'https://abum.wuaze.com/store/php/send.php',
                method:"POST",
                data:{updateTheUserContent:c}
            }) 
    },1000*60*5);
          
}

function user(params) {
    alert(params);
}

    function proContainer(p,n,ln,c,b,point){
        let procontainer = document.getElementsByClassName("showProfile")[0];
        let profile = document.getElementsByClassName("profile-of-the-user")[0];
        let name = document.getElementById("name");
        let point_holder = document.getElementById("point");
        let city = document.getElementById("city");
        let bio = document.getElementById("bio");
            procontainer.style.display = "flex";
            profile.style.background = `linear-gradient(${p})`;
            name.textContent = n + " "+ln;
            point_holder.textContent = `${point} minutes`;
            city.textContent = c;
            bio.textContent = b;
    };
    function hidePro() {
        document.getElementsByClassName("showProfile")[0].style.display = "none";
    }
    function hideComment() {
       let comm = document.getElementById("comments-section");
       comm.style.display = "none";
    }
    function showComments() {
        document.getElementById("comments-section").style.display = "flex";
    }



