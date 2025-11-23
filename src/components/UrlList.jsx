import { Trash2, ArrowDown, ArrowUp, Copy } from "lucide-react";
import axios from "axios";
import { useState } from "react";

export default function UrlList({ urlList, deleteLink }) {
    const [openCode, setOpenCode] = useState(null);
    const [stats, setStats] = useState({});

    async function handleDelete(code) {
        try {
            await axios.delete(`https://url-shortener-backend-grk1.onrender.com/api/links/${code}`);
            deleteLink(code);
            alert("Link deleted Successfully");
        } catch (err) {
            console.error(err);
            alert("Delete failed");
        }
    }

    async function viewStats(code) {
        try {
            const response = await axios.get(`https://url-shortener-backend-grk1.onrender.com/api/stats/${code}`);
            const data = response.data;

            setStats(data);
            setOpenCode(prev => (prev === code ? null : code));
        } catch (err) {
            console.error(err);
            alert("Failed to fetch stats");
        }
    }

    return (
        <div>
            <div className="urlList max-w-2xl mx-4 p-6">
                <ul className="grid grid-cols-1 gap-5">
                    {urlList.map((element, index) => (
                        <div key={index}>
                            
                            {/* List Item */}
                            <li className="flex items-center justify-between gap-4 p-3 border rounded-md bg-white">
                                <div className="flex flex-col flex-grow">
                                    <a
                                        href={element.shortUrl}
                                        target="_blank"
                                        className="font-medium text-gray-800"
                                    >
                                        {element.shortUrl}
                                    </a>
                                </div>

                                <div className="flex items-center space-x-4">

                                    <button
                                        className="btn-cta p-2"
                                        onClick={() => navigator.clipboard.writeText(element.shortUrl)}
                                    >
                                        <Copy size={20} />
                                    </button>

                                    <button
                                        className="btn-cta p-2"
                                        onClick={() => handleDelete(element.code)}
                                    >
                                        <Trash2 size={20} />
                                    </button>

                                    <button
                                        className="btn-cta p-2"
                                        onClick={() => viewStats(element.code)}
                                    >
                                        {openCode === element.code ?
                                            <ArrowDown size={20} /> :
                                            <ArrowUp size={20} />}
                                    </button>

                                </div>
                            </li>

                            {/* Drop-down Stats Section */}
                            {openCode === element.code && (
                                <div className="p-4 bg-gray-100 rounded-md shadow-md mt-2">
                                    <h3 className="text-lg font-semibold mb-2 text-center">Link Statistics</h3>
                                    <ul className="text-left list-none">
                                        <li>Original URL: <a target="_blank" href={stats.url}>{stats.url}</a></li>
                                        <li>Shortened URL:<a target="_blank" href={`https://url-shortener-backend-grk1.onrender.com/${stats.slug}`}>http://localhost:3000/{stats.slug}</a></li>
                                        <li>Clicks: {stats.clicks}</li>
                                        <li>Created At: {stats.created_at}</li>
                                        <li>
                                            Last Clicked At:{" "}
                                            {stats.last_clicked_at ? stats.last_clicked_at : "Never"}
                                        </li>
                                    </ul>
                                </div>
                            )}

                        </div>
                    ))}

                </ul>
            </div>
        </div>
    );
}
