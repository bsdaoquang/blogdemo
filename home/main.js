// nav background
let posts = []
const res = localStorage.getItem('posts')
     posts = res ? JSON.parse(res) : []
     console.log(posts);
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0)
})
//Filter
$(document).ready(function () {
    $(".filter-item").click(function () {
        const value = $(this).attr("data-filter");
        if (value === "food"){
            const postsFood = posts.filter((item) =>{
                return item.category.includes('food')
            })
            console.log(postsFood);
        }
    });
    $(".filter-item").click(function () {
        $(this).addClass("active-filter").siblings().removeClass("active-filter")
    });
});


const handleShowPosts = () => {
    if (posts.length > 0) {
        posts.forEach((post, index) => {

            const datetime = new Date(post.createdAt)

            const postContent = document.createElement('div')
            postContent.setAttribute('class', ' col-4')
            postContent.setAttribute('id',`posts${index}`)
            postContent.setAttribute('style', 'padding: 0 10px')
            const newPost = `
            <div class="post-box food">
            ${post.imgUrl ? `<img src="${post.imgUrl}" alt="" class="post-img">` : ''}
            <a href="/posts/categories.html?catname=${post.category}"><h2 class="category category-text">${post.category}</h2></a>
            
            <a href="/posts/post-detail.html?id=${index}" class="post-title">${post.title}</a>
            <span class="post-date">${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}</span>
            <p class="post-description">${post.description}</p>
            <div class="profile">
                <img src="https://social.webestica.com/assets/images/avatar/04.jpg" alt="" class="profile-img">
                <span class="profile-name">judy</span>
            </div>
            <button onclick=handleRemove(${index})><i class="fa-solid fa-xmark"></i></button>
           </div>
            `
            
             postContent.innerHTML = newPost

             document.getElementById('post-container').appendChild(postContent)

       
        })
    }
}

handleShowPosts()
function handleRemove(index){
    posts.splice(index,1)
    localStorage.setItem('posts',JSON.stringify(posts))
    document.getElementById(`posts${index}`).remove()
}