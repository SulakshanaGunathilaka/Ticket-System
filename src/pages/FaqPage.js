
import qaData from './qaData.json';
import { React, useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/AuthenticationService";
import CommonSpinners from "../common/Spinners";
import CommonToasts from "../common/Toasts";
const FAQPage = () => {
   
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
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


//Get All Function //


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


// Faq Delete Function //


const FaqDelete = (faqItemId) => {
  setLoading(true);

  try {
    axios({
      method: "delete",
      url: `http://localhost:8080/faqItems/${faqItemId}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        Authorization: `Bearer ${user1.jwt}`,
      },
      data: null,
      mode: "cors",
    })
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          // setFaqItems(res.data.body);
          const updatedFaqItems = faqItems.filter(
            (faqItem) => faqItem.id !== faqItemId
          );
          setFaqItems(updatedFaqItems);
          CommonToasts.basicToast("Successfully Deleted");
        }
        setLoading(false);
      })
      .catch((error) => {
        CommonToasts.errorToast(error.message);
        setLoading(false);
      });
  } catch (e) {
    CommonToasts.errorToast(e.message);
    setLoading(false);
  }
};



// const [questionDetails, setQuestionDetails] = useState(null);






// View FAQ Function //

const ViewFaq = (faqItemId) => {
  try {
    axios({
      method: "get",
      url: 'http://localhost:8080/faqItems/'+ faqItemId,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Authorization": `Bearer ` +  user1.jwt,
      },
      data: null,
      mode: "cors",
    }).then((res) => {
      console.log("response", res);
      if (res.status == 200) {
        setQuestionDetails(res.data.body); 
        setShowModal2(true);
       
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




const handleClickView = (faqItemId) => {
  ViewFaq (faqItemId)
  setShowModal2(true);
};







const [questionDetails, setQuestionDetails] = useState({
  question: '',
  answer: '',
});


const EditFaq = (e) => {
  try {
    axios({
      method: "put",
      url: 'http://localhost:8080/faqItems',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Authorization": `Bearer ${user1.jwt}`,
      },
      data: {
        id: questionDetails.id,
        question: questionDetails.question,
        answer: questionDetails.answer, 
      },
      mode: "cors",
    }).then((res) => {
      console.log("response", res);
      if (res.status === 200) {
        setShowModal2(false);
        GetFaq();
        CommonToasts.basicToast("Successfully Edited");
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


const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

// const getFaq = () => {
//   axios({
//     method: 'get',
//     url: `http://localhost:8080/faqItems/page?page=${currentPage}&offset=10`,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//       Authorization: `Bearer ${user1.jwt}`,
//     },
//     mode: 'cors',
//   })
//     .then((res) => {
//       console.log('response', res);
//       if (res.status === 200) {
//         setFaqItems(res.data.content);
//         setTotalPages(res.data.totalPages);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// const handleNextPage = () => {
//   if (currentPage < totalPages) {
//     setCurrentPage(currentPage + 1);
//   }
// };

// useEffect(() => {
//   getFaq();
// }, [currentPage]);

const getFaq = (page) => {
  axios({
    method: 'get',
    url: `http://localhost:8080/faqItems/page?page=${page}&offset=10`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: `Bearer ${user1.jwt}`,
    },
    mode: 'cors',
  })
    .then((res) => {
      console.log('response', res);
      if (res.status === 200) {
        setFaqItems(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const handlePageChange = (page) => {
  setCurrentPage(page);
};

useEffect(() => {
  getFaq(currentPage);
}, [currentPage]);

const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


// const handleInput = (event) => {
//   const value = event.target.value;
//   const words = value.trim().split(/\s+/);
  
//   if (words.length > 500) {
//     const limitedWords = words.slice(0, 500);
//     const limitedValue = limitedWords.join(' ');
//     event.target.value = limitedValue;
//   }
// };
// const handleInput = (event) => {
//   const value = event.target.value;
  
//   if (value.length > 1000) {
//     const limitedValue = value.slice(0, 1000);
//     event.target.value = limitedValue;
//   }
// };

const handleInput = (event, characterLimit) => {
  let value = event.target.value;

  if (value.length > characterLimit) {
    value = value.slice(0, characterLimit);
  }

  event.target.value = value;
};






  return (
 

    <div className=" bg-grey h-fit w-full "> 
<section className="dark:bg-gray-800 dark:text-gray-100">
	<div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
		<h2 className="text-2xl font-semibold sm:text-4xl">Frequently Asked Questions</h2>
    <div class="flex items-center justify-between mt-4 gap-x-4 shrink-0">
    <p className="mt-4 mb-8 dark:text-gray-400">If you've got any questions about Sketch for team, read on below for answers to some of the most common ones
we 've already been asked.</p>

        <button class= "p-2 bg-white border  w-fit h-fit hover:bg-blue-200 rounded-lg shadow-md mx-1"onClick={() => setShowModal(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mt-1 mx-1 ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                  </svg>
        </button>
    </div>
		<div className="space-y-4 overflow-y-auto max-h-128  "style={{ maxHeight: '500px' }}>
    {faqItems?.map((faqItem,index) => ( 

			<details className="w-full border rounded-lg" open="">
        
				<summary className="px-4 py-6 focus:outline-none focus-visible:ri">{faqItem.question}</summary>
      
				<p className="px-4 py-6 pt-0 ml-4  dark:text-gray-400">{faqItem.answer} </p>

        <div class="bg-gray-200">
        <div class="inline-block  px-4 py-2">
        <button
                            type="button"
                            class="p-2 bg-white border  w-fit h-fit hover:bg-red-200 rounded-lg shadow-md mx-1"
                            onClick={() => FaqDelete(faqItem.id)}
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
                            class="p-2 bg-white border  w-fit h-fit hover:bg-blue-200 rounded-lg shadow-md mx-1"
                            // onClick={() => ViewFaq(faqItem.id)}
                            onClick={() => handleClickView(faqItem.id)}


                          >
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

                          </button>



        </div>
      
      </div>


      
      </details>
		
    ))}
		  {/* <button onClick={handleNextPage}>Next Page</button> */}
   
		</div>
  
	</div>
</section>
<nav className='block'>
        <ul className='flex pl-0 pb-4 rounded list-none flex-wrap justify-end mr-8'>
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                onClick={() => handlePageChange(number)}
                href='#'
                className={
                  currentPage === number
                    ? 'bg-blue border-sky-500 mx-1 text-sky-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border-2 rounded-lg text-sm font-medium'
                    : 'bg-white border-gray-300 mx-1 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border-2 rounded-lg text-sm font-medium'
                }
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>

        
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

                 

                 



                  <div className="w-full">
                    <label htmlFor="description" className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-300">
                    Question
                    </label>
                    <textarea
  id="description"
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
  placeholder="Description"
  onChange={(e) => setQuestion(e.target.value)}
  onInput={(e) => handleInput(e, 1000)}
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
                      onInput={(e) => handleInput(e, 1000)}
                  
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




{/* Edit Modal */}


{showModal2   ?  (
        <>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal2(false)}
            ></div>
            <div>
          
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700 modal-container1">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h5 className="text-4xl font-bold text-blue-400">
                    Edit Question
                    </h5>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setShowModal2(false)}
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

                 

                 



                  <div className="w-full">
                    <label htmlFor="description" className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-300">
                    Question
                    </label>
                  
                    <textarea
                type="text"
                id="question"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={questionDetails.question}
                onChange={(e) =>
                  setQuestionDetails({
                    ...questionDetails,
                    question: e.target.value,
                  })
                }
                onInput={(e) => handleInput(e, 1000)}
              />
                  </div>
                  <div className="w-full">
                    <label htmlFor="description" className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-300">
                      Answer
                    </label>
                    
                    <textarea
                type="text"
                id="question"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={questionDetails.answer}
                onChange={(e) =>
                  setQuestionDetails({
                    ...questionDetails,
                    answer: e.target.value,
                  })
                }
                onInput={(e) => handleInput(e, 1000)}
              />

                  </div>

                  <br />

                  <button
                    type="button"
                    className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                    onClick={EditFaq}
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