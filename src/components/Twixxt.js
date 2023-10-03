import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Twixxt = ({ twixxtObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newTwixxt, setNewTwixxt] = useState(twixxtObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Really?");
        if (ok) {
            //delete
            await deleteDoc(doc(dbService, "twixxts", twixxtObj.id));
        }
    };

    const toggleEditing = () => setEditing(prev => !prev);

    const onChange = (event) => {
        const { target: { value } } = event;
        setNewTwixxt(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        await updateDoc(doc(dbService, "twixxts", twixxtObj.id), {
            text: newTwixxt
        });

        setEditing(false);
    }

    return (
        <div>
            {
                editing ?
                    <>
                        {
                            isOwner &&
                            <>
                                <form onSubmit={onSubmit}>
                                    <input type="text" value={newTwixxt} required onChange={onChange} />
                                    <input type="submit" value="Update" />
                                </form>
                                <button onClick={toggleEditing}>Cancel</button>
                            </>
                        }
                    </>
                    : <>
                        <h4>{twixxtObj.text}</h4>
                        {twixxtObj.attachmentURL && <img src={twixxtObj.attachmentURL} width="50px" height="50px"/>}
                        {isOwner &&
                            <>
                                <button onClick={onDeleteClick}>Delete</button>
                                <button onClick={toggleEditing}>Edit</button>
                            </>
                        }
                    </>
            }
        </div>
    );
};

export default Twixxt;