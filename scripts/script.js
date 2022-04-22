//Скрипт для открытия и закрытия pop-up
let main = document.querySelector('#main');
let popUp = document.querySelector('.pop-up_hide');
let popCloseButton = popUp.querySelector('.pop-up__close-button');
let popEdit = main.querySelector('.profile__button');

function popClose(){
    console.log('Событие отправки формы')
    popUp.className = 'pop-up_hide';
}

function popOpen(){
    console.log('Событие отправки формы')
    let name = main.querySelector('.profile__title');
    let job = main.querySelector('.profile__subtitle');
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    popUp.className = 'pop-up';
}

let formElement = popUp.querySelector('.form__field'); 
let nameInput = document.getElementById('name'); 
let jobInput = document.getElementById('job');
let saveButton = popUp.querySelector('.form__save-button'); 


function formSubmitHandler (evt) {
    evt.preventDefault();
    console.log('Событие отправки формы')
    let name = main.querySelector('.profile__title');
    let job = main.querySelector('.profile__subtitle');                          
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
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