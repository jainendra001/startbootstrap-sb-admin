// Initialize Firebase with your own config
const firebaseConfig = {
    apiKey: "AIzaSyBfmuawM17F_FDL3JYIwwEqBc_SX8jlLqI",
    authDomain: "admin-panel-13d07.firebaseapp.com",
    projectId: "admin-panel-13d07",
    storageBucket: "admin-panel-13d07.appspot.com",
    messagingSenderId: "1081320855204",
    appId: "1:1081320855204:web:9c0cf5c0db06fae238f831",
    measurementId: "G-Y1W1JH7YY1"
  };

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const database = firebase.firestore();

const blogForm = document.getElementById('blogForm');
const blogImageInput = document.getElementById('blogImage');
const blogContentInput = document.getElementById('blogContent');
const addBlogBtn = document.getElementById('addBlogBtn');

addBlogBtn.addEventListener('click', () => {
    const imageFile = blogImageInput.files[0];
    const content = blogContentInput.value;

    if (!imageFile || !content) {
        alert('Please select an image and write some content.');
        return;
    }

    // Upload the image to Firebase Storage
    const storageRef = storage.ref(`blog_images/${Date.now()}_${imageFile.name}`);
    const uploadTask = storageRef.put(imageFile);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Track the progress (if needed)
        },
        (error) => {
            console.error('Error uploading image:', error.message);
            alert('Error uploading image. Please try again.');
        },
        () => {
            // Image uploaded successfully, get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                // Add blog data to Firestore
                database.collection('blogs').add({
                    image: downloadURL,
                    content: content,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    alert('Blog added successfully!');
                    // Clear the form
                    blogForm.reset();
                })
                .catch((error) => {
                    console.error('Error adding blog to Firestore:', error.message);
                    alert('Error adding blog. Please try again.');
                });
            });
        }
    );
});
