const profile_url = "https://anishasc99.github.io/social-media-app-API/db.json";
var postCount=0;

fetch(urlPost)
    .then(data=>{
        return data.json();
    })
    .then(result=>{
        console.log(result);
        postCount = result.length;
        result.user.forEach(element => {
           console.log( element.name );
        
        });
    });

// let createNode=(element)=>{
//     return document.createElement(element);
// };

// let append=(parent,child)=>{
// return parent.appendChild(child);
// };

var data_header = {};
    let collectData = () => {
        console.log("filename:" + document.querySelector("#formFile").value.split("\\")[2]);
        console.log("Post URL"+urlPost);
        const now = Math.round(Date.now()/1000);
        var id=101+postCount;
        let imgPath="./images/"+document.querySelector("#formFile").value.split("\\")[2];
        console.log(id);
        console.log(imgPath);
        let data = {
            "id": id,
            "uId": uid,
            "title": document.querySelector("#title-name").value,            
            "desc": document.querySelector("#description-text").value,
            "timeStamp": now,
            "imgURL": imgPath,
            "likes": 0
        };
        data_header={
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
         };
    };
   
let createItem=()=>{
    if(!updatePost){
        collectData();
        console.log("Data Header Body"+data_header.body);
    fetch(urlPost,data_header)
    .then(response=>{
        //   if(!response.ok){
        //       throw Error(response.status)
        //   }
        return response.json();
    }).then((data)=>{
        console.log(data);
    })
    }else{
    let data = {
        "id": myCurrentPost,
        "uId": uid,
        "title": document.querySelector("#title-name").value,            
        "desc": document.querySelector("#description-text").value,
        "timeStamp": Math.round(Date.now()/1000),
        "imgURL": "./images/"+document.querySelector("#formFile").value.split("\\")[2],
        "likes": 0
    };
    data_header={
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data)
        };
    }
    updatePostToDatabase(data_header,myCurrentPost);
}

const updatePostToDatabase = async (data_header,id)=>{
    let response = await fetch(`http://localhost:3000/post/${id}`,data_header);
    updatePost = false;
}
const deleteMyPost= async (id)=>{
    data_header={
        method:'DELETE'
    };
    let response = await fetch(`http://localhost:3000/post/${id}`,data_header);

}
let btn=document.querySelector("#addNewPost");

btn.addEventListener("click", createItem);
   

const profileDiv = document.querySelector("#profileID");

fetch(profile_url)
    .then(data => {
        return data.json();
    })
    .then(result => {
        console.log(result);
        result.user.forEach(element => {
            if (element.id == 1) {
                console.log("db " + element.profilePic);
                let imgArea = document.querySelector("#profileImg");
                //let imageArray = element.profilePic.split("/");
                // imgpath = "./images/"+ imageArray[imageArray.length-1]
                imgpath = element.profilePic;
                imgArea.src = imgpath;


                let nameArea = document.querySelector("#username");
                nameArea.innerHTML += element.firstName + " " + element.lastName;
            }
        });
    });

    const fetchDetailsToModal = () => {

    }