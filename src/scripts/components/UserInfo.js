export default class UserInfo {
    constructor(name,about){
        this.name = name;
        this.about = about;
        this._selector = document.querySelector('.pop-up_type_edit');
        this.formElement = this._selector.querySelector('.form__field');
        this.userList = Array.from(
        this.formElement.querySelectorAll('.form__profile')
      );
    }
    getUserInfo(){
      const formValues = {name,job};
      formValues.name = this.name.textContent
      formValues.job = this.about.textContent
      console.log(formValues)
      return formValues;
    }
    setUserInfo(values){
      this.id = values._id
      this.name.textContent = values.name; 
      this.about.textContent = values.about; 
    }
}
