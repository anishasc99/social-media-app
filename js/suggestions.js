document.addEventListener('click',(e)=>{
    if(e.target && e.target.id==="unfollow"){
        let user = e.target.parentNode.parentNode.parentNode;
        document.querySelector('#following').removeChild(user);
        let userId = parseInt(user.id);
        user.querySelector('#unfollow').innerText = '+';
        user.querySelector('#unfollow').classList.remove('btn-outline-danger');
        user.querySelector('#unfollow').classList.add('btn-outline-success');
        user.querySelector('#unfollow').id = 'follow';
        user.querySelector('#follow').innerText = 'Follow';
        document.querySelector('#suggestions').appendChild(user);
        removeFollowing(userId);
    } else if (e.target && e.target.id==="follow"){
        let user = e.target.parentNode.parentNode.parentNode;
        document.querySelector('#suggestions').removeChild(user);
        let userId = parseInt(user.id);
        user.querySelector('#follow').innerText = 'x';
        user.querySelector('#follow').classList.remove('btn-outline-success');
        user.querySelector('#follow').classList.add('btn-outline-danger');
        user.querySelector('#follow').id = 'unfollow';
        user.querySelector('#unfollow').innerText = 'Unfollow';
        document.querySelector('#following').appendChild(user);
        addFollower(userId);
    } 
});


const getAllUsers = async (id)=>{
    let response = await fetch("https://anishasc99.github.io/social-media-app-API/db.json");
    result = await response.json();
    console.log(result);
    addFollowing(result,id);
    addSuggestions(result,id);
}

const addFollowing = (result,id) =>{
    let htmlString = "";
    let currentUser = getCurrentUser(id);
    result.user.forEach(user=>{
        if(user.id != id && currentUser.following.includes(user.id)){
            htmlString+=`
            <div class="col-12" id="${user.id}" >
                <div class="row user-card">
                    <div class="col-3 col-sm-3">
                        <img src="${user.profilePic}" class="user-card-image align-vertical-center"></img>    
                    </div>
                    <div class="col-9 col-sm-9 user-card-name hide-overflow">
                        ${user.firstName} ${user.lastName}<br>
                        <span class="user-card-bio">
                        ${user.bio}
                        </span>
                        <br>    
                        <button class="btn btn-outline-danger user-card-btn" id="unfollow">Unfollow</button>
                    </div>
                </div>
            </div>
             `;
        }
    });
    document.querySelector('#following').innerHTML += htmlString;
}
const addSuggestions = (result, id) =>{
    let htmlString = "";
    let currentUser = getCurrentUser(id);
    result.user.forEach(user=>{
        if(user.id != id && !currentUser.following.includes(user.id)){
            htmlString+=`
            <div class="col-12" id="${user.id}">
                <div class="row user-card">
                    <div class="col-3 col-sm-3">
                        <img src="${user.profilePic}" class="user-card-image align-vertical-center"></img>    
                    </div>
                    <div class="col-9 col-sm-9 user-card-name hide-overflow">
                        ${user.firstName} ${user.lastName}<br>
                        <span class="user-card-bio">
                        ${user.bio}
                        </span>
                        <br>    
                        <button class="btn btn-outline-success user-card-btn" id="follow">Follow</button>
                    </div>
                </div>
            </div>
             `;
        }
    });
    document.querySelector('#suggestions').innerHTML += htmlString;
}

const getCurrentUser = (id) => {
    let currentUser = {}
    result.user.forEach(user => {
        if(user.id === id){
            currentUser=user;
        }
    });
    return currentUser;
}

const removeFollowing = async (id) =>{
    console.log(id);
    let user = getCurrentUser(currentUserId);
    console.log(user);
    const index = user.following.indexOf(id);
    if (index > -1) {
        user.following.splice(index, 1);
    }
    console.log(user);
    const data_header={
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(user)
    };
    let response = await fetch(`http://localhost:3000/user/${currentUserId}`,data_header);
}

const addFollower = async (id) =>{
    console.log(id);
    let user = getCurrentUser(currentUserId);
    console.log(user);
    user.following.push(id)
    console.log(user);
    const data_header={
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(user)
    };
    let response = await fetch(`http://localhost:3000/user/${currentUserId}`,data_header);
}


const currentUserId = 1;
getAllUsers(currentUserId);