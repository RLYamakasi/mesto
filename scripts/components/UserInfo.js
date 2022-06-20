export default class UserInfo {
    constructor(name,job){
        this.name = name;
        this.job = job;
        this._selector = document.querySelector('.pop-up_type_edit');
        this.formElement = this._selector.querySelector('.form__field');
        this.userList = Array.from(
        this.formElement.querySelectorAll('.form__profile')
      );
    }
    getUserInfo(){
        const formValues = {};
      this.userList.forEach((item,index) =>{
        formValues[index] = item.value;
      });
      this.formValues(formValues)
    }
    setUserInfo(values){
        this.name.textContent = values[0];
        this.job.textContent = values[1];
    }
}
