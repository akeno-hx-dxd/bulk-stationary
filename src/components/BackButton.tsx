import Link from "next/link";
import { Button } from "./ui/button";
export const BackButton = () => {
    return (
        <Link href="/">
            <Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M321.94 98L158.82 237.78a24 24 0 0 0 0 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18" />
                </svg>
                <span>Back</span>
            </Button>
        </Link>
    )
}