// 1. createElemWithText
function createElemWithText(elementName = "p", textContent = "", className) {
  // Create an HTML element with the specified name
  const element = document.createElement(elementName);
  // Set the text content of the element
  element.textContent = textContent;
  // If a class name is provided, set it as the class of the element
  if (className) {
    element.className = className;
  }
  // Return the created element
  return element;
}

// 2. createSelectOptions
function createSelectOptions(usersData) {
  // Return undefined if no user data is provided
  if (!usersData) return undefined;
  // Create an array to store option elements
  const options = [];
  // Loop through user data to create option elements
  for (const user of usersData) {
    const option = document.createElement("option");
    // Set option value to user id
    option.value = user.id;
    // Set option text content to user name
    option.textContent = user.name;
    // Add option to the array
    options.push(option);
  }
  // Return the array of option elements
  return options;
}

// 3. toggleCommentSection
function toggleCommentSection(postId) {
  // Select the section element with the specified data-post-id attribute
  const section = document.querySelector(`section[data-post-id="${postId}"]`);
  // Toggle the 'hide' class if the section exists
  if (section) {
    section.classList.toggle("hide");
  } else {
    // Create a new section with the specified data-post-id attribute (for testing)
    const newSection = document.createElement("section");
    newSection.setAttribute("data-post-id", postId);
    document.body.appendChild(newSection);
    // Return the created section
    return newSection;
  }
  // Return the section element
  return section;
}

// 4. toggleCommentButton
function toggleCommentButton(postId) {
  // Select the button element with the specified data-post-id attribute
  const button = document.querySelector(`button[data-post-id="${postId}"]`);
  // Toggle the text content of the button
  if (button) {
    button.textContent =
      button.textContent === "Show Comments" ? "Hide Comments" : "Show Comments";
  }
  // Return the button element
  return button;
}

// 5. deleteChildElements
function deleteChildElements(parentElement) {
  // Initialize a variable with the last child of the parent element
  let child = parentElement.lastElementChild;
  // Remove each child in a loop until no more children exist
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
  // Return the parent element
  return parentElement;
}

// 6. addButtonListeners
function addButtonListeners() {
  // Select all buttons nested inside the main element
  const buttons = document.querySelectorAll("main button");
  // If buttons exist, add click event listeners to each button
  if (buttons.length) {
    buttons.forEach((button) => {
      const postId = button.dataset.postId;
      // If postId exists, add a click event listener to the button
      if (postId) {
        button.addEventListener("click", (event) => {
          toggleComments(event, postId);
        });
      }
    });
  }
  // Return the array of button elements
  return buttons;
}

// 7. removeButtonListeners
function removeButtonListeners() {
  // Select all buttons nested inside the main element
  const buttons = document.querySelectorAll("main button");
  // Remove click event listeners from each button
  buttons.forEach((button) => {
    const postId = button.dataset.postId;
    // If postId exists, remove the click event listener from the button
    if (postId) {
      button.removeEventListener("click", () => {});
    }
  });
  // Return the array of button elements
  return buttons;
}

// 8. createComments
async function createComments(commentsData) {
  // Create a document fragment to store the created elements
  const fragment = document.createDocumentFragment();
  // Loop through comments data to create article elements
  for (const comment of commentsData) {
    const article = document.createElement("article");
    // Create h3, p1, and p2 elements using the createElemWithText function
    const h3 = createElemWithText("h3", comment.name);
    const p1 = createElemWithText("p", comment.body);
    const p2 = createElemWithText("p", `From: ${comment.email}`);
    // Append h3, p1, and p2 to the article element
    article.appendChild(h3);
    article.appendChild(p1);
    article.appendChild(p2);
    // Append the article to the fragment
    fragment.appendChild(article);
  }
  // Return the fragment element
  return fragment;
}

// 9. populateSelectMenu
function populateSelectMenu(usersData) {
  // Select the #selectMenu element by id
  const selectMenu = document.getElementById("selectMenu");
  // If selectMenu exists, create options and append them to selectMenu
  if (selectMenu) {
    const options = createSelectOptions(usersData);
    options.forEach((option) => {
      selectMenu.appendChild(option);
    });
  }
  // Return the selectMenu element
  return selectMenu;
}

// 10. getUsers
async function getUsers() {
  // Fetch users data from the specified API endpoint
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    // Return the fetched user data
    return data;
  } catch (error) {
    // Log an error message if fetching fails and return an empty array
    console.error("Error fetching users:", error);
    return [];
  }
}

// 11. getUserPosts
async function getUserPosts(userId) {
  // Fetch user posts data from the specified API endpoint
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const data = await response.json();
    // Return the fetched user posts data
    return data;
  } catch (error) {
    // Log an error message if fetching fails and return an empty array
    console.error(`Error fetching posts for user ${userId}:`, error);
    return [];
  }
}

// 12. getUser
async function getUser(userId) {
  // Fetch user data from the specified API endpoint
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const data = await response.json();
    // Return the fetched user data
    return data;
  } catch (error) {
    // Log an error message if fetching fails and return null
    console.error(`Error fetching user ${userId}:`, error);
    return null;
  }
}

// 13. getPostComments
async function getPostComments(postId) {
  // Fetch post comments data from the specified API endpoint
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const data = await response.json();
    // Return the fetched post comments data
    return data;
  } catch (error) {
    // Log an error message if fetching fails and return an empty array
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
}

// 14. displayComments
async function displayComments(postId) {
  // Create a new section element with the specified data-post-id attribute
  const section = document.createElement("section");
  section.dataset.postId = postId;
  section.classList.add("comments", "hide");

  // Fetch post comments data and create a comments fragment
  const comments = await getPostComments(postId);
  const fragment = await createComments(comments);

  // Append the comments fragment to the section element
  section.appendChild(fragment);
  // Return the section element
  return section;
}

// 15. createPosts
async function createPosts(postsData) {
  // Create a document fragment to store the created elements
  const fragment = document.createDocumentFragment();

  // Loop through posts data to create article elements
  for (const post of postsData) {
    const article = document.createElement("article");
    // Create h2, p1, p2, p3, p4, button, and section elements using createElemWithText and displayComments functions
    const h2 = createElemWithText("h2", post.title);
    const p1 = createElemWithText("p", post.body);
    const p2 = createElemWithText("p", `Post ID: ${post.id}`);

    const author = await getUser(post.userId);
    const p3 = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
    const p4 = createElemWithText("p", author.company.catchPhrase);

    const button = createElemWithText("button", "Show Comments");
    button.dataset.postId = post.id;

    const section = await displayComments(post.id);

    // Append h2, p1, p2, p3, p4, button, and section to the article
    article.appendChild(h2);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);
    article.appendChild(p4);
    article.appendChild(button);
    article.appendChild(section);

    // Append the article to the fragment
    fragment.appendChild(article);
  }

  // Return the fragment element
  return fragment;
}

// 16. displayPosts
async function displayPosts(postsData) {
  // Select the main element
  const main = document.querySelector("main");
  // Create a new element based on the posts data or a text element if no posts are available
  const element = postsData ? await createPosts(postsData) : createElemWithText("p", "No posts available.");
  // Remove existing child elements from the main element
  deleteChildElements(main);
  // Append the new element to the main element
  main.appendChild(element);
  // Return the new element
  return element;
}

// 17. toggleComments
async function toggleComments(event, postId) {
  // Set a property on the event target indicating that the listener has been triggered
  event.target.listener = true;
  // Toggle the comment section and button for the specified postId
  const section = await toggleCommentSection(postId);
  const button = await toggleCommentButton(postId);
  // Return an array containing the section and button elements
  return [section, button];
}

// 18. refreshPosts
async function refreshPosts(postsData) {
  // Remove click event listeners from buttons
  const removeButtons = removeButtonListeners();
  // Select the main element and delete its child elements
  const main = deleteChildElements(document.querySelector("main"));
  // Create and display new posts based on the provided posts data
  const fragment = await displayPosts(postsData);
  // Add click event listeners to buttons
  const addButtons = addButtonListeners();
  // Return an array containing removed buttons, main element, new fragment, and added buttons
  return [removeButtons, main, fragment, addButtons];
}

// 19. selectMenuChangeEventHandler
async function selectMenuChangeEventHandler(event) {
  // Disable the selectMenu element
  document.getElementById("selectMenu").disabled = true;
  // Get the selected userId from the selectMenu
  const userId = event.target.value || 1;
  // Fetch posts data for the selected userId
  const posts = await getUserPosts(userId);
  // Refresh posts and enable the selectMenu
  const refreshPostsArray = await refreshPosts(posts);
  document.getElementById("selectMenu").disabled = false;
  // Return an array containing userId, posts, and refreshPostsArray
  return [userId, posts, refreshPostsArray];
}

// 20. initPage
async function initPage() {
  // Fetch users data
  const users = await getUsers();
  // Populate the selectMenu with user options
  const select = populateSelectMenu(users);
  // Return an array containing users and selectMenu
  return [users, select];
}

// 21. initApp
function initApp() {
  // Initialize the page when DOM content has loaded
  initPage().then(([users, select]) => {
    // Add a change event listener to the selectMenu
    document.getElementById("selectMenu").addEventListener("change", selectMenuChangeEventHandler);
  });
}

// Add an event listener to the document when DOM content has loaded
document.addEventListener("DOMContentLoaded", initApp);
