import { useTheme } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getHealthCare } from "~/api/healService";
import { tokens } from "~/theme";

function ViewHealth() {
    const [healthCare, setHealthCare] = useState(null)
    useEffect(() => {
        const res = getHealthCare()
        res.then((result) => {
            setHealthCare(result)
        })
    }, [])
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'animal',
            headerName: 'Animal',
            headerAlign: 'center',
            align: 'left',
        },
        {
            field: 'diagnosis',
            headerName: 'Diagnosis',
            headerAlign: 'center',
            align: 'left',

        },
        {
            field: 'height',
            headerName: 'Height    ',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'imgUrl',
            headerName: 'imgUrl',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            renderCell: (params) => (
                <img src={params.row.imgUrl} alt={params.row.lifeStage} style={{ width: '75%', height: 'auto' }} />
            ),
        },

        {
            field: 'length',
            headerName: 'Length',
            headerAlign: 'left',
            align: 'left',
        },

        {
            field: 'lifeStage',
            headerName: 'LifeStage',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'recordedDateTime',
            headerName: 'Recorded Date Time',
            headerAlign: 'left',
            width: 80,
        },
    ];
    return (<h2>Health</h2>);
}

export default ViewHealth;