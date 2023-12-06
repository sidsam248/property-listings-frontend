import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";

export default function Loading() {

    const [open, setOpen] = useState<boolean>(true);

    return (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
    )
}