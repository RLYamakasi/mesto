export default class UserInfo {
    constructor(object){
        this.name = object.name;
        this.about = object.job;
        const userId = "";
        
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
    getUserId(id){
      this.userId = id;
      console.log(this.userId)
    }
    test(){
      console.log(this.userId)
    }

}
