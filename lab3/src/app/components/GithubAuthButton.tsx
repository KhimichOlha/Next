import { signIn, signOut, useSession } from "next-auth/react";

export default function GitHubAuthButton() {
    const buttonStyle = {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        transition: '0.3s',
    };

    const signInStyle = {
        ...buttonStyle,
        backgroundColor: '#333',
        color: '#fff',
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.opacity = '0.8';
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.opacity = '1';
    };

    return (
        <div>
            <button
                style={signInStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => signIn("github")}
            >
                Увійти через GitHub
            </button>
        </div>
    );
}
