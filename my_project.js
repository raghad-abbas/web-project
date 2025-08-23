// // ===== Select elements =====
const form = document.getElementById("commentForm");
const input = document.getElementById("commentInput");
const commentsContainer = document.getElementById("commentsContainer");

//  ===== Load comments when page is opened ======
window.onload = function() {

    // Get saved comments from localStorage (if none, use empty array)
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    // Add each saved comment back to the page
    savedComments.forEach(text => addComment(text));
};

// ===== Handle form submission =====
form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get the trimmed comment text (remove extra spaces)
    const commentText = input.value.trim();
    if (!commentText) return;

    // Add comment to page and save it to localStorage
    addComment(commentText);
    saveCommentsToLocalStorage();

    // Clear input field
    input.value = "";
});

// ===== Function to add a comment =====
function addComment(commentText) {
    // Create a new comment container
    const newComment = document.createElement("div");
    newComment.classList.add("testimonial");
    
    // Create the text span
    const textSpan = document.createElement("span");
    textSpan.textContent = commentText;
    
    // Create the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn"; //     
    
    // Add delete functionality
    deleteBtn.addEventListener("click", () => {
        const commentToRemove = textSpan.textContent;
        newComment.remove();
        removeCommentFromLocalStorage(commentToRemove);
    });
    
    // Append text and delete button to the comment
    newComment.appendChild(textSpan);
    newComment.appendChild(deleteBtn);

    // Add the comment to the container
    commentsContainer.appendChild(newComment);
}

// ===== Save all comments to localStorage =====
function saveCommentsToLocalStorage() {
    // Take all current comments on the page
    const comments = Array.from(commentsContainer.children)
        .map(comment => comment.querySelector('span').textContent);
    
    // Save them as a JSON array in localStorage
    localStorage.setItem("comments", JSON.stringify(comments));
}

// ===== Remove a specific comment from localStorage =====
function removeCommentFromLocalStorage(commentToRemove) {
    let savedComments = JSON.parse(localStorage.getItem("comments")) || [];

    // Keep all comments except the one we want to delete
    savedComments = savedComments.filter(c => c !== commentToRemove);
    
    // Keep all comments except the one we want to delete
    localStorage.setItem("comments", JSON.stringify(savedComments));
}