import ProfileHeader from "../../components/profile/ProfileHeader";
import ChangePassword from "../../components/profile/ChangePassword";
import UpdateProfile from "../../components/profile/UpdateProfile";

import { useSelector } from "react-redux";

function Settings() {

    const { user } = useSelector(
        state => state.auth
    );

    return (

        <div className="max-w-5xl mx-auto px-6 py-8">

            <h1 className="text-4xl font-bold mb-10">

                Settings

            </h1>

            <ProfileHeader user={user}/>

            <div className="mt-10">

                <UpdateProfile/>

            </div>

            <div className="mt-10">

                <ChangePassword/>

            </div>

        </div>

    );

}

export default Settings;