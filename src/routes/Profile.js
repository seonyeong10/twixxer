import { authService } from "fbase";
import React from "react";

const Profile = () => {
    const onLogoutClick = () => authService.auth.signOut();

    return (
        <>
            <button onClick={onLogoutClick}>Log Out</button>
        </>
    );
};

export default Profile;