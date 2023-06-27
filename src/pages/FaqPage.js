
import qaData from './qaData.json';
import { React, useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/AuthenticationService";
import CommonSpinners from "../common/Spinners";
import CommonToasts from "../common/Toasts";
const FAQPage = () => {
   
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [data, setData] = useState(null);
  const [userList, setUserList] = useState([]);
  const [faqItems, setFaqItems] = useState([]);

  const user1 = AuthService.getCurrentUser();


  // Create FAQ Function //
  const CreatFaq = (e) => {
    try {
      axios({
        method: "post",
        url: 'http://localhost:8080/faqItems',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Authorization": `Bearer ` +  user1.jwt,
        },
        data: {
          id: id,
          question:question,
          answer: answer,
        },
        mode: "cors",
      }).then((res) => {
        console.log("response", res);
        if (res.status == 200) {
        
          // CommonToasts.basicToast("Successfully Added");
          setShowModal(false);
          GetFaq();
        }
      }).catch((error) => {
        CommonToasts.errorToast(error.message);
        setLoading(false);
      });
    } catch (e) {
      CommonToasts.errorToast(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {

    GetFaq();
  }, []);


  const GetFaq = (e) => {
    try {
      axios({
        method: "get",
        url: 'http://localhost:8080/faqItems',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Authorization": `Bearer ` +  user1.jwt,
        },
        data: null,
        mode: "cors",
      }).then((res) => {
        console.log("response", res);
        if (res.status == 200) {
          setFaqItems(res.data.body);
          // CommonToasts.basicToast("Successfully Displayed");
          setShowModal(false);
  
       
        }
      }).catch((error) => {
        CommonToasts.errorToast(error.message);
        setLoading(false);
      });
    } catch (e) {
      CommonToasts.errorToast(e.message);
      setLoading(false);
    }
  }






  return (
    // <div className="container mx-auto py-10">
    //   <h1 className="text-3xl font-bold mb-5">Frequently Asked Questions</h1>
    //   <div className="space-y-6">
    //     {qaData.map((qa, index) => (
    //       <div key={index}>
    //         <h2 className="text-xl font-semibold">{qa.question}</h2>
    //         <p>{qa.answer}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>










    <div className=" bg-grey h-fit w-full ">





    
<section className="dark:bg-gray-800 dark:text-gray-100">
	<div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
		<h2 className="text-2xl font-semibold sm:text-4xl">Frequently Asked Questions</h2>
    <div class="flex items-center justify-between mt-4 gap-x-4 shrink-0">
    <p className="mt-4 mb-8 dark:text-gray-400">If you've got any questions about Sketch for team, read on below for answers to some of the most common ones
we 've already been asked.</p>

        <button class=" text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none"onClick={() => setShowModal(true)}>
            ADD
        </button>
    </div>
		
 

  


                
   
		<div className="space-y-4">
    {faqItems?.map((faqItem,index) => ( 

			<details className="w-full border rounded-lg" open="">
        
				<summary className="px-4 py-6 focus:outline-none focus-visible:ri">{faqItem.question}</summary>
      
				<p className="px-4 py-6 pt-0 ml-4  dark:text-gray-400">{faqItem.answer} </p>

        <div class="bg-gray-200">
        <div class="inline-block  px-4 py-2">
        <button
                            type="button"
                            class="p-2 bg-white border  w-fit h-fit hover:bg-red-200 rounded-lg shadow-md mx-1"
                            
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>

        </div>
        <div class="inline-block   ">
        <button
                            type="button"
                            class="p-2 bg-white border  w-fit h-fit hover:bg-red-200 rounded-lg shadow-md mx-1"
                            
                          >
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

                          </button>



        </div>
      
      </div>


      
      </details>
		
    ))}
		
		</div>
  
	</div>
</section>

        
{showModal ? (
        <>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700 modal-container1">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h5 className="text-4xl font-bold text-blue-400">
                      Create New Question
                    </h5>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setShowModal(false)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className=' w-full '>
                    <label for="email" class="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-300 ">User name</label>
                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => setId(e.target.value)}/>

                  </div>

                 



                  <div className="w-full">
                    <label htmlFor="description" className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-300">
                    Question
                    </label>
                    <textarea
                      id="description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Description"
                      onChange={(e) => setQuestion(e.target.value)}
                    ></textarea>

                  </div>
                  <div className="w-full">
                    <label htmlFor="description" className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-300">
                      Answer
                    </label>
                    <textarea
                      id="description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Description"
                      onChange={(e) => setAnswer(e.target.value)}
                    
                    ></textarea>

                  </div>

                  <br />

                  <button
                    type="button"
                    className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                    onClick={CreatFaq}
                  >
                    Add
                  </button>


                </div>
              </div>


            </div>


          </div>



        </>
      ) : null}




        
   
   




  

  


 
  </div>
  






  



  );
};

export default FAQPage;