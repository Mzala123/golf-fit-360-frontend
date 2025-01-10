import {FlipVertical, Goal, Ribbon} from "lucide-react";

function ScheduleSwingAnalysis() {
    return(
        <div>
            <div className="pt-6">
                <h1 className="text-center font-Poppins_Bold text-2xl">SOME OF THE SWINGING PROCESS</h1>
            </div>
            <div className="px-4 py-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-4 rounded-lg p-4">
                    <div>
                        <FlipVertical/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-Poppins_Bold text-lg">Setup and Alignment</h2>
                        <p className="text-justify ">
                            Examines posture, grip, stance, and alignment before the swing.
                            Focuses on ensuring the golfer is properly positioned to hit the ball accurately and
                            efficiently.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 rounded-lg p-4">
                    <div>
                        <Goal/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-Poppins_Bold text-lg">Backswing</h2>
                        <p className="text-justify ">
                            Evaluates the takeaway, shoulder rotation, and club position as the golfer brings the club
                            back.
                            Common issues include an off-plane backswing or inadequate rotation.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 rounded-lg p-4">
                    <div>
                        <Ribbon/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-Poppins_Bold text-lg">Downswing</h2>
                        <p className="text-justify ">
                            Focuses on the transition from the backswing to the downswing.
                            Key elements include the path of the club, hip movement, and maintaining balance.
                        </p>
                    </div>
                </div>


            </div>
        </div>

    )
}

export default ScheduleSwingAnalysis;