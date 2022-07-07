export default class UserInfo {
    constructor(object){
        this.name = object.name;
        this.about = object.job;
    }
    getUserInfo(){
      const formValues = {name,job};
      formValues.name = this.name.textContent
      formValues.job = this.about.textContent
      console.log(formValues)
      return formValues;
    }
    setUserInfo(values){
      this.name.textContent = values.name; 
      this.about.textContent = values.about; 
      console.log(values.name)
    }
}
