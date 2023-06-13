import React from "react";
import LoginCard from "../components/LoginCard";
import useWindowSize from "../components/Hooks/UseWindowSize";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import videoFile from '../images/network.mp4';



function LoginPage() {

    const size = useWindowSize();

    return size.width < 600 ? <LoginMobile /> : <LoginDesktop />;

}


function LoginDesktop() {

    return (


        <div className="w-full bg-white h-screen flex grid-cols-1 sm:grid-cols-2 " >

            <div className="static w-1/3 bg-sky-600 h-screen flex flex-col items-center justify-end">
                <div className="bg-black w-full flex flex-col items-center justify-end">

             

                    <img src={require('../images/logo.png')} alt="login" className="h-24 w-48 align-middle border-none" />
                </div>

            </div>


            {/* <div className="absolute left-1/3 bg-center  flex flex-col justify-center">
                <div className="" >

                <video src={videoFile} muted loop autoPlay playsInline  />
             
   

                </div>
            </div> */}
<div className="absolute left-1/3 bg-center flex flex-col  h-full">
        <div className="video-container h-screen">
          <video src={videoFile} muted loop autoPlay playsInline className="h-full w-full object-cover" />
        </div>
      </div>


            <div className=" absolute left-1/4 top-32 flex flex-col justify-center">
                <LoginCard />
            </div>
        </div>

    );

}

function LoginMobile() {

    return (


        <div className=" flex-col w-screen h-screen bg-sky-500 " >
            <div className="flex flex-col">
                <div className="bg-sky-600 w-screen flex flex-col items-center justify-end">
                    <div className="bg-black w-screen flex flex-col items-center justify-end">
                        <img src={require('../images/logo.png')} alt="login" className="h-12 w-24 align-middle border-none" />
                    </div>
                </div>

                <div className="flex flex-row mt-10 justify-center items-center">
                    <LoginCard />
                </div>
            </div>

        </div>

    );

}




export default LoginPage;