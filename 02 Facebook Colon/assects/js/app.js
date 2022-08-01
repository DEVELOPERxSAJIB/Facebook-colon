// get elements
const post_add_form = document.getElementById('post_add_form');
const msg = document.querySelector('.msg');
const all_post = document.querySelector('.all-post');




// All post from LS
const getAllPost = () => {
    let data = readLSData('fb_post');
    let list = '';

    if(!data) {
        all_post.innerHTML = `<div class="text-center card post-modal-area"><div class="card-body shadow-sm">No Post Found</div></div>`;
        return false
    }
    
    if (data) {
        
        data.reverse().map((item, index) => {
            list += `
            
            <div class="post-timeline-area">
                <div class="card shadow-sm mb-3 border-ofcard">
                    <div class="card-body">
                        <div class="post-auth-area">
                            <div class="user-info">
                                <img src="${item.aphoto}" alt="">
                                <div class="details">
                                    <span class="d-block" style="font-weight: bold; margin-top: -3px;">${item.aname}</span>
                                    <span class="d-block">2h . <i class="fas fa-globe-americas"></i></span>
                                </div>
                            </div>
                            <div class="dropdown">
                                <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item edit-btn" href="#single_post_update" data-bs-toggle="modal">Edit</a></li>
                                <li><a class="dropdown-item post-dlt" href="#" post_id=${item.id}>Delete</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="post-content-area mt-3">
                            <p>${item.pcontent}</p>
                        </div>
                    </div>
                    <img class="w-100" src="${item.pphoto}" alt="">
                </div>
            </div>
            
            `
        });

        all_post.innerHTML = list;
    }

    

}

getAllPost();




// post form submit
post_add_form.onsubmit = (e) => {
    e.preventDefault();

    // form data get
    const form_data = new FormData(e.target);
    const postData = Object.fromEntries(form_data.entries());
    const {aname, aphoto, pcontent, pphoto} = Object.fromEntries(form_data.entries());

    // create random ID
    let randID = Math.floor(Math.random() * 1000) + '_' + Date.now();

    // form validation
    if(!aname || !aphoto || !pcontent || !pphoto) {
        msg.innerHTML = setAlert('All feilds are required');
    } else {
        createLSData('fb_post', { ...postData, id : randID});
        e.target.reset();
        getAllPost();
    }
}


// Delete Post
all_post.onclick = (e) => {
    e.preventDefault();

    // post delete
    if(e.target.classList.contains('post-dlt')){
        // get post ID
        const postID = e.target.getAttribute('post_ID')

        // get all post
        const post = readLSData('fb_post')

        // deleted data
        const deleted_data = post.filter(data => data.id !== postID);

        // update up data
        uploadLSData('fb_post', deleted_data);
        getAllPost();

    }
}


