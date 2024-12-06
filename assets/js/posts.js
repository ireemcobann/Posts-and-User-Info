const postList = document.querySelector('.postList');
const commentList = document.querySelector('.commentList')


async function init() {
  const data = await fetch('https://dummyjson.com/posts?limit=251')
    .then(res => res.json());
  const users = await fetch ('https://dummyjson.com/users?limit=208')
  .then(response => response.json())
  .then(data => data.users)
  const comments = await fetch('https://dummyjson.com/comments?limit=340')
  .then(response => response.json())
  .then(data => data.comments)
  
  renderPosts(data,users,comments)
}

function renderComments(commentContainer,comments) {
for (const comment of comments) {
  commentContainer.innerHTML += `
  <div class="userComment">
  <p><strong>comment by:</strong> ${comment.user.username}</p>
  <p>${comment.body}</p>
  </div>

  `
}
}

function renderPosts(data,users,comments) {
  for (const post of data.posts) {
    const user = findByUserId(post.userId,users);
    postList.innerHTML += `
    <div class="post-card">
         <h3>${post.title}</h3>
         <p class= "body-content">${post.body}</p>
         <p><strong>Reactions:</strong> 
         👍🏻 ${post.reactions.likes} 👎🏻 ${post.reactions.dislikes}</p>
         <p><strong>Posted by:</strong> ${user.firstName} ${user.lastName} (@${user.username})</p>
         <p><strong>Email:</strong> ${user.email}</p>
         <div class="commentContainer" data-postid = ${post.id}>
         
         </div>
     </div>
    
    `
  }
  const commentContainers = document.querySelectorAll('.commentContainer')
  for (const commentContainer of commentContainers) {
   const postId = commentContainer.dataset.postid;
   const filteredComments = comments.filter(comment => comment.postId == postId)
   console.log(filteredComments)
   renderComments(commentContainer,filteredComments)
  }
}



  function findByUserId(userId, users) {
    for (const user of users) {
     if(user.id === userId) {
        return user;
     }
    }
    return null; // Eşleşme bulunmazsa `null` döndür.
}



init();
