import React from "react"

const Footer=()=>{
    return(
        <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">PlayHive</h1>
                    <nav className="space-x-4">
                        <a href="#" className="hover:text-gray-400">Videos</a>
                        <a href="#" className="hover:text-gray-400">Tweets</a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer