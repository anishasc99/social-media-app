const urlPost="https://anishasc99.github.io/social-media-app-API/db.json";
const urlUser="https://anishasc99.github.io/social-media-app-API/db.json";
var connections;
var page;
var myCurrentPost=-1;
var updatePost=false;
const userMap = new Map();
uid=1;


// let createNode=(element)=>{
//     return document.createElement(element);
// };

// let append=(parent,child)=>{
// return parent.appendChild(child);
// };
document.addEventListener('click',(e)=>{
    if (e.target && e.target.id==="myPost"){
        console.log("%%");
        document.querySelector("#myFeed").innerHTML="";
        document.querySelector(".yourFeedTitle").innerHTML="My Posts";
        localStorage.setItem('currentPage','myPosts');
        getMyPosts();
    } else if (e.target && e.target.id==="myFeedBtn"){
        document.querySelector("#myFeed").innerHTML="";
        document.querySelector(".yourFeedTitle").innerHTML="Your Feed";
        localStorage.setItem('currentPage','myFeed');
        getFeedData();
    } else if (e.target && e.target.id==="edit-btn"){
        let card = e.target.parentNode.parentNode;
        let id = parseInt(card.id);
        document.querySelector('#title-name').value = card.querySelector(".card-title").innerText;
        document.querySelector('#description-text').value = card.querySelector(".post-desc").innerText;
        myCurrentPost = id;
        updatePost=true;
        document.querySelector('#staticBackdropLabel').innerHTML = "Update Your Post"
    } else if (e.target && e.target.id ==="addPost"){
        document.querySelector('#staticBackdropLabel').innerHTML = "Add New Post"
        document.querySelector('#newPostForm').reset();
    } else if (e.target && e.target.id==="delete-btn"){
        let card = e.target.parentNode.parentNode;
        let id = parseInt(card.id);
        deleteMyPost(id);
    }
});

const myFeed=document.querySelector("#myFeed");
const getUsersAndUpdateFeed = () =>{
    fetch(urlUser)
    .then(data=>{
        //console.log(data);
        return data.json();
    })
    .then(result=>{
        console.log(result);
        result.user.forEach(element => {
           console.log(element.following);
           let name = element.firstName + " " + element.lastName;
           userMap.set(element.id,name);
           if (element.id == uid){
            connections=element.following;            
           }    
           //console.log(connections);  
        });
        console.log(page);
        if(page==="myFeed"){
            document.querySelector("#middle-title").innerHTML="Your Feed";
            getFeedData();
        }else if(page==="myPosts"){
            document.querySelector("#middle-title").innerHTML="My Posts";
            getMyPosts();
        }
    });
}


const getFeedData = () =>{
    fetch(urlPost)
    .then(data=>{
        return data.json();
    })
    .then(result=>{
        //console.log(result.user);
        result.post.forEach(element => {
           let postCard = document.createElement('div');
           console.log(element);
           let username = userMap.get(element.uId);

           var today = new Date(element.timeStamp * 1000);
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            //document.write(today);

            console.log("Today"+today);

           let content =`<div class="card cardstyle">
           <p class="card-text"><span id="uName">${username}</span><span id="update-text"> updated a post</span></p>
           <p class="card-text">${today}</p>
           <img src=${element.imgURL} class="card-img-top image" alt="image">
           <div class="card-body">
             <h5 class="card-title">${element.title}</h5>
             <p class="card-text">${element.desc}</p>
             <p class="card-text"><i class="bi bi-hand-thumbs-up-fill"></i> &nbsp; ${element.likes}</p>
           </div>
       </div>
       <br>`    
       console.log(connections); 
       console.log(userMap);
       if (connections.includes(element.uId)){
        postCard.innerHTML=content;
        append(myFeed,postCard); 
       }  
        });
    });
}

const getMyPosts = () =>{
    fetch(urlPost)
    .then(data=>{
        return data.json();
    })
    .then(result=>{
        console.log(result);
        result.post.forEach(element => {
           let postCard = document.createElement('div');
           console.log( element.title); 
           let username = userMap.get(element.uId);

           var today = new Date(element.timeStamp * 1000);
           var dd = String(today.getDate()).padStart(2, '0');
           var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
           var yyyy = today.getFullYear();

           today = dd + '/' + mm + '/' + yyyy;
           //document.write(today);

           let content =`<div class="card cardstyle" id=${element.id}>
           <p class="card-text"><span id="uName">${username}</span><span id="update-text"> updated a post</span>
           <button class="btn btn-outline-danger delete-post" id="delete-btn"><i class="bi bi-trash"></i></button>
           <button class="btn btn-light edit-post" id="edit-btn"
           data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-square"></i></button>
           
           </p>
           <p class="card-text">${today}</p>
           <img src=${element.imgURL} class="card-img-top image" alt="image">
           <div class="card-body">
             <h5 class="card-title">${element.title}</h5>
             <p class="card-text post-desc">${element.desc}</p>
             <p class="card-text"><i class="bi bi-hand-thumbs-up-fill"></i> &nbsp; ${element.likes}</p>
           </div>
       </div>
       <br>`        
       console.log(connections); 
       console.log(userMap);
       if (element.uId == uid){
        postCard.innerHTML=content;
        append(myFeed,postCard); 
       }  
        });
    });
}


if(!localStorage.getItem('currentPage')){
    // console.log(localStorage.getItem('currentPage'));
    localStorage.setItem('currentPage','myFeed');
}else{
    console.log(localStorage.getItem('currentPage'));
    page = localStorage.getItem('currentPage');
}
getUsersAndUpdateFeed();