import Twixxt from "components/Twixxt";
import { dbService } from "fbase";
import { addDoc, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [twixxt, setTwixxt] = useState("");
    const [twixxts, setTwixxts] = useState([]);

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
        const docRef = await addDoc(collection(dbService, "twixxts"), {
            text: twixxt,
            createdAt: Date.now(),
            createdBy: userObj.uid
        });

        setTwixxt("");
    };

    const onChange = (event) => {
        const {target: {value}} = event;
        setTwixxt(value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={twixxt} onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Twixxt" />
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