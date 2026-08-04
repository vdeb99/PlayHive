function ProfileStats() {

    return (

        <div className="grid grid-cols-3 gap-6 mt-10">

            <div className="bg-zinc-900 rounded-xl p-6 text-center">

                <h2 className="text-3xl font-bold">
                    0
                </h2>

                <p className="text-zinc-400 mt-2">
                    Videos
                </p>

            </div>

            <div className="bg-zinc-900 rounded-xl p-6 text-center">

                <h2 className="text-3xl font-bold">
                    0
                </h2>

                <p className="text-zinc-400 mt-2">
                    Subscribers
                </p>

            </div>

            <div className="bg-zinc-900 rounded-xl p-6 text-center">

                <h2 className="text-3xl font-bold">
                    0
                </h2>

                <p className="text-zinc-400 mt-2">
                    Following
                </p>

            </div>

        </div>

    );

}

export default ProfileStats;