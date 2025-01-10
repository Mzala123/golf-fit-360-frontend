

function HomeGolf() {

    return (
        <div className="flex flex-1 justify-center items-center flex-col ">
            <div className="px-4 py-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                <div className="flex flex-col gap-4 rounded-lg p-4 col-span-1">
                    {/*<div>*/}
                    {/*    <FlipVertical/>*/}
                    {/*</div>*/}
                    {/*<div className="flex flex-col gap-2">*/}
                    {/*    <h2 className="font-Poppins_Bold text-lg">Setup and Alignment</h2>*/}
                    {/*    <p className="text-justify ">*/}
                    {/*        Examines posture, grip, stance, and alignment before the swing.*/}
                    {/*        Focuses on ensuring the golfer is properly positioned to hit the ball accurately and*/}
                    {/*        efficiently.*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                    <img className="w-[500px]" src="/images/golfer.jpg" alt=""/>
                </div>

                <div className="flex flex-col gap-4 rounded-lg p-4 col-span-1">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-Poppins_Bold text-2xl">READY FOR A FITTING?
                            WE’RE ON YOUR TURF.</h2>
                        <p className="text-justify leading-loose">
                            Our fittings cover more than basic metrics— no detail is left unexamined
                            We use data and science to show improvement in real-time
                            We carry the largest number of equipment options, many of which are unavailable through other retailers and fitters
                            Our Master Fitters are the most highly trained at the art and science of club fitting
                            Our custom builds are completed by master craftsmen, not an assembly line, and are backed by a Perfect Fit Guarantee
                        </p>
                    </div>
                    <div>
                        <h2 className="text-lg font-Poppins_Bold">LEVEL UP WITH THE CLUB CHAMPION DIFFERENCE</h2>
                        <p className="text-justify leading-loose">
                            Let some of the world’s best fitters, Tour-tested tech and tens of thousands of club combinations
                            do what no other custom golf club fitting does: lower your scores – and raise your level of
                            pure golf enjoyment – instantly. That’s the Club Champion difference.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HomeGolf;