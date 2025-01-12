

function HomeCustomer() {

    // flex-1 justify-center items-center
    return (
        <div className="flex flex-1 flex-col container mx-auto">
            <div className="px-4 py-4 flex flex-col justify-center lg:flex-row">
                <div className="flex justify-center w-full p-4">
                    <img className="min-w-[400px] max-w-[400px] w-full object-cover " src="/images/golfer.jpg" alt=""/>
                </div>

                <div className="flex flex-col gap-4 rounded-lg p-4 col-span-1 justify-center">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-Poppins_Bold text-2xl">READY FOR A FITTING?
                            WE’RE ON YOUR TURF.</h2>
                        <p className="text-justify leading-loose">
                            Our fittings cover more than basic metrics— no detail is left unexamined
                            We use data and science to show improvement in real-time
                            We carry the largest number of equipment options, many of which are unavailable through
                            other retailers and fitters
                            Our Master Fitters are the most highly trained at the art and science of club fitting
                            Our custom builds are completed by master craftsmen, not an assembly line, and are backed by
                            a Perfect Fit Guarantee
                        </p>
                    </div>
                    <div>
                        <h2 className="text-lg font-Poppins_Bold">WHY CHOOSE CUSTOM FITTING?</h2>
                        <p className="text-justify leading-loose">
                            No two golf swings are the same so your equipment shouldn't be, either. No matter your skill level,
                            you're leaving improvement and performance on the table if you're using clubs that aren't suited for your body,
                            your swing, and your playing conditions. Having complete confidence in your clubs will help you play better
                            golf and enjoy the game!
                        </p>
                    </div>
                    <div>
                        <h2 className="text-lg font-Poppins_Bold">LEVEL UP WITH THE CLUB CHAMPION DIFFERENCE</h2>
                        <p className="text-justify leading-loose">
                            Let some of the world’s best fitters, Tour-tested tech and tens of thousands of club
                            combinations
                            do what no other custom golf club fitting does: lower your scores – and raise your level of
                            pure golf enjoyment – instantly. That’s the Club Champion difference.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HomeCustomer