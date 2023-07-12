import React from "react";
import TitleText from "../components/TitleText";
import CommonSpinners from "../common/Spinners";


import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function HomePage() {

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        title:{
            // text: "Trip Expenses"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",		
            startAngle: -90,
            dataPoints: [
                { y: 20, label: "Completed" },
                { y: 24, label: "Closed Tickets" },
                { y: 20, label: "In Progress" },
                { y: 14, label: "Open Tickets" },
                { y: 12, label: "Accepted" },
               	
            ]
        }]}




      
		

    return (


     







<div className="bg-grey h-fit w-full">
            <TitleText titleText="Dashboard" />
     
            {/* {CommonSpinners.pageSpinner("Fetching Details")} */}
            <body class="flex bg-sky-300 min-h-100 mt-4 " style={{
    height: '690px',
    width: '1358px',
    overflow: 'auto'
  }}>

  <div class="flex-grow text-gray-800">
  
    <main class="p-6 sm:p-10 space-y-6 ">
    
      <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6 overflow-y-auto">
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <span class="block text-2xl font-bold">62</span>
            <span class="block text-gray-500">Users</span>
          </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <span class="block text-2xl font-bold">6.8</span>
            <span class="block text-gray-500">Open Tickets</span>
          </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <div>
            <span class="inline-block text-2xl font-bold">9</span>
            <span class="inline-block text-xl text-gray-500 font-semibold">(14%)</span>
            <span class="block text-gray-500">Closed Tickets</span>
          </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <span class="block text-2xl font-bold">83%</span>
            <span class="block text-gray-500">In Progress</span>
          </div>
        </div>
      </section>
      <section class="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6 ">
        <div class="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg h-auto">
          <div class="px-6 py-5 font-semibold border-b border-gray-100">The number of applied and left tickets per month</div>
          <div class="p-4 flex-grow ">
          <CanvasJSChart options = {options} 
				
                />
          
          </div>
        </div>
    
        <div class=" row-span-3 bg-white shadow rounded-lg"style={{ maxHeight: '500px' }}>
          <div class=" flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
            <span>users by average open tickets</span>
          
      
          </div>
          <div class="overflow-y-auto" style={{ maxHeight: '400px' }} >
            <ul class="p-6 space-y-6">
              <li class="flex items-center">
                <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                 
                </div>
                <span class="text-gray-600">Dhananjali Herath</span>
                <span class="ml-auto font-semibold">1</span>
              </li>
              <li class="flex items-center">
                <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                
                </div>
                <span class="text-gray-600">Dhananjali Herath</span>
                <span class="ml-auto font-semibold">2</span>
              </li>
              <li class="flex items-center">
                <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  
                </div>
                <span class="text-gray-600">Dhananjali Herath</span>
                <span class="ml-auto font-semibold">3</span>
              </li>
              <li class="flex items-center">
                <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                
                </div>
                <span class="text-gray-600">Dhananjali Herath</span>
                <span class="ml-auto font-semibold">4</span>
              </li>
              <li class="flex items-center">
                <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                 
                </div>
                <span class="text-gray-600">Dhananjali Herath</span>
                <span class="ml-auto font-semibold">5</span>
              </li>
             
              
            
            </ul>
          </div>
        </div>
      
		
        <div class="flex flex-col row-span-3 bg-white shadow rounded-lg"style={{ maxHeight: '500px' }}>
          <div class="px-6 py-5 font-semibold border-b border-gray-100">Tickets in progress</div>
          <div class="p-4 flex-grow">
            <div class="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>
          </div>
        </div>

          
        
        
      </section>
      
    </main>
  </div>
</body>
</div>










  





 

 







    );
}
