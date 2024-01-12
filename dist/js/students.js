// Initialize Firebase
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
  
  const db = firebase.firestore();
  
  function addStudent() {
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    const image = document.getElementById('image').value;
  
    db.collection('students').add({
      name,
      course,
      contact,
      email,
      image
    })
    .then(() => {
      console.log('Student added successfully');
      document.getElementById('addStudentForm').reset();
    })
    .catch((error) => {
      console.error('Error adding student: ', error);
    });
  }
  
  function renderStudents() {
    const table = document.getElementById('studentTable');
    db.collection('students').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const student = change.doc.data();
          const row = table.insertRow(-1);
          row.innerHTML = `<td>${student.name}</td>
                           <td>${student.course}</td>
                           <td>${student.contact}</td>
                           <td>${student.email}</td>
                           <td><img src="${student.image}" alt="Student Image" style="max-width: 50px; max-height: 50px;"></td>`;
        }
      });
    });
  }
  
  // Call the renderStudents function when the page is loaded
  window.onload = renderStudents;
  