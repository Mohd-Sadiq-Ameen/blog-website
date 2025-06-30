document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('posts');

  try {
    const res = await fetch('/api/posts');
    const posts = await res.json();

    posts.forEach(post => {
      const div = document.createElement('div');
      div.classList.add('post', 'post-preview');
      div.innerHTML = `
        <div class="post-text">
          <h3>${post.title}</h3>
          <p>${post.content.substring(0, 100)}...</p>
          <small>By ${post.author || 'Admin'} on ${new Date(post.date).toDateString()}</small>
        </div>
      `;
      container.appendChild(div);
    });
  } catch (e) {
    console.warn('Could not load API posts:', e.message);
  }

  const userBlogs = JSON.parse(localStorage.getItem('userBlogs') || '[]');

  userBlogs.forEach((post, index) => {
    const div = document.createElement('div');
    div.classList.add('post', 'post-preview');

    const firstImage = post.content.find(b => b.type === 'image');
    const firstPara = post.content.find(b => b.type === 'paragraph');

    div.innerHTML = `
      <div class="post-text">
        <h3>${post.title}</h3>
        <p>${firstPara ? firstPara.text.slice(0, 100) + '...' : ''}</p>
        <small>By You on ${new Date(post.date).toDateString()}</small>
      </div>
      ${firstImage ? `<div class="post-thumb"><img src="${firstImage.src}" /></div>` : ''}
    `;

    div.style.cursor = "pointer";
    div.onclick = () => alert("You clicked blog: " + post.title + " (Feature: Open full blog page - coming soon!)");

    container.appendChild(div);
  });
});
