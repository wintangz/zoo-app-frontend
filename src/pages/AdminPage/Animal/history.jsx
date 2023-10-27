import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getEnclosuresAnimals } from "~/api/animalsService";

function History() {
    const location = useLocation()
    console.log(location.state);
    useEffect(() => {
        const res = getEnclosuresAnimals();
        res.then(result => {
            console.log(result)
        })
    })
    return (
        <>
            History
        </>
    );
}

export default History;