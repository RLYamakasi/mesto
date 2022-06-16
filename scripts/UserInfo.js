import {nameInput,jobInput} from "./script.js"

export default class UserInfo {
    constructor(name,job){
        this.name = name;
        this.job = job;
    }
    getUserInfo(){
        nameInput.value = this.name.textContent;
        jobInput.value = this.job.textContent;
    }
    setUserInfo(){
        this.name.textContent = nameInput.value;
        this.job.textContent = jobInput.value;
    }
}
