const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('id')

let posts  = [] 

const getPosts = async () => {
    const res =  localStorage.getItem('posts')
    posts = res ? JSON.parse(res) : []
}

getPosts()


const handlePostDetail = async () => {

    if (posts.length > 0) {
        const post = posts[postId]
        
        const img = document.createElement('img')
        const h1 = document.createElement('h1')
        const h3 = document.createElement('h3')
        const content = document.createElement('div')

        const container = document.createElement('div')

        img.setAttribute('src', post.imgUrl)
        h1.innerHTML = post.title 
        h3.innerHTML = post.description
        content.innerHTML = post.content
        container.appendChild(img)
        container.appendChild(h1)
        container.appendChild(h3)
        container.appendChild(content)

        document.getElementById('post-detail').appendChild(container)

    }else{
        document.getElementById('post-detail').innerHTML = `Posts not found!`
    }
}

handlePostDetail()