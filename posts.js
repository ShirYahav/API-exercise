const userPosts = document.querySelector('.userPosts')
const buttonBackToTitles = document.querySelector('button')

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then((data) => renderTitles(data));

const getPostsComments = (postID) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postID}/comments`)
        .then(response => response.json())
        .then(dataComments => renderComments(dataComments));
}

const renderTitles = (data) => {
    data.forEach((user) => {
        const { title, id } = user
        const newUserTitle = document.createElement('div')
        newUserTitle.setAttribute('class', 'title')
        newUserTitle.setAttribute('id', 'id'+ id)
        newUserTitle.innerHTML =id +' '+ title;
        userPosts.appendChild(newUserTitle)
        newUserTitle.addEventListener('click', () => {
            showBodyOfTitle(data, id)   
        }, {once: true}) ;  
    })
}


const showBodyOfTitle = (data, idNum) => {
    data.map((user) => {
        const { id, body } = user
        if (idNum !== id) {
            newUserTitleIndexed = document.getElementById('id' + id)
            newUserTitleIndexed.classList.add('hidden')
        }else{
            const titleBody = document.createElement('div')
            titleBody.setAttribute('class', 'subTitle')
            titleBody.innerHTML = body
            document.getElementById('id' + idNum).appendChild(titleBody)
    
            getPostsComments(id)
            
            buttonBackToTitles.classList.remove('hidden')
            buttonBackToTitles.addEventListener('click', backToTitles)
        }
    })
}


const backToTitles = () => {
    const titles = document.querySelectorAll('.title')
    titles.forEach((el)=>{
        el.classList.remove('hidden')
    })
    const subTitle = document.querySelector('.subTitle')
    subTitle.remove()
    
    buttonBackToTitles.classList.add('hidden')
}


const renderComments = (dataComments) => {
    dataComments.map((comment) => {
        const {name, email, body} = comment

        const commentEl = document.createElement('div')
        commentEl.setAttribute('class', 'comment')

        const nameEl = document.createElement('div')
        const emailEl = document.createElement('div')
        const bodyEl = document.createElement('div')

        nameEl.setAttribute('class', 'commentName')
        emailEl.setAttribute('class', 'commentEmail')
        bodyEl.setAttribute('class', 'commentBody')

        nameEl.innerHTML = 'name: ' + name
        emailEl.innerHTML = 'email: '+ email
        bodyEl.innerHTML = 'body: ' + body

        const subTitle = document.querySelector('.subTitle') 
        commentEl.appendChild(nameEl)
        commentEl.appendChild(emailEl)
        commentEl.appendChild(bodyEl)
        subTitle.appendChild(commentEl)
    })
}