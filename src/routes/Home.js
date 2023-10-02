import { dbService } from "fbase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [twixxt, setTwixxt] = useState("");
    const [twixxts, setTwixxts] = useState([]);

    const getTwixxts = async () => {
        const docSnap = await getDocs(collection(dbService, "twixxts"));
        
        docSnap.forEach(doc => {
            setTwixxts(prev => [doc.data(), ...prev]);
        });
    }

    useEffect(() => {
        getTwixxts();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        const docRef = await addDoc(collection(dbService, "twixxts"), {
            twixxt,
            createdAt: Date.now()
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
        </div>
    );
};

export default Home;