<template>
  <h2>Dashboard</h2>
  <p>Click on the "New" to add your choice.</p>
  <div class="openBtn">
    <button class="openButton" @click="openForm()">
      <strong>New</strong>
    </button>
  </div>
  <br />
  <br />
  <br />
  <div class="loginPopup">
    <div class="formPopup" id="popupForm">
      <form class="formContainer" @submit.prevent="addUserBtnClicked">
        <h2>Please Enter Details</h2>
        <label for="name"><strong>Name</strong></label>
        <input
          type="text"
          class="user-input"
          id="name"
          data-key="Name"
          placeholder="Your Name"
          name="name"
          v-model="name"
          required
        />
        <label for="email"><strong>E-mail</strong></label>
        <input
          type="text"
          class="user-input"
          id="email"
          data-key="Email"
          placeholder="Your Email"
          name="email"
          v-model="email"
          required
        />
        <label for="book"><strong>Book</strong></label>
        <input
          type="text"
          class="user-input"
          id="book"
          data-key="Book"
          placeholder="Enter book name"
          name="book"
          v-model="book"
          required
        />
        <label for="author"><strong>Author</strong></label>
        <input
          type="text"
          class="user-input"
          id="author"
          data-key="uthor"
          placeholder="Author Name"
          name="author"
          v-model="author"
          required
        />
        <!-- eslint-disable -->
        <button type="submit" class="btn" id="save">
          Save Details
        </button>
        <button type="button" class="btn cancel" @click="closeForm()">
          Close
        </button>
      </form>
    </div>
  </div>
  <table style="width:100%" id="ex-table">
  <tr id="tr">
    <th>Name</th>
    <th>Email Id</th> 
    <th>Book</th>
    <th>Author</th>
    <th>Delete</th>
  </tr>
  <tr v-for="item in object">
    <td>{{ item.name }}</td>
    <td>{{ item.email }}</td>
    <td>{{ item.book }}</td>
    <td>{{ item.uthor }}</td>
    <td><button type="button" class="btn cancel" @click="Delete(item.name)">Delete</button></td>
  </tr>
</table> 
</template>
<style scoped>
* {
  box-sizing: border-box;
}
.openBtn {
  display: flex;
  justify-content: center;
}
.openButton {
  border: none;
  border-radius: 5px;
  background-color: #1c87c9;
  color: white;
  padding: 14px 20px;
  cursor: pointer;
}
.loginPopup {
  position: relative;
  text-align: center;
  width: 100%;
}
.formPopup {
  display: none;
  position: fixed;
  left: 45%;
  top: 5%;
  transform: translate(-50%, 5%);
  border: 3px solid #999999;
  z-index: 9;
}
.formContainer {
  max-width: 300px;
  padding: 20px;
  background-color: #fff;
}
.formContainer input[type="text"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 20px 0;
  border: none;
  background: #eee;
}
.formContainer input[type="text"]:focus {
  background-color: #ddd;
  outline: none;
}
.formContainer .btn {
  padding: 12px 20px;
  border: none;
  background-color: #8ebf42;
  color: #fff;
  cursor: pointer;
  width: 100%;
  margin-bottom: 15px;
  opacity: 0.8;
}
.formContainer .cancel {
  background-color: #cc0000;
}
.cancel {
  padding: 12px 20px;
  border: none;
  background-color: #8ebf42;
  color: #fff;
  cursor: pointer;
  width: 100%;
  margin-bottom: 15px;
  opacity: 0.8;
  background-color: #cc0000;
}
.formContainer .btn:hover,
.openButton:hover {
  opacity: 1;
}
</style>
<script>
/* eslint-disable */
import { initializeApp } from "firebase/app";
import { doc, setDoc , collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBI4x6cfWa7wVuS4Ba4PDqalYJXtHjiVlw",
  authDomain: "demo1-be2ea.firebaseapp.com",
  projectId: "demo1-be2ea",
  storageBucket: "demo1-be2ea.appspot.com",
  messagingSenderId: "596773960047",
  appId: "1:596773960047:web:a484bfdc349391c4be109a",
  measurementId: "G-GPRJD8Q0J0",
};
const app = initializeApp(firebaseConfig);
const dbs = getFirestore(app);

export default {
  data: function() {
    return {
      newItem: '',
      object: [],
    };
  },
  // computed: {
  //   trackId: function() {
  //     return this.object.length;
  //   },
  // },
  methods: {
    openForm() {
      document.getElementById("popupForm").style.display = "block";
    },
    closeForm() {
      document.getElementById("popupForm").style.display = "none";
      document.getElementById("name").value="";
      document.getElementById("email").value="";
      document.getElementById("book").value="";
      document.getElementById("author").value="";
      document.getElementById("id").value="";
    },
    async Delete(childKey) {
      this.object.pop(this.item);
      await deleteDoc(doc(dbs, "db", childKey));
      alert('row was removed');
    },
    async addUserBtnClicked() {
      const usersRef = collection(dbs,'db');
      const addUserInputsUI = document.getElementsByClassName("user-input");
      let newUser = {};
      for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
        let key = addUserInputsUI[i].getAttribute("data-key");
        let value = addUserInputsUI[i] .value;
        newUser[key] = value;
      }
      await setDoc(doc(dbs,"db",this.name),newUser);
      console.log(newUser);
      this.object.push({ name: this.name, email: this.email, book: this.book, uthor: this.author});
      this.newItem ="";
    },
    async getItem() {
      const usersRef = collection(dbs,'db');
      const docSnap = await getDocs(collection(dbs,"db"));
      docSnap.forEach((doc) => {
        var val = doc.data();
        this.object.push({ name: val.Name, email: val.Email, book: val.Book, uthor: val.uthor });
        this.newItem ="";
      });
    },
  },
  beforeMount(){
    this.getItem();
  }
};
</script>
