// firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: 'AIzaSyBPvmkjtqZMqblfCz-5jz11mApxivB17XI',
	authDomain: 'mindmap-14b23.firebaseapp.com',
	projectId: 'mindmap-14b23',
	storageBucket: 'mindmap-14b23.appspot.com',
	messagingSenderId: '621327444410',
	appId: '1:621327444410:web:86f35705bb0802ae7ed583',
	measurementId: 'G-V8F8TMSRHF',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
