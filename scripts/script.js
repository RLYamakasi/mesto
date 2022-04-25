//Скрипт для открытия и закрытия pop-up
let main = document.querySelector('#main');
let popUp = document.querySelector('.pop-up');
let popCloseButton = popUp.querySelector('.pop-up__closeButton');
let popEdit = main.querySelector('.profile__button');
let formElement = popUp.querySelector('.form__field'); 
let nameInput = document.getElementById('name'); 
let jobInput = document.getElementById('job');
let name = main.querySelector('.profile__title');
let job = main.querySelector('.profile__subtitle');

//чтобы при открытии pop-up, выставлялось имя
function setNameAndJob(name, job){   
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

//тоже самое, только при сохранении и работает немного иначе
function reveseSetNameAndJob(name, job){   
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}

function popClose(){
    popUp.classList.remove('pop-up_unHiden');
}

function popOpen(){
    popUp.classList.add('pop-up_unHiden');
    setNameAndJob(name, job);
}

function formSubmitHandler(evt) {
    evt.preventDefault();                           
    reveseSetNameAndJob(name, job)
    popClose(); 
}
popCloseButton.addEventListener("click", popClose);
popEdit.addEventListener("click", popOpen);
formElement.addEventListener("submit", formSubmitHandler); 









//на будущее

/**Скрипт для лайков, были проблемы с querySelector, обращался в интернет за помощью, а потом оказалось,что скрипт писать и не нужно,а я потратил на него кучу времени(((((
let likes = main.querySelector('.element__button');
main.querySelectorAll('.element__button')
  .forEach(el => el.addEventListener('click', () => el.classList.toggle('element__button_active')));

**/


/**
 * 
 * Я думал надо делать скрипт по созданию постов,так что как-то так)
 * 
 * let elements = main.querySelector('.elements');
let addButton = main.querySelector('.profile__add-button');

function addBlock(){
    elements.insertAdjacentHTML('beforeend', `
    <div class="element">
            <img src="images/Karachaevsk.jpg" alt="Особняк на холме" class="element__image">   
            <h2 class="element__text">Карачаевск</h2>  
            <img src="images/like button.svg" alt="Лайк" class="element__button">   
        </div>
`);
}
addButton.addEventListener('click', addBlock);
**/