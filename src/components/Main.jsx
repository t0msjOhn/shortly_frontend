import Shortener from "./Shortener"
import CallToAction from "./CallToAction"
import UrlList from "./UrlList"
import { useState, useEffect } from "react"

const getLocalStorage = () => {
    if(!localStorage.getItem('links')) return []
    return JSON.parse(localStorage.getItem('links'))
}

export default function Main() {

    const [links, setLinks] = useState(getLocalStorage)

    useEffect(() => {
        localStorage.setItem('links', JSON.stringify(links))
    }, [links])

    function addLink(newItem) {
        console.log("Adding new link:", newItem);
        setLinks([...links, newItem])
    }

    function deleteLink(code) {
        const filteredLinks = links.filter(link => link.code !== code)
        setLinks(filteredLinks)
    }

    return <main>
        <Shortener addLink={addLink} />
        <UrlList urlList={links} deleteLink={deleteLink}/>
        <CallToAction />
    </main>
}
