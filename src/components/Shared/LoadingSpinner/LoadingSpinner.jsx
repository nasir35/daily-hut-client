const LoadingSpinner = () => {
    return (
        <div className="flex h-screen w-full justify-center items-center bg-slate-300">
            <div className="max-w-fit aspect-square border-2 border-orange-600 rounded-full p-8 flex justify-center items-center">
                Loading
            </div>
        </div>
    );
};

export default LoadingSpinner;