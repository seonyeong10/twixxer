import Twixxt from "components/Twixxt";
import { dbService, storageService } from "fbase";
import { addDoc, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
    const [twixxt, setTwixxt] = useState("");
    const [twixxts, setTwixxts] = useState([]);
    const [attachment, setAttachment] = useState("");

    /*
    const getTwixxts = async () => {
        const docSnap = await getDocs(collection(dbService, "twixxts"));
        
        docSnap.forEach(doc => {
            const twixxtObject = {
                ...doc.data(),
                id: doc.id
            }
            setTwixxts(prev => [twixxtObject, ...prev]);
        });
    };
    */

    useEffect(() => {
        /** 실시간 조회 */
        const unsub = onSnapshot(collection(dbService, "twixxts"), snapshot => {
            const twixxtArray = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setTwixxts(twixxtArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentURL = "";
        /*
        const docRef = await addDoc(collection(dbService, "twixxts"), {
            text: twixxt,
            createdAt: Date.now(),
            createdBy: userObj.uid
        });

        setTwixxt("");
        */
        
        // file upload -> get file url -> save twixxt with url
        if (attachment !== "") {
            const storageRef = ref(storageService, `${userObj.uid}/${uuidv4()}}`);
            const response = await uploadString(storageRef, attachment, "data_url");
            attachmentURL = await getDownloadURL(response.ref);
        }

        const twixxtObj = {
            text: twixxt,
            createdAt: Date.now(),
            createdBy: userObj.uid,
            attachmentURL
        };

        await addDoc(collection(dbService, "twixxts"), twixxtObj);
        setTwixxt("");
        setAttachment("");
    };

    const onChange = (event) => {
        const {target: {value}} = event;
        setTwixxt(value);
    };

    const onFileChange = (e) => {
        const {target: {files}} = e;

        /** preview image */
        const theFile = files[0];
        const reader = new FileReader();
        // after readAsDataURL()
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile); //read uploaded image
    };

    const onClearAttahment = () => setAttachment(null);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={twixxt} onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Twixxt" />
                {(attachment !== "") && <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttahment}>Clear</button>
                    </div>}
            </form>
            <div>
                {twixxts.map(twixxt => {
                    return(
                        <Twixxt key={twixxt.id} twixxtObj={twixxt} isOwner={twixxt.createdBy === userObj.uid} />
                    );
                })}
            </div>
        </div>
    );
};

export default Home;