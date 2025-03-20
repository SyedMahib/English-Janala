function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN';
    window.speechSynthesis.speak(utterance);
  }

const removeActiveClass = () => {
    const activeButtons = document.getElementsByClassName("active");
  
    for (let btn of activeButtons){
      btn.classList.remove("active");
    }
  }

const showLoader = () => {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("lesson-container").classList.add("hidden");
}
const hideLoader = () => {
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("lesson-container").classList.remove("hidden");
}


const loadLessonBtns = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessonBtns(data.data));
}

const loadLessonsByBtn = (level_no) => {
    showLoader();
    const url = `https://openapi.programming-hero.com/api/level/${level_no}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        const clickedButton = document.getElementById(`${level_no}`);
        clickedButton.classList.add("active");
        displayLessons(data.data);
    });
}


const  loadLessonDetails = (id) => {
  

    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLessonDetails(data));
}

const displayLessonDetails = (lessonDetails) =>{
    console.log(lessonDetails);

     document.getElementById("lesson_details").showModal();

     const detailsContainer = document.getElementById("details-container");

   

    const synonymContainer = lessonDetails.data.synonyms.length > 0 ? lessonDetails.data.synonyms.map(synonym => 
        `<button class="btn bg-[#D7E4EF] text-xl">${synonym}</button>`
    ).join("") : `<p class="text-xl font-bold poppins-regular">No synonyms found!</p>`

     detailsContainer.innerHTML = `
     <div class="card-body border border-[#EDF7FF] rounded-xl">
      <h2 class="card-title font-semibold text-4xl poppins-regular mb-8">${lessonDetails.data.word} (<i class="fa-solid fa-microphone-lines"></i>:${lessonDetails.data.pronunciation})</h2>
      <h4 class="font-semibold text-2xl poppins-regular mb-2">Meaning</h4>
      <p id="meaning-container" class="font-medium text-2xl hind-siliguri mb-8">${lessonDetails.data.meaning ? `${lessonDetails.data.meaning}` : `কোন অর্থ পাওয়া যায় নি `}</p>
      <h4 class="font-semibold text-2xl poppins-regular mb-2">Example</h4>
      <p class="font-medium text-2xl poppins-regular mb-8">${lessonDetails.data.sentence}</p>
      <h4 class="font-medium text-2xl hind-siliguri mb-2">সমার্থক শব্দ গুলো</h4>
      <div id="synonym-container" class="flex gap-4">${synonymContainer}</div>
    </div>`;
}



const displayLessonBtns = (lessonBtns) => {

    const lessonBtnsContainer = document.getElementById("lesson-btn-container");

    for (let lessonBtn of lessonBtns){
        
        const lessonBtnDiv = document.createElement("div");
        lessonBtnDiv.innerHTML = `
        <button id="${lessonBtn.level_no}" onclick="loadLessonsByBtn(${lessonBtn.level_no})" class="nav-btn btn border border-[#422AD5] text-[#422AD5] hover:bg-[#422AD5] hover:text-white font-semibold"><i class="fa-solid fa-book-open text-[#422AD5] hover:text-white text-sm"></i>Lesson-${lessonBtn.level_no}</button>`;

        lessonBtnsContainer.append(lessonBtnDiv);
    }
}

const displayLessons = (lessons) => {

    const lessonContainer = document.getElementById("lesson-container");

    lessonContainer.innerHTML = "";

    if(lessons.length === 0){
        lessonContainer.innerHTML = `
        <div class="col-span-full py-16 flex flex-col justify-center items-center">
                    <img class="mb-4" src="./assets/alert-error.png" alt="alert-error">
                    <p class="text-sm text-[#79716B] hind-siliguri text-center mb-4">এই <span class="poppins-regular">Lesson</span> এ এখনো কোন <span class="poppins-regular">Vocabulary</span> যুক্ত করা হয়নি।</p>
                    <h3 class="text-4xl font-medium text-[#292524] hind-siliguri text-center">নেক্সট <span class="poppins-regular">Lesson</span> এ যান</h3>
                </div>`;
                hideLoader();
                return;
    }

    for (let lesson of lessons){

        const lessonDiv = document.createElement("div");
        lessonDiv.innerHTML = `
        <div class="card  bg-base-100 card-lg shadow-sm h-[350px]">
                    <div class="card-body">
                      <h2 class="text-center text-3xl font-bold poppins-regular mb-6">${lesson.word}</h2>
                      <p class="font-medium text-xl poppins-regular text-center mb-6">Meaning /Pronounciation</p>
                      <p class="font-semibold text-3xl hind-siliguri text-center text-[#18181B] mb-6">"${lesson.meaning ? `${lesson.meaning}` : `কোন অর্থ পাওয়া যায় নি /${lesson.pronunciation}`}"</p>
                      <div class="flex justify-between">
                        <button  onclick="loadLessonDetails(${lesson.id})" class="btn bg-[#1A91FF10]"><i class="fa-solid fa-circle-info fa-lg"></i></button>
                        <button onclick="pronounceWord('${lesson.word}')" class="btn bg-[#1A91FF10]"><i class="fa-solid fa-volume-high fa-lg"></i></button>
                      </div>
                    </div>
                </div>`;

        lessonContainer.append(lessonDiv);
        
    }
    hideLoader();

}




loadLessonBtns();