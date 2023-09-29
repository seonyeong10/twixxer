import { initializeApp } from "firebase/app";

/**
 * React app을 build하면,
 * create-react-app은 아래 key들을 실제 값으로 변환한다.
 * 즉, 보안 효과가 전혀 없다.
 * 
 * 아래 key들은 github에 업로드하지 않기 위함
 */
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };

// Initialize Firebase
export default initializeApp(firebaseConfig);
