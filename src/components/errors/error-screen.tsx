import Bird from "../../assets/bird.webp";

type Props = {
    message: string,
    children: React.ReactNode
};

export default function ErrorScreen({ message, children }: Props) {
    return (
        
        <div className="m-auto max-h-full overflow-hidden flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <img className="max-w-48 md:w-64 m-auto md:h-64 h-48" src={Bird} alt="Bird" />
                <span className="text-sm md:text-lg text-center my-4">{message}</span>
                {children}
            </div>
        </div>
    );
}
