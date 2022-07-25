export default class UserInfo {
    constructor(object){
        this.name = object.name;
        this.about = object.job;
        this.avatar = document.querySelector('.profile__avatar-img');
    }
    getUserInfo(){
      const formValues = {name,job};
      formValues.name = this.name.textContent
      formValues.job = this.about.textContent
      return formValues;
    }
    setUserInfo(values){
      this.name.textContent = values.name; 
      this.about.textContent = values.about; 
    }
    getUserId(id){
      this.userId = id;
    }
    getAvatar(avatar){
      this.avatar = avatar;
    }
    setAvatar(ava){
      this.avatar.src = ava;
    }

}
