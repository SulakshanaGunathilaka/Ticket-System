
function buttonSpinner (text) {


    return (
            <div className="w-full text-grey-700 bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"  >
              <div className="flex  justify-center">
                <svg class="animate-spin h-5 w-5 mr-3 bg-sky-500" viewBox="0 0 24 24">

                </svg>
                {text}
              </div>

            </div>
    );
}

function pageSpinner (text) {


    return (
        <div className="flex content-center justify-center items-center flex-col w-auto h-auto mt-56">

        <div className="flex content-center justify-center items-center">
            <svg class="animate-spin  h-5 w-5 mr-3 bg-sky-500" viewBox="0 0 24 24">
            </svg>
            {text}
        </div>

    </div>
    );
}

const CommonSpinners = {
    buttonSpinner,
    pageSpinner

  }

  export default CommonSpinners;