"use client";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function CreateArticlePage() {
    return (
        <div className="bg-primary text-white 3xl:text-2xl">
            <h1>Create article</h1>
            <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
            >
                Add
            </Button>
        </div>
    );
}