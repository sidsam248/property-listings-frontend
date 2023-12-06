import { Alert, Box, Collapse, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

interface SuccessAlertProps {
    message: string;
}

export default function SuccessAlert({ message }: SuccessAlertProps) {

    const [showAlert, setShowAlert] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={showAlert}>
                <Alert
                severity="success"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setShowAlert(false);
                    }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                {message}
                </Alert>
            </Collapse>
        </Box>
    );
}