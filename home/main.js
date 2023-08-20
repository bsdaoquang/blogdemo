// nav background
let posts = []
const res = localStorage.getItem('posts')
posts = res ? JSON.parse(res) : []
let header = document.querySelector("header");

window.addEventListener("scroll", () =>
{
    header.classList.toggle("shadow", window.scrollY > 0)
})
//Filter
$(document).ready(function ()
{
    $(".filter-item").click(function ()
    {
        const value = $(this).attr("data-filter");

        if (value == 'all') {
            handleShowPosts(posts, true)
        } else {

            const items = posts.filter(element => (element.category).toLowerCase() === value)

            handleShowPosts(items, true)
        }
    });
    $(".filter-item").click(function ()
    {
        $(this).addClass("active-filter").siblings().removeClass("active-filter")
    });
});


const handleShowPosts = (data, replace) =>
{

    const parrentChild = document.getElementById('post-container')

    if (data.length > 0) {

        const container = document.createElement('div')
        container.setAttribute('class', 'post container')

        data.forEach((post, index) =>
        {
            const postContent = document.createElement('div')

            const datetime = new Date(post.createdAt)

            postContent.setAttribute('class', ' col-4')
            postContent.setAttribute('id', `posts${index}`)
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

            container.appendChild(postContent)
        })


        if (replace) {

            parrentChild.replaceChild(container, parrentChild.children[0])
        } else {

            document.getElementById('post-container').appendChild(container)
        }
    } else {
        const emptyData = document.createElement('div')
        emptyData.setAttribute('class', 'container col mt-4 text-center')
        emptyData.innerHTML = 'Data not found'

        parrentChild.replaceChild(emptyData, parrentChild.children[0])
    }
}

handleShowPosts(posts)


function handleRemove(index)
{
    posts.splice(index, 1)
    localStorage.setItem('posts', JSON.stringify(posts))
    document.getElementById(`posts${index}`).remove()
}