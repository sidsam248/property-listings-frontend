import { Alert, Box, Collapse, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

interface ErrorAlertProps {
    message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {

    const [showAlert, setShowAlert] = useState<boolean>(true);

    useEffect(() => {
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={showAlert}>
                <Alert
                severity="error"
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