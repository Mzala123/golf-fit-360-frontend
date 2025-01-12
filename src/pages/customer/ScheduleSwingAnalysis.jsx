import {BicepsFlexed, FlipVertical, Goal, Ribbon, Rss, ScanLine} from "lucide-react";

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
                        <ScanLine/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-Poppins_Bold text-lg">Transition</h2>
                        <p className="text-justify ">
                            Weight Shift: Weight begins transferring from the back foot to the front foot.
                            Body Coordination: The hips initiate the downswing, followed by the torso, arms, and hands.
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

                <div className="flex flex-col gap-4 rounded-lg p-4">
                    <div>
                        <BicepsFlexed/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-Poppins_Bold text-lg">Impact</h2>
                        <p className="text-justify ">
                            Clubface Alignment: The face of the club should be square to the target line.
                            Follow-Through Preparation: Proper extension through the ball ensures the swing doesn’t stop abruptly.
                            Sweet Spot Contact: The ball is struck with the center of the clubface for maximum accuracy and power.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 rounded-lg p-4">
                    <div>
                        <Rss/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-Poppins_Bold text-lg">Follow-Through</h2>
                        <p className="text-justify ">
                            Body Position: Weight shifts fully to the front foot, with the back foot acting as support.
                            Finish: The torso and hips face the target, and the club wraps around the body.
                            Balance: A well-executed swing leaves the golfer in a balanced and controlled position.
                        </p>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default ScheduleSwingAnalysis;